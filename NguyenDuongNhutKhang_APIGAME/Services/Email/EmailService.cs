using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Threading.Channels;
using MailKit;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using NguyenDuongNhutKhang_APIGAME.Configuration;

namespace NguyenDuongNhutKhang_APIGAME.Services.Email;

public record EmailMessage(string To, string Subject, string Html, string Text);

/// <summary>Lỗi gửi thư. <see cref="Transient"/> = có thể thử lại (timeout, 429, 5xx); ngược lại là nhà cung cấp từ chối hẳn.</summary>
public class EmailDeliveryException(string message, bool transient, Exception? inner = null) : Exception(message, inner)
{
    public bool Transient { get; } = transient;
}

public interface IEmailService
{
    /// <summary>false khi chưa cấu hình nhà cung cấp → API trả AUTH_NOT_READY, không giả vờ đã gửi.</summary>
    bool IsConfigured { get; }

    Task SendAsync(EmailMessage message, CancellationToken ct = default);
}

/// <summary>Chưa cấu hình email: mọi lần gửi đều lỗi rõ ràng.</summary>
public sealed class UnconfiguredEmailService : IEmailService
{
    public bool IsConfigured => false;

    public Task SendAsync(EmailMessage message, CancellationToken ct = default) =>
        throw new EmailDeliveryException("Email provider chưa được cấu hình.", transient: false);
}

/// <summary>SMTP qua MailKit (STARTTLS hoặc SSL). Lưu ý: Render gói miễn phí chặn cổng SMTP đi ra.</summary>
public sealed class SmtpEmailService(IOptions<EmailOptions> options, ILogger<SmtpEmailService> logger) : IEmailService
{
    private readonly EmailOptions _o = options.Value;
    public bool IsConfigured => _o.Configured;

    public async Task SendAsync(EmailMessage message, CancellationToken ct = default)
    {
        var mime = new MimeMessage();
        mime.From.Add(new MailboxAddress(_o.FromName, _o.FromEmail!));
        mime.To.Add(MailboxAddress.Parse(message.To));
        mime.Subject = message.Subject;
        mime.Body = new BodyBuilder { HtmlBody = message.Html, TextBody = message.Text }.ToMessageBody();

        using var cts = CancellationTokenSource.CreateLinkedTokenSource(ct);
        cts.CancelAfter(TimeSpan.FromSeconds(_o.TimeoutSeconds));
        using var client = new MailKit.Net.Smtp.SmtpClient { Timeout = _o.TimeoutSeconds * 1000 };
        try
        {
            await client.ConnectAsync(_o.SmtpHost!, _o.SmtpPort,
                _o.SmtpStartTls ? SecureSocketOptions.StartTls : SecureSocketOptions.SslOnConnect, cts.Token);
            await client.AuthenticateAsync(_o.SmtpUser!, _o.SmtpPassword!, cts.Token);
            await client.SendAsync(mime, cts.Token);
            await client.DisconnectAsync(true, CancellationToken.None);
        }
        catch (OperationCanceledException) when (!ct.IsCancellationRequested)
        {
            throw new EmailDeliveryException("SMTP hết thời gian chờ.", transient: true);
        }
        catch (AuthenticationException ex)
        {
            logger.LogError("SMTP từ chối thông tin đăng nhập (kiểm tra Email__SmtpUser / Email__SmtpPassword).");
            throw new EmailDeliveryException("SMTP từ chối đăng nhập.", transient: false, ex);
        }
        catch (SmtpCommandException ex)
        {
            // 4xx tạm thời, 5xx từ chối hẳn (địa chỉ không tồn tại, bị chặn...).
            throw new EmailDeliveryException($"SMTP trả mã {(int)ex.StatusCode}.", transient: (int)ex.StatusCode / 100 == 4, ex);
        }
        catch (Exception ex) when (ex is IOException or SmtpProtocolException or System.Net.Sockets.SocketException or ServiceNotConnectedException)
        {
            throw new EmailDeliveryException("Không kết nối được máy chủ SMTP.", transient: true, ex);
        }
    }
}

/// <summary>Resend (https://resend.com) qua HTTPS — dùng được trên Render gói miễn phí.</summary>
public sealed class ResendEmailService(HttpClient http, IOptions<EmailOptions> options, ILogger<ResendEmailService> logger) : IEmailService
{
    private readonly EmailOptions _o = options.Value;
    public bool IsConfigured => _o.Configured;

    public async Task SendAsync(EmailMessage message, CancellationToken ct = default)
    {
        using var req = new HttpRequestMessage(HttpMethod.Post, "https://api.resend.com/emails")
        {
            Content = JsonContent.Create(new
            {
                from = $"{_o.FromName} <{_o.FromEmail}>",
                to = new[] { message.To },
                subject = message.Subject,
                html = message.Html,
                text = message.Text,
            }),
        };
        req.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _o.ResendApiKey);

        using var cts = CancellationTokenSource.CreateLinkedTokenSource(ct);
        cts.CancelAfter(TimeSpan.FromSeconds(_o.TimeoutSeconds));
        HttpResponseMessage res;
        try
        {
            res = await http.SendAsync(req, cts.Token);
        }
        catch (OperationCanceledException) when (!ct.IsCancellationRequested)
        {
            throw new EmailDeliveryException("Resend hết thời gian chờ.", transient: true);
        }
        catch (HttpRequestException ex)
        {
            throw new EmailDeliveryException("Không kết nối được Resend.", transient: true, ex);
        }
        using (res)
        {
            if (res.IsSuccessStatusCode) return;
            var code = (int)res.StatusCode;
            // Chỉ ghi mã trạng thái: thân phản hồi có thể chứa địa chỉ người nhận.
            logger.LogWarning("Resend trả {Status}", code);
            var transient = res.StatusCode == HttpStatusCode.TooManyRequests || code >= 500;
            throw new EmailDeliveryException($"Resend trả mã {code}.", transient);
        }
    }
}

