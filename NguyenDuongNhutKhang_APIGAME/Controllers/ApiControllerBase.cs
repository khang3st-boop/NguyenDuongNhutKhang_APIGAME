using Microsoft.AspNetCore.Mvc;
using NguyenDuongNhutKhang_APIGAME.DTOs;
using NguyenDuongNhutKhang_APIGAME.Helpers;

namespace NguyenDuongNhutKhang_APIGAME.Controllers;

/// <summary>Controller gốc: route <c>/api/v1</c>, JSON, mô tả lỗi chuẩn cho Swagger.</summary>
[ApiController]
[Produces("application/json")]
[ProducesResponseType<ErrorResponse>(StatusCodes.Status400BadRequest)]
[ProducesResponseType<ErrorResponse>(StatusCodes.Status500InternalServerError)]
public abstract class ApiControllerBase : ControllerBase
{
    /// <summary>Id người dùng lấy từ claim <c>sub</c> của JWT đã xác minh.</summary>
    protected Guid UserId =>
        Guid.TryParse(User.FindFirst("sub")?.Value, out var id) ? id : throw AppException.Unauthorized("Chưa đăng nhập.");

    protected Guid? OptionalUserId =>
        Guid.TryParse(User.FindFirst("sub")?.Value, out var id) ? id : null;
}
