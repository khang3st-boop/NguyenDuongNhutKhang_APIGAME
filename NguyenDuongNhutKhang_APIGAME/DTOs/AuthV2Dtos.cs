using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace NguyenDuongNhutKhang_APIGAME.DTOs;

/// <summary>Tính năng xác thực V2 đang thật sự dùng được trên backend này (phản ánh cấu hình thực tế).</summary>
public record AuthCapabilitiesDto(string Contract, bool EmailRegistration, bool PasswordReset, bool GoogleIdToken);

/// <summary>Một lần gửi OTP. Không bao giờ chứa mã hay email đầy đủ.</summary>
public record OtpChallengeDto(
    string ChallengeId,
    string Purpose,
    string MaskedEmail,
    int CodeLength,
    DateTime ExpiresAt,
    DateTime ResendAvailableAt,
    int RemainingAttempts);

public record ResetTokenDto(string ResetToken, DateTime ExpiresAt);

/// <summary>Đăng ký bằng email: chưa tạo tài khoản cho tới khi nhập đúng OTP. Chỉ nhận đúng 4 trường.</summary>
[JsonUnmappedMemberHandling(JsonUnmappedMemberHandling.Disallow)]
public class EmailRegisterRequest
{
    /// <example>khang@example.com</example>
    [Required(ErrorMessage = "Vui lòng nhập email.")]
    [StringLength(254, ErrorMessage = "Email tối đa 254 ký tự.")]
    public string Email { get; set; } = "";

    /// <example>khang_01</example>
    [Required(ErrorMessage = "Vui lòng nhập tên đăng nhập.")]
    [RegularExpression("^[a-zA-Z0-9_.]{3,20}$", ErrorMessage = "Tên đăng nhập 3–20 ký tự: chữ, số, dấu _ hoặc .")]
    public string Username { get; set; } = "";

    /// <example>Nhựt Khang</example>
    [Required(ErrorMessage = "Vui lòng nhập tên hiển thị.")]
    [StringLength(30, MinimumLength = 2, ErrorMessage = "Tên hiển thị 2–30 ký tự.")]
    [RegularExpression(@"^[^<>\p{Cc}]*$", ErrorMessage = "Tên hiển thị chứa ký tự không hợp lệ.")]
    public string DisplayName { get; set; } = "";

    /// <example>MatKhau123</example>
    [Required(ErrorMessage = "Vui lòng nhập mật khẩu.")]
    [StringLength(72, MinimumLength = 8, ErrorMessage = "Mật khẩu 8–72 ký tự.")]
    [RegularExpression(@"^(?=.*[A-Za-z])(?=.*\d).+$", ErrorMessage = "Mật khẩu phải có cả chữ và số.")]
    public string Password { get; set; } = "";
}

[JsonUnmappedMemberHandling(JsonUnmappedMemberHandling.Disallow)]
public class VerifyOtpRequest
{
    [Required(ErrorMessage = "Thiếu mã thử thách.")]
    [StringLength(64)]
    public string ChallengeId { get; set; } = "";

    /// <example>123456</example>
    [Required(ErrorMessage = "Vui lòng nhập mã xác minh.")]
    [RegularExpression(@"^\d{6}$", ErrorMessage = "Mã xác minh gồm 6 chữ số.")]
    public string Code { get; set; } = "";
}

[JsonUnmappedMemberHandling(JsonUnmappedMemberHandling.Disallow)]
public class ResendOtpRequest
{
    [Required(ErrorMessage = "Thiếu mã thử thách.")]
    [StringLength(64)]
    public string ChallengeId { get; set; } = "";
}

[JsonUnmappedMemberHandling(JsonUnmappedMemberHandling.Disallow)]
public class ForgotPasswordRequest
{
    /// <example>khang@example.com</example>
    [Required(ErrorMessage = "Vui lòng nhập email.")]
    [StringLength(254, ErrorMessage = "Email tối đa 254 ký tự.")]
    public string Email { get; set; } = "";
}

[JsonUnmappedMemberHandling(JsonUnmappedMemberHandling.Disallow)]
public class ResetPasswordRequest
{
    [Required(ErrorMessage = "Thiếu mã đặt lại mật khẩu.")]
    [StringLength(128)]
    public string ResetToken { get; set; } = "";

    [Required(ErrorMessage = "Vui lòng nhập mật khẩu mới.")]
    [StringLength(72, MinimumLength = 8, ErrorMessage = "Mật khẩu 8–72 ký tự.")]
    [RegularExpression(@"^(?=.*[A-Za-z])(?=.*\d).+$", ErrorMessage = "Mật khẩu phải có cả chữ và số.")]
    public string NewPassword { get; set; } = "";
}

/// <summary>Google ID token do SDK Google trên thiết bị cấp. Backend KHÔNG nhận email/id từ client.</summary>
[JsonUnmappedMemberHandling(JsonUnmappedMemberHandling.Disallow)]
public class GoogleLoginRequest
{
    [Required(ErrorMessage = "Thiếu Google ID token.")]
    [StringLength(4096)]
    public string IdToken { get; set; } = "";
}
