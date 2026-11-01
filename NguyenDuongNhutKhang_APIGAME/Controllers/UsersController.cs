using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using NguyenDuongNhutKhang_APIGAME.DTOs;
using NguyenDuongNhutKhang_APIGAME.Services;

namespace NguyenDuongNhutKhang_APIGAME.Controllers;

/// <summary>Hồ sơ của tôi, đổi mật khẩu, tìm người chơi.</summary>
[Route("api/v1/users")]
[Tags("Users")]
[Authorize]
public class UsersController(IUserService userService, IAuthService auth) : ApiControllerBase
{
    /// <summary>Xem hồ sơ của tôi (kèm danh sách role).</summary>
    [HttpGet("me")]
    [ProducesResponseType<MeDto>(StatusCodes.Status200OK)]
    public Task<MeDto> GetMe() => userService.GetMeAsync(UserId);

    /// <summary>Cập nhật hồ sơ (tên hiển thị, màu avatar, giới thiệu, hiện thống kê). Trường bỏ trống = giữ nguyên.</summary>
    /// <remarks>Không đổi được username hay role qua API này (gửi trường lạ → 400). App Flutter gọi bằng PATCH — cả PUT và PATCH đều được.</remarks>
    [HttpPut("me")]
    [HttpPatch("me")]
    [ProducesResponseType<MeDto>(StatusCodes.Status200OK)]
    public Task<MeDto> UpdateMe(UpdateProfileRequest req) => userService.UpdateMeAsync(UserId, req);

    /// <summary>Đổi mật khẩu. Thành công → mọi phiên đăng nhập (kể cả token hiện tại) bị thu hồi, cần đăng nhập lại.</summary>
    /// <response code="204">Đã đổi mật khẩu.</response>
    /// <response code="400">Mật khẩu hiện tại sai hoặc mật khẩu mới yếu.</response>
    [HttpPost("me/password")]
    [EnableRateLimiting("auth")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> ChangePassword(ChangePasswordRequest req)
    {
        await auth.ChangePasswordAsync(UserId, req);
        return NoContent();
    }

    /// <summary>Tìm người chơi theo tên đăng nhập / tên hiển thị (tối thiểu 2 ký tự). Không trả về người đã chặn.</summary>
    [HttpGet("search")]
    [ProducesResponseType<List<UserSummaryDto>>(StatusCodes.Status200OK)]
    public Task<List<UserSummaryDto>> Search([FromQuery, Required, StringLength(30)] string q, [FromQuery, Range(1, 50)] int limit = 20) =>
        userService.SearchAsync(UserId, q, limit);
}
