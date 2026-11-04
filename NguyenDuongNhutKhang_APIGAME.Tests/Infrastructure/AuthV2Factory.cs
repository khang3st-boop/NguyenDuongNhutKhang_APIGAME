using System.Collections.Concurrent;
using System.Security.Cryptography;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using NguyenDuongNhutKhang_APIGAME.Services;
using NguyenDuongNhutKhang_APIGAME.Services.Email;

namespace NguyenDuongNhutKhang_APIGAME.Tests.Infrastructure;

/// <summary>Bộ gửi thư giả: ghi lại thư để test đọc mã OTP; có thể giả lập lỗi nhà cung cấp.</summary>
public sealed class FakeEmailService : IEmailService
{
    private readonly ConcurrentQueue<EmailMessage> _sent = new();
    public bool IsConfigured => true;

    /// <summary>null = gửi thành công; true = lỗi tạm thời (503); false = nhà cung cấp từ chối (502).</summary>
    public bool? FailTransient { get; set; }

    public IReadOnlyCollection<EmailMessage> Sent => _sent.ToArray();

    public Task SendAsync(EmailMessage message, CancellationToken ct = default)
    {
        if (FailTransient is { } transient) throw new EmailDeliveryException("fake failure", transient);
        _sent.Enqueue(message);
        return Task.CompletedTask;
    }

    public IReadOnlyList<EmailMessage> To(string address) =>
        _sent.Where(m => string.Equals(m.To, address, StringComparison.OrdinalIgnoreCase)).ToList();

    /// <summary>Mã 6 số trong thư OTP gần nhất gửi tới địa chỉ; đợi tối đa vài giây cho thư gửi nền (outbox).</summary>
    public async Task<string> LastCodeAsync(string address, int expectedCount = 1)
    {
        var msg = await WaitForAsync(address, expectedCount);
        var m = Regex.Match(msg.Text, @"\b(\d{6})\b");
        Assert.True(m.Success, "thư OTP phải chứa mã 6 số");
        return m.Groups[1].Value;
    }

    public async Task<EmailMessage> WaitForAsync(string address, int expectedCount = 1)
    {
        for (var i = 0; i < 100; i++)
        {
            var mails = To(address);
            if (mails.Count >= expectedCount) return mails[^1];
            await Task.Delay(50);
        }
        throw new Xunit.Sdk.XunitException($"Không có đủ {expectedCount} thư gửi tới {address}.");
    }

    public async Task AssertNoMailAsync(string address, int waitMs = 400)
    {
        await Task.Delay(waitMs);
        Assert.Empty(To(address));
    }
}

/// <summary>Khóa Google giả (RSA cục bộ) để kiểm tra bộ xác minh thật với token hợp lệ / sai / hết hạn.</summary>
public sealed class FakeGoogleKeys : IGoogleKeyProvider
{
    public const string ClientId = "gamehub-test.apps.googleusercontent.com";
    private readonly RSA _rsa = RSA.Create(2048);
    private readonly RSA _other = RSA.Create(2048);
    public string KeyId { get; } = "test-key-1";

    /// <summary>Đồng hồ dùng để cấp token; phải khớp đồng hồ giả của server (các test khác có thể đã tua giờ).</summary>
    public Func<DateTime> Now { get; set; } = () => DateTime.UtcNow;

    public Task<IReadOnlyList<SecurityKey>> GetKeysAsync(bool forceRefresh, CancellationToken ct) =>
        Task.FromResult<IReadOnlyList<SecurityKey>>([new RsaSecurityKey(_rsa.ExportParameters(false)) { KeyId = KeyId }]);

    public string Token(
        string sub, string email, bool emailVerified = true, string? name = "Người Chơi Google",
        string issuer = "https://accounts.google.com", string audience = ClientId,
        DateTime? expires = null, DateTime? notBefore = null, bool signWithOtherKey = false)
    {
        var key = new RsaSecurityKey(signWithOtherKey ? _other : _rsa) { KeyId = KeyId };
        var claims = new Dictionary<string, object> { ["sub"] = sub, ["email"] = email, ["email_verified"] = emailVerified };
        if (name != null) claims["name"] = name;
        var now = Now();
        return new JsonWebTokenHandler().CreateToken(new SecurityTokenDescriptor
        {
            Issuer = issuer,
            Audience = audience,
            Claims = claims,
            NotBefore = notBefore ?? now.AddMinutes(-1),
            Expires = expires ?? now.AddHours(12),
            SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.RsaSha256),
        });
    }
}

/// <summary>ApiFactory đã bật Auth V2: OTP key, Google client ID, email giả, khóa Google giả. Database riêng như ApiFactory.</summary>
public class AuthV2Factory : ApiFactory
{
    public FakeEmailService Email { get; } = new();
    public FakeGoogleKeys Google { get; } = new();

    public AuthV2Factory() => Google.Now = () => Clock.GetUtcNow().UtcDateTime;

    protected virtual int IpLimitPerHour => 100_000;

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        base.ConfigureWebHost(builder);
        builder.ConfigureAppConfiguration((_, config) => config.AddInMemoryCollection(new Dictionary<string, string?>
        {
            ["Auth:OtpKey"] = Convert.ToBase64String(RandomNumberGenerator.GetBytes(48)),
            ["Auth:Google:ClientIds:0"] = FakeGoogleKeys.ClientId,
            ["Auth:MaxSendsPerIpPerHour"] = IpLimitPerHour.ToString(),
        }));
        builder.ConfigureServices(services =>
        {
            services.RemoveAll<IEmailService>();
            services.AddSingleton<IEmailService>(Email);
            services.RemoveAll<IGoogleKeyProvider>();
            services.AddSingleton<IGoogleKeyProvider>(Google);
        });
    }
}

/// <summary>Giới hạn 3 lần gửi / giờ / IP để kiểm tra chặn theo IP.</summary>
public sealed class LowIpLimitFactory : AuthV2Factory
{
    protected override int IpLimitPerHour => 3;
}
