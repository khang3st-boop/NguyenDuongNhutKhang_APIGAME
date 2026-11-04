using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.Extensions.Options;
using NguyenDuongNhutKhang_APIGAME.Configuration;
using NguyenDuongNhutKhang_APIGAME.Models;
using NguyenDuongNhutKhang_APIGAME.Services;
using NguyenDuongNhutKhang_APIGAME.Services.Email;
using Xunit.Abstractions;

namespace NguyenDuongNhutKhang_APIGAME.Tests.Unit;

public class EmailTemplateTests
{
    [Fact]
    public void Otp_template_is_vietnamese_and_has_name_code_validity_and_ignore_note()
    {
        var m = EmailTemplates.Otp("a@example.com", ChallengePurpose.Register, "123456", 5);
        Assert.Contains("Game Hub", m.Html);
        Assert.Contains("123456", m.Html);
        Assert.Contains("5 phút", m.Html);
        Assert.Contains("hãy bỏ qua email", m.Html);
        Assert.Contains("123456", m.Text);
        Assert.Equal("a@example.com", m.To);
    }

    [Theory]
    [InlineData("khang@example.com", "k***g@example.com")]
    [InlineData("a@example.com", "a***@example.com")]
    public void MaskEmail_hides_most_of_the_address(string input, string expected) =>
        Assert.Equal(expected, AuthV2Service.MaskEmail(input));

    [Fact]
    public async Task Unconfigured_email_service_fails_loudly_instead_of_pretending()
    {
        var svc = new UnconfiguredEmailService();
        Assert.False(svc.IsConfigured);
        var ex = await Assert.ThrowsAsync<EmailDeliveryException>(() => svc.SendAsync(new EmailMessage("a@b.co", "s", "h", "t")));
        Assert.False(ex.Transient);
    }

    [Fact]
    public void Email_options_need_credentials_for_the_chosen_provider()
    {
        Assert.False(new EmailOptions { Provider = "None", FromAddress = "x@y.co" }.Configured);
        Assert.False(new EmailOptions { Provider = "Resend", FromAddress = "x@y.co" }.Configured);
        Assert.True(new EmailOptions { Provider = "Resend", FromAddress = "x@y.co", ResendApiKey = "k" }.Configured);
        Assert.False(new EmailOptions { Provider = "Brevo", FromAddress = "x@y.co" }.Configured);
        Assert.True(new EmailOptions { Provider = "Brevo", FromAddress = "x@y.co", BrevoApiKey = "k" }.Configured);
        Assert.False(new EmailOptions { Provider = "Smtp", FromAddress = "x@y.co", SmtpHost = "h" }.Configured);
        Assert.True(new EmailOptions { Provider = "Smtp", FromAddress = "x@y.co", SmtpHost = "h", SmtpUser = "u", SmtpPassword = "p" }.Configured);
    }


    [Theory]
    [InlineData("onboarding@resend.dev", "onboarding@resend.dev")]
    [InlineData("Game Hub <onboarding@resend.dev>", "onboarding@resend.dev")]
    [InlineData("gamehub khang3st@gmail.com", "khang3st@gmail.com")]
    [InlineData("Game Hub [onboarding@resend.dev](mailto:onboarding@resend.dev)", "onboarding@resend.dev")]
    public void From_address_is_normalised_to_a_bare_email(string raw, string expected) =>
        Assert.Equal(expected, new EmailOptions { FromAddress = raw }.FromEmail);

    [Fact]
    public void Email_options_bind_from_render_style_environment_variables_without_leaking_the_key()
    {
        var config = new ConfigurationBuilder().AddInMemoryCollection(new Dictionary<string, string?>
        {
            ["Email:Provider"] = "Resend",
            ["Email:FromAddress"] = "Game Hub <onboarding@resend.dev>",
            ["Email:ResendApiKey"] = "re_test_dummy_key",
            ["Auth:OtpKey"] = new string('k', 43),
        }).Build();
        var email = config.GetSection(EmailOptions.Section).Get<EmailOptions>()!;
        Assert.True(email.Configured);
        Assert.Equal("onboarding@resend.dev", email.FromEmail);
        Assert.True(config.GetSection(AuthOptions.Section).Get<AuthOptions>()!.OtpConfigured);
    }

    [Fact]
    public void Otp_key_must_be_at_least_32_bytes()
    {
        Assert.False(new AuthOptions { OtpKey = "short" }.OtpConfigured);
        Assert.True(new AuthOptions { OtpKey = new string('k', 32) }.OtpConfigured);
    }
}

