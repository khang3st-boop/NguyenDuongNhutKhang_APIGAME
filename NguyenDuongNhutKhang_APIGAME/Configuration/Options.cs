namespace NguyenDuongNhutKhang_APIGAME.Configuration;

/// <summary>
/// Cấu hình JWT. <c>Key</c> KHÔNG được ghi vào appsettings trong Git:
/// Development dùng <c>dotnet user-secrets set "Jwt:Key" "..."</c>, Production dùng biến môi trường <c>Jwt__Key</c>.
/// </summary>
public class JwtOptions
{
    public const string Section = "Jwt";

    public string Issuer { get; set; } = "GameHub.Api";
    public string Audience { get; set; } = "GameHub.Client";
    public string? Key { get; set; }
    public int AccessTokenMinutes { get; set; } = 15;
    public int RefreshTokenDays { get; set; } = 30;
}

/// <summary>Tạo sẵn tài khoản Admin khi khởi động (tuỳ chọn, để trống = không tạo). Chỉ đặt qua user-secrets / biến môi trường.</summary>
public class SeedOptions
{
    public const string Section = "Seed";

    public string? AdminUsername { get; set; }
    public string? AdminPassword { get; set; }
}

/// <summary>
/// Xác thực V2: OTP email, quên mật khẩu, Google. Mọi bí mật (<c>OtpKey</c>, ClientIds nếu coi là cấu hình riêng)
/// chỉ đặt qua user-secrets / biến môi trường (<c>Auth__OtpKey</c>, <c>Auth__Google__ClientIds__0</c>...).
/// </summary>
public class AuthOptions
{
    public const string Section = "Auth";

    /// <summary>Khoá HMAC để băm OTP / reset token. Tối thiểu 32 byte. Thiếu → tính năng email bị tắt (AUTH_NOT_READY).</summary>
    public string? OtpKey { get; set; }

    public int OtpLength { get; set; } = 6;
    public int OtpMinutes { get; set; } = 5;
    public int ResendSeconds { get; set; } = 60;
    public int MaxAttempts { get; set; } = 5;
    public int ResetTokenMinutes { get; set; } = 10;

    /// <summary>Số OTP tối đa được tạo cho một email / một tài khoản / một IP trong 1 giờ.</summary>
    public int MaxSendsPerEmailPerHour { get; set; } = 5;
    public int MaxSendsPerIpPerHour { get; set; } = 20;

    public GoogleOptions Google { get; set; } = new();

    public bool OtpConfigured => !string.IsNullOrWhiteSpace(OtpKey)
        && System.Text.Encoding.UTF8.GetByteCount(OtpKey) >= 32;
}

public class GoogleOptions
{
    /// <summary>Danh sách OAuth client ID (Web/Android/iOS) được chấp nhận làm <c>aud</c>. Rỗng = Google bị tắt.</summary>
    public string[] ClientIds { get; set; } = [];

    public bool Configured => ClientIds.Any(c => !string.IsNullOrWhiteSpace(c));
}

/// <summary>
/// Gửi email. <c>Provider</c>: <c>Smtp</c> | <c>Resend</c> | <c>None</c>.
/// Render gói miễn phí chặn cổng SMTP đi ra → nên dùng <c>Resend</c> (HTTPS). Mật khẩu / API key chỉ qua biến môi trường.
/// </summary>
public class EmailOptions
{
    public const string Section = "Email";

    public string Provider { get; set; } = "None";
    public string? FromAddress { get; set; }
    public string FromName { get; set; } = "Game Hub";
    public int TimeoutSeconds { get; set; } = 15;

    public string? SmtpHost { get; set; }
    public int SmtpPort { get; set; } = 587;
    public string? SmtpUser { get; set; }
    public string? SmtpPassword { get; set; }

    /// <summary>true = STARTTLS (cổng 587); false = SSL ngay từ đầu (cổng 465).</summary>
    public bool SmtpStartTls { get; set; } = true;

    public string? ResendApiKey { get; set; }

    /// <summary>Khoá API Brevo (header <c>api-key</c>), chỉ đặt qua biến môi trường <c>Email__BrevoApiKey</c>.</summary>
    public string? BrevoApiKey { get; set; }

    /// <summary>
    /// Địa chỉ gửi thuần (<c>onboarding@resend.dev</c>). Chấp nhận cả dạng dán nhầm <c>Game Hub &lt;a@b.co&gt;</c>
    /// hoặc <c>[a@b.co](mailto:a@b.co)</c> để không tạo ra tiêu đề From lồng nhau bị Resend từ chối (422).
    /// </summary>
    public string? FromEmail
    {
        get
        {
            var m = System.Text.RegularExpressions.Regex.Match(FromAddress ?? "", @"[^\s<>\[\]()]+@[^\s<>\[\]()]+");
            return m.Success ? m.Value : null;
        }
    }

    public bool Configured => !string.IsNullOrWhiteSpace(FromEmail) && Provider.ToLowerInvariant() switch
    {
        "smtp" => !string.IsNullOrWhiteSpace(SmtpHost) && !string.IsNullOrWhiteSpace(SmtpUser) && !string.IsNullOrWhiteSpace(SmtpPassword),
        "resend" => !string.IsNullOrWhiteSpace(ResendApiKey),
        "brevo" => !string.IsNullOrWhiteSpace(BrevoApiKey),
        _ => false,
    };
}
