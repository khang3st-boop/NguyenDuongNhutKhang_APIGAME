using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using NguyenDuongNhutKhang_APIGAME.DTOs;
using NguyenDuongNhutKhang_APIGAME.Services;

namespace NguyenDuongNhutKhang_APIGAME.Controllers;

/// <summary>Đăng ký, đăng nhập, làm mới và thu hồi token.</summary>
[Route("api/v1/auth")]
[Tags("Auth")]
[EnableRateLimiting("auth")]
[ProducesResponseType<ErrorResponse>(StatusCodes.Status429TooManyRequests)]
public class AuthController(IAuthService auth) : ApiControllerBase
{
    /// <summary>Đăng ký tài khoản mới (luôn có quyền User).</summary>
    /// <remarks>
    /// Body chỉ gồm <c>username</c>, <c>displayName</c>, <c>password</c>. Gửi thêm <c>role</c> hoặc trường lạ → 400.
    /// Trả về access token (15 phút) + refresh token (30 ngày).
    /// </remarks>
    /// <response code="201">Tạo tài khoản thành công.</response>
    /// <response code="400">Dữ liệu không hợp lệ.</response>
    /// <response code="409">Tên đăng nhập đã được dùng.</response>
    [HttpPost("register")]
    [AllowAnonymous]
    [ProducesResponseType<AuthResponse>(StatusCodes.Status201Created)]
    [ProducesResponseType<ErrorResponse>(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> Register(RegisterRequest req) =>
        StatusCode(StatusCodes.Status201Created, await auth.RegisterAsync(req));

    /// <summary>Đăng nhập bằng tên đăng nhập + mật khẩu.</summary>
    /// <remarks>Sai 5 lần liên tiếp → khoá 5 phút (423).</remarks>
    /// <response code="401">Sai tên đăng nhập hoặc mật khẩu.</response>
    /// <response code="423">Tài khoản tạm khoá.</response>
    [HttpPost("login")]
    [AllowAnonymous]
    [ProducesResponseType<AuthResponse>(StatusCodes.Status200OK)]
    [ProducesResponseType<ErrorResponse>(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType<ErrorResponse>(StatusCodes.Status423Locked)]
    public async Task<AuthResponse> Login(LoginRequest req) => await auth.LoginAsync(req);

    /// <summary>Đổi refresh token lấy cặp token mới (refresh token cũ bị vô hiệu).</summary>
    /// <response code="401">Refresh token không hợp lệ / hết hạn / đã thu hồi.</response>
    [HttpPost("refresh")]
    [AllowAnonymous]
    [ProducesResponseType<AuthResponse>(StatusCodes.Status200OK)]
    [ProducesResponseType<ErrorResponse>(StatusCodes.Status401Unauthorized)]
    public async Task<AuthResponse> Refresh(RefreshRequest req) => await auth.RefreshAsync(req.RefreshToken);

    /// <summary>Đăng xuất: thu hồi refresh token (hoặc mọi thiết bị nếu <c>allDevices = true</c>).</summary>
    [HttpPost("logout")]
    [AllowAnonymous]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> Logout(LogoutRequest req)
    {
        await auth.LogoutAsync(OptionalUserId, req);
        return NoContent();
    }
}