/// <summary>Hàng đợi gửi thư nền (quên mật khẩu, thông báo đổi mật khẩu) để thời gian phản hồi không lộ email có tồn tại hay không.</summary>
public interface IEmailOutbox
{
    void Enqueue(EmailMessage message);
}

public sealed class EmailOutbox : IEmailOutbox
{
    private readonly Channel<EmailMessage> _channel = Channel.CreateBounded<EmailMessage>(
        new BoundedChannelOptions(500) { FullMode = BoundedChannelFullMode.DropWrite, SingleReader = true });

    public ChannelReader<EmailMessage> Reader => _channel.Reader;

    public void Enqueue(EmailMessage message) => _channel.Writer.TryWrite(message);
}

public sealed class EmailOutboxWorker(EmailOutbox outbox, IEmailService email, ILogger<EmailOutboxWorker> logger) : BackgroundService
{
    private static readonly TimeSpan[] Backoff = [TimeSpan.FromSeconds(2), TimeSpan.FromSeconds(6)];

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        await foreach (var msg in outbox.Reader.ReadAllAsync(stoppingToken))
        {
            for (var attempt = 0; ; attempt++)
            {
                try
                {
                    await email.SendAsync(msg, stoppingToken);
                    break;
                }
                catch (EmailDeliveryException ex) when (ex.Transient && attempt < Backoff.Length)
                {
                    await Task.Delay(Backoff[attempt], stoppingToken);
                }
                catch (EmailDeliveryException ex)
                {
                    // Không ghi người nhận, tiêu đề hay nội dung (có OTP).
                    logger.LogError("Gửi email nền thất bại ({Reason}).", ex.Message);
                    break;
                }
                catch (OperationCanceledException) when (stoppingToken.IsCancellationRequested)
                {
                    return;
                }
                catch (Exception ex)
                {
                    logger.LogError(ex, "Gửi email nền gặp lỗi không lường trước.");
                    break;
                }
            }
        }
    }
}

/// <summary>Mẫu thư tiếng Việt (HTML + văn bản thuần).</summary>
public static class EmailTemplates
{
    public const string Brand = "Game Hub";

    public static EmailMessage Otp(string to, string purpose, string code, int minutes)
    {
        var (subject, intro) = purpose == Models.ChallengePurpose.PasswordReset
            ? ("Mã đặt lại mật khẩu Game Hub", "Bạn vừa yêu cầu đặt lại mật khẩu tài khoản Game Hub.")
            : ("Mã xác minh email Game Hub", "Cảm ơn bạn đã đăng ký tài khoản Game Hub.");
        var text = $"{intro}\n\nMã xác minh của bạn: {code}\nMã có hiệu lực trong {minutes} phút và chỉ dùng được một lần.\n\n" +
                   "Nếu bạn không thực hiện yêu cầu này, hãy bỏ qua email — tài khoản của bạn vẫn an toàn.\n— " + Brand;
        var html = Layout(subject, $"""
            <p>{WebUtility.HtmlEncode(intro)}</p>
            <p>Mã xác minh của bạn là:</p>
            <p style="font-size:32px;font-weight:700;letter-spacing:8px;margin:16px 0;color:#1a1a2e">{code}</p>
            <p>Mã có hiệu lực trong <b>{minutes} phút</b> và chỉ dùng được một lần. Không chia sẻ mã này với bất kỳ ai.</p>
            <p style="color:#666">Nếu bạn không thực hiện yêu cầu này, hãy bỏ qua email — tài khoản của bạn vẫn an toàn.</p>
            """);
        return new EmailMessage(to, subject, html, text);
    }

    public static EmailMessage PasswordChanged(string to)
    {
        const string subject = "Mật khẩu Game Hub đã được thay đổi";
        const string text = "Mật khẩu tài khoản Game Hub của bạn vừa được đặt lại và mọi thiết bị đã bị đăng xuất.\n\n" +
                            "Nếu không phải bạn, hãy dùng chức năng Quên mật khẩu ngay để lấy lại quyền truy cập.\n— Game Hub";
        var html = Layout(subject, """
            <p>Mật khẩu tài khoản Game Hub của bạn vừa được đặt lại và mọi thiết bị đã bị đăng xuất.</p>
            <p style="color:#666">Nếu không phải bạn, hãy dùng chức năng <b>Quên mật khẩu</b> ngay để lấy lại quyền truy cập.</p>
            """);
        return new EmailMessage(to, subject, html, text);
    }

    private static string Layout(string title, string body) => $"""
        <!doctype html><html lang="vi"><body style="margin:0;background:#f4f5f9;font-family:Segoe UI,Arial,sans-serif">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:24px">
        <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;padding:28px;max-width:480px">
        <tr><td><h2 style="margin:0 0 12px;color:#4b3fd9">{Brand}</h2><h3 style="margin:0 0 16px">{WebUtility.HtmlEncode(title)}</h3>{body}
        <hr style="border:none;border-top:1px solid #eee;margin:20px 0"><p style="font-size:12px;color:#999">Email tự động từ {Brand}, vui lòng không trả lời.</p>
        </td></tr></table></td></tr></table></body></html>
        """;
}
