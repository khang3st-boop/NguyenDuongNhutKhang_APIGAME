namespace NguyenDuongNhutKhang_APIGAME.Models;

/// <summary>Mục đích của một thử thách OTP.</summary>
public static class ChallengePurpose
{
    public const string Register = "register";
    public const string PasswordReset = "passwordReset";
}

/// <summary>
/// Một lần gửi mã OTP qua email (bảng <c>AuthChallenges</c>). Mã chỉ lưu dạng HMAC có khoá; mật khẩu của đăng ký
/// đang chờ chỉ lưu dạng băm. Gửi lại mã = tạo bản ghi mới và đánh dấu bản cũ <see cref="SupersededAt"/>.
/// </summary>
public class AuthChallenge
{
    /// <summary>Chính là <c>challengeId</c> trả cho client (GUID ngẫu nhiên).</summary>
    public Guid Id { get; set; } = Guid.NewGuid();

    public string Purpose { get; set; } = "";

    /// <summary>Email đã chuẩn hoá (chữ thường).</summary>
    public string Email { get; set; } = "";

    /// <summary>Tài khoản đích khi quên mật khẩu. null = email không tồn tại (thử thách giả, không gửi thư).</summary>
    public Guid? UserId { get; set; }

    public string CodeHash { get; set; } = "";

    public DateTime CreatedAt { get; set; }
    public DateTime ExpiresAt { get; set; }
    public DateTime ResendAvailableAt { get; set; }

    public int Attempts { get; set; }
    public int MaxAttempts { get; set; } = 5;

    /// <summary>Đã nhập đúng mã (dùng một lần).</summary>
    public DateTime? ConsumedAt { get; set; }

    /// <summary>Đã bị mã mới thay thế (gửi lại) hoặc bị huỷ.</summary>
    public DateTime? SupersededAt { get; set; }

    /// <summary>Băm HMAC của IP người yêu cầu — chỉ để giới hạn tần suất, không lưu IP thật.</summary>
    public string IpHash { get; set; } = "";

    // ---- Đăng ký đang chờ xác minh (chưa tạo user) ----
    public string? PendingUsername { get; set; }
    public string? PendingDisplayName { get; set; }
    public string? PendingPasswordHash { get; set; }

    // ---- Quên mật khẩu: sau khi nhập đúng OTP ----
    public string? ResetTokenHash { get; set; }
    public DateTime? ResetTokenExpiresAt { get; set; }
    public DateTime? ResetUsedAt { get; set; }
}