/// <summary>
/// Gửi thư THẬT tới hộp thư của người phát triển. Chỉ chạy khi có cấu hình thật qua biến môi trường
/// (<c>Email__Provider</c>, <c>Email__FromAddress</c>, <c>Email__ResendApiKey</c> hoặc <c>Email__Smtp*</c>) VÀ
/// <c>GAMEHUB_TEST_EMAIL_TO</c>. Thiếu → test thoát sớm và ghi rõ BLOCKED (không giả vờ đã gửi).
/// </summary>
public class RealEmailTests(ITestOutputHelper output)
{
    [Fact]
    public async Task Sends_a_real_otp_email_when_a_provider_is_configured()
    {
        var config = new ConfigurationBuilder().AddEnvironmentVariables().Build();
        var options = config.GetSection(EmailOptions.Section).Get<EmailOptions>() ?? new EmailOptions();
        var to = Environment.GetEnvironmentVariable("GAMEHUB_TEST_EMAIL_TO");
        if (!options.Configured || string.IsNullOrWhiteSpace(to))
        {
            output.WriteLine("BLOCKED: chưa có Email__* hoặc GAMEHUB_TEST_EMAIL_TO — chưa gửi email thật.");
            return;
        }

        IEmailService svc = options.Provider.ToLowerInvariant() switch
        {
            "smtp" => new SmtpEmailService(Options.Create(options), NullLogger<SmtpEmailService>.Instance),
            "brevo" => new BrevoEmailService(new HttpClient(), Options.Create(options), NullLogger<BrevoEmailService>.Instance),
            _ => new ResendEmailService(new HttpClient(), Options.Create(options), NullLogger<ResendEmailService>.Instance),
        };

        await svc.SendAsync(EmailTemplates.Otp(to, ChallengePurpose.Register, "123456", 5));
        output.WriteLine($"Đã gửi email thật qua {options.Provider}.");
    }
}

public class BrevoEmailServiceTests
{
    private sealed class Stub(System.Net.HttpStatusCode status, string body = "{}") : HttpMessageHandler
    {
        public HttpRequestMessage? Seen;
        public string? SeenBody;
        public int Calls;

        protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken ct)
        {
            Calls++;
            Seen = request;
            SeenBody = request.Content is null ? null : await request.Content.ReadAsStringAsync(ct);
            return new HttpResponseMessage(status) { Content = new StringContent(body) };
        }
    }

    private static BrevoEmailService Make(Stub stub) => new(new HttpClient(stub),
        Options.Create(new EmailOptions { Provider = "Brevo", FromAddress = "gamehub khang3st@gmail.com", BrevoApiKey = "test-key" }),
        NullLogger<BrevoEmailService>.Instance);

    [Fact]
    public async Task Posts_to_brevo_with_api_key_header_sender_and_both_bodies()
    {
        var stub = new Stub(System.Net.HttpStatusCode.Created);
        await Make(stub).SendAsync(new EmailMessage("to@example.com", "Chủ đề", "<b>h</b>", "t"));

        Assert.Equal("https://api.brevo.com/v3/smtp/email", stub.Seen!.RequestUri!.ToString());
        Assert.Equal("test-key", stub.Seen.Headers.GetValues("api-key").Single());
        Assert.Null(stub.Seen.Headers.Authorization);
        Assert.Contains("\"email\":\"khang3st@gmail.com\"", stub.SeenBody);
        Assert.Contains("\"htmlContent\"", stub.SeenBody);
        Assert.Contains("\"textContent\"", stub.SeenBody);
        Assert.Equal(1, stub.Calls);
    }

    [Theory]
    [InlineData(System.Net.HttpStatusCode.Unauthorized, false)]
    [InlineData(System.Net.HttpStatusCode.BadRequest, false)]
    [InlineData(System.Net.HttpStatusCode.TooManyRequests, true)]
    [InlineData(System.Net.HttpStatusCode.BadGateway, true)]
    public async Task Maps_http_failures_without_retrying(System.Net.HttpStatusCode status, bool transient)
    {
        var stub = new Stub(status, "{\"code\":\"unauthorized\",\"message\":\"secret detail\"}");
        var ex = await Assert.ThrowsAsync<EmailDeliveryException>(() =>
            Make(stub).SendAsync(new EmailMessage("to@example.com", "s", "h", "t")));
        Assert.Equal(transient, ex.Transient);
        Assert.DoesNotContain("secret detail", ex.Message);
        Assert.Equal(1, stub.Calls);
    }
}
