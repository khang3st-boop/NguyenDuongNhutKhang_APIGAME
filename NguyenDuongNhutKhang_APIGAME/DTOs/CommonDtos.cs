namespace NguyenDuongNhutKhang_APIGAME.DTOs;

/// <summary>Định dạng lỗi chung (giống backend Java để app Flutter đọc được).</summary>
public record ErrorResponse(
    string Code,
    string Message,
    IReadOnlyList<FieldError> FieldErrors,
    DateTime Timestamp,
    string Path);

public record FieldError(string Field, string Message);

public record HealthResponse(string Status, string Database, DateTime ServerTime, string Version);

/// <summary>Thông tin rút gọn của người chơi — không bao giờ chứa mật khẩu, email hay token.</summary>
public record UserSummaryDto(Guid Id, string Username, string DisplayName, int AvatarColor);
