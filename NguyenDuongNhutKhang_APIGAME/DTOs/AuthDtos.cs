using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace NguyenDuongNhutKhang_APIGAME.DTOs;

/// <summary>
/// Đăng ký tài khoản. Chỉ nhận đúng 3 trường; gửi thêm trường lạ (ví dụ <c>role</c>) → 400.
/// Tài khoản mới luôn có quyền <c>User</c>.
/// </summary>
[JsonUnmappedMemberHandling(JsonUnmappedMemberHandling.Disallow)]
public class RegisterRequest
{
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

public class LoginRequest
{
    /// <example>khang_01</example>
    [Required(ErrorMessage = "Vui lòng nhập tên đăng nhập.")]
    [StringLength(20)]
    public string Username { get; set; } = "";

    /// <example>MatKhau123</example>
    [Required(ErrorMessage = "Vui lòng nhập mật khẩu.")]
    [StringLength(72)]
    public string Password { get; set; } = "";
}

public class RefreshRequest
{
    [Required(ErrorMessage = "Thiếu refresh token.")]
    [StringLength(200)]
    public string RefreshToken { get; set; } = "";
}

public class LogoutRequest
{
    [Required(ErrorMessage = "Thiếu refresh token.")]
    [StringLength(200)]
    public string RefreshToken { get; set; } = "";

    /// <summary>true = đăng xuất mọi thiết bị (thu hồi mọi refresh token và access token).</summary>
    public bool AllDevices { get; set; }
}

public class ChangePasswordRequest
{
    [Required(ErrorMessage = "Vui lòng nhập mật khẩu hiện tại.")]
    [StringLength(72)]
    public string CurrentPassword { get; set; } = "";

    [Required(ErrorMessage = "Vui lòng nhập mật khẩu mới.")]
    [StringLength(72, MinimumLength = 8, ErrorMessage = "Mật khẩu 8–72 ký tự.")]
    [RegularExpression(@"^(?=.*[A-Za-z])(?=.*\d).+$", ErrorMessage = "Mật khẩu phải có cả chữ và số.")]
    public string NewPassword { get; set; } = "";
}

/// <summary>Cập nhật hồ sơ — trường null = giữ nguyên. Không cho đổi username/role ở đây.</summary>
[JsonUnmappedMemberHandling(JsonUnmappedMemberHandling.Disallow)]
public class UpdateProfileRequest
{
    [StringLength(30, MinimumLength = 2, ErrorMessage = "Tên hiển thị 2–30 ký tự.")]
    [RegularExpression(@"^[^<>\p{Cc}]*$", ErrorMessage = "Tên hiển thị chứa ký tự không hợp lệ.")]
    public string? DisplayName { get; set; }

    [Range(0, 7, ErrorMessage = "Màu avatar từ 0 đến 7.")]
    public int? AvatarColor { get; set; }

    [StringLength(200, ErrorMessage = "Giới thiệu tối đa 200 ký tự.")]
    [RegularExpression(@"^[^<>]*$", ErrorMessage = "Giới thiệu chứa ký tự không hợp lệ.")]
    public string? Bio { get; set; }

    public bool? ShowStats { get; set; }
}

public record UserDto(Guid Id, string Username, string DisplayName, int AvatarColor, DateTime CreatedAt);

/// <summary>Hồ sơ đầy đủ của chính mình (GET /users/me).</summary>
public record MeDto(
    Guid Id,
    string Username,
    string DisplayName,
    int AvatarColor,
    DateTime CreatedAt,
    string? Bio,
    bool ShowStats,
    IReadOnlyList<string> Roles);

public record AuthResponse(
    string AccessToken,
    string RefreshToken,
    int ExpiresIn,
    string TokenType,
    UserDto User);

// ---- Quản trị ----

public record AdminUserDto(
    Guid Id,
    string Username,
    string DisplayName,
    DateTime CreatedAt,
    IReadOnlyList<string> Roles,
    bool LockedOut);

public class SetRoleRequest
{
    /// <summary>"User" hoặc "Admin".</summary>
    [Required]
    [RegularExpression("^(User|Admin)$", ErrorMessage = "Role chỉ được là User hoặc Admin.")]
    public string Role { get; set; } = "";

    /// <summary>true = cấp role, false = gỡ role.</summary>
    public bool Grant { get; set; } = true;
}

public record AdminStatsDto(int Users, int Admins, int Results, int ActiveMatches, int OpenReports);

public record AdminReportDto(
    long Id,
    UserSummaryDto Reporter,
    UserSummaryDto Target,
    Guid? MatchId,
    long? MessageId,
    string Reason,
    string Status,
    DateTime CreatedAt);
