using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Security.Cryptography;
using System.Text.Json;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Time.Testing;
using NguyenDuongNhutKhang_APIGAME.Data;

namespace NguyenDuongNhutKhang_APIGAME.Tests.Infrastructure;

/// <summary>
/// Chạy chính Program.cs của API trên một database LocalDB RIÊNG cho mỗi lần chạy (tên ngẫu nhiên),
/// migrate bằng migration thật và xoá database khi xong. Không đụng database phát triển hay Neon.
/// </summary>
public class ApiFactory : WebApplicationFactory<Program>, IAsyncLifetime
{
    public string DatabaseName { get; } = "NguyenDuongNhutKhang_APIGAME_Test_" + Guid.NewGuid().ToString("N")[..10];

    /// <summary>Khoá JWT ngẫu nhiên chỉ sống trong tiến trình test (để tự ký token giả mạo kiểm tra từ chối).</summary>
    public string JwtKey { get; } = Convert.ToBase64String(RandomNumberGenerator.GetBytes(48));

    /// <summary>Đồng hồ giả: test hết hạn sẵn sàng / hết giờ lượt mà không phải chờ thật.</summary>
    public FakeTimeProvider Clock { get; } = new(DateTimeOffset.UtcNow);

    public const string Issuer = "GameHub.Api";
    public const string Audience = "GameHub.Client";

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.UseEnvironment("Development");
        builder.ConfigureAppConfiguration((_, config) => config.AddInMemoryCollection(new Dictionary<string, string?>
        {
            ["ConnectionStrings:Default"] =
                $@"Server=(localdb)\MSSQLLocalDB;Database={DatabaseName};Trusted_Connection=True;TrustServerCertificate=True",
            ["Database:MigrateOnStartup"] = "true",
            ["Jwt:Key"] = JwtKey,
            ["Jwt:Issuer"] = Issuer,
            ["Jwt:Audience"] = Audience,
            ["Seed:AdminUsername"] = "",
            ["Seed:AdminPassword"] = "",
            ["Online:Housekeeping"] = "false", // test gọi TickAsync trực tiếp
            ["RateLimit:AuthPerMinute"] = "10000",
        }));
        builder.ConfigureServices(services =>
        {
            services.RemoveAll<TimeProvider>();
            services.AddSingleton<TimeProvider>(Clock);
        });
    }

    public Task InitializeAsync()
    {
        _ = Server; // khởi động host → migrate database test
        return Task.CompletedTask;
    }

    async Task IAsyncLifetime.DisposeAsync()
    {
        try
        {
            using var scope = Services.CreateScope();
            await scope.ServiceProvider.GetRequiredService<AppDbContext>().Database.EnsureDeletedAsync();
        }
        finally
        {
            await base.DisposeAsync();
        }
    }

    public async Task<T> WithDbAsync<T>(Func<AppDbContext, Task<T>> work)
    {
        using var scope = Services.CreateScope();
        return await work(scope.ServiceProvider.GetRequiredService<AppDbContext>());
    }

    public async Task WithScopeAsync(Func<IServiceProvider, Task> work)
    {
        using var scope = Services.CreateScope();
        await work(scope.ServiceProvider);
    }

    /// <summary>Đăng ký tài khoản mới (mật khẩu ngẫu nhiên, không in ra) và trả client đã gắn token.</summary>
    public async Task<TestUser> RegisterAsync(string tag = "u")
    {
        var username = $"{tag}_{Guid.NewGuid().ToString("N")[..8]}";
        var password = "Pw" + Convert.ToHexString(RandomNumberGenerator.GetBytes(6)) + "1";
        var client = CreateClient();
        var res = await client.PostAsJsonAsync("/api/v1/auth/register", new { username, displayName = "Test " + tag, password });
        res.EnsureSuccessStatusCode();
        var body = await res.Content.ReadFromJsonAsync<JsonElement>();
        var token = body.GetProperty("accessToken").GetString()!;
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
        return new TestUser(Guid.Parse(body.GetProperty("user").GetProperty("id").GetString()!), username, password,
            token, body.GetProperty("refreshToken").GetString()!, client);
    }
}

public record TestUser(Guid Id, string Username, string Password, string AccessToken, string RefreshToken, HttpClient Client);

[CollectionDefinition(Name)]
public class ApiCollection : ICollectionFixture<ApiFactory>
{
    public const string Name = "api";
}

public static class HttpJson
{
    public static async Task<JsonElement> JsonAsync(this HttpResponseMessage res)
    {
        var text = await res.Content.ReadAsStringAsync();
        return string.IsNullOrEmpty(text) ? default : JsonDocument.Parse(text).RootElement.Clone();
    }

    public static string Str(this JsonElement e, string name) => e.GetProperty(name).GetString()!;
}
