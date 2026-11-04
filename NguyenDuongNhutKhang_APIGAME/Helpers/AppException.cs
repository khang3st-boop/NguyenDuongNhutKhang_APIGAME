namespace NguyenDuongNhutKhang_APIGAME.Helpers;

/// <summary>
/// Lỗi nghiệp vụ có mã + thông báo an toàn để trả cho client. Middleware chuyển thành <see cref="DTOs.ErrorResponse"/>.
/// </summary>
public class AppException(int status, string code, string message) : Exception(message)
{
    public int Status { get; } = status;
    public string Code { get; } = code;

    /// <summary>Thông tin có cấu trúc kèm lỗi (ví dụ <c>remainingAttempts</c> của OTP).</summary>
    public IReadOnlyList<DTOs.FieldError>? Fields { get; init; }

    /// <summary>Gợi ý header <c>Retry-After</c> (giây) cho lỗi 429.</summary>
    public int? RetryAfterSeconds { get; init; }

    public static AppException BadRequest(string message, string code = "BAD_REQUEST") => new(400, code, message);
    public static AppException NotFound(string message = "Không tìm thấy dữ liệu.") => new(404, "NOT_FOUND", message);
    public static AppException Forbidden(string message = "Bạn không có quyền thực hiện thao tác này.") => new(403, "FORBIDDEN", message);
    public static AppException Conflict(string message, string code = "CONFLICT") => new(409, code, message);
    public static AppException TooMany(string message = "Thao tác quá nhanh, vui lòng thử lại sau.") => new(429, "RATE_LIMITED", message);
    public static AppException Unauthorized(string message = "Sai tên đăng nhập hoặc mật khẩu.") => new(401, "UNAUTHORIZED", message);
}
