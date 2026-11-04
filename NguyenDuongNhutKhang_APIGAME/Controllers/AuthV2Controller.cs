using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using NguyenDuongNhutKhang_APIGAME.DTOs;
using NguyenDuongNhutKhang_APIGAME.Services;

namespace NguyenDuongNhutKhang_APIGAME.Controllers;

/// <summary>Xác thực V2: đăng ký email + OTP, quên mật khẩu, đăng nhập Google (contract <c>gamehub-auth-v2</c>).</summary>
[Route("api/v1/auth")]
[Tags("Auth V2")]
[EnableRateLimiting("auth")]
[ProducesResponseType<ErrorResponse>(StatusCodes.Status429TooManyRequests)]
[ProducesResponseType<ErrorResponse>(StatusCodes.Status503ServiceUnavailable)]
public class AuthV2Controller(IAuthV2Service v2) : ApiControllerBase
{
    private string ClientIp => HttpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown";

    /// <summary>Tính năng V2 nào đang dùng được (phản ánh cấu hình thật: email provider, OTP key, Google client ID).</summary>
    /// <remarks>Flutter chỉ bật nút tương ứng khi cờ là <c>true</c>.</remarks>
    [HttpGet("capabilities")]
    [AllowAnonymous]
    [ProducesResponseType<AuthCapabilitiesDto>(StatusCodes.Status200OK)]
    public AuthCapabilitiesDto Capabilities() => v2.Capabilities();

    /// <summary>Bước 1 đăng ký bằng email: gửi OTP 6 số tới email. Chưa tạo tài khoản.</summary>
    /// <remarks>
    /// OTP có hiệu lực 5 phút, dùng một lần, gửi lại sau tối thiểu 60 giây, tối đa 5 lần nhập sai.
    /// Mã không bao giờ nằm trong response.
    /// </remarks>
    /// <response code="202">Đã gửi mã. Dùng <c>challengeId</c> để xác minh.</response>
    /// <response code="409"><c>USERNAME_TAKEN</c> hoặc <c>EMAIL_TAKEN</c>.</response>
    /// <response code="502"><c>EMAIL_PROVIDER_REJECTED</c>: nhà cung cấp email từ chối.</response>
    /// <response code="503"><c>AUTH_NOT_READY</c> (chưa cấu hình email) hoặc <c>EMAIL_SEND_FAILED</c>.</response>
    [HttpPost("email/register")]
    [AllowAnonymous]
    [ProducesResponseType<OtpChallengeDto>(StatusCodes.Status202Accepted)]
    [ProducesResponseType<ErrorResponse>(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> RegisterEmail(EmailRegisterRequest req, CancellationToken ct) =>
        Accepted(await v2.RegisterEmailAsync(req, ClientIp, ct));

    /// <summary>Bước 2 đăng ký: nhập OTP đúng → tạo tài khoản (quyền User) và cấp JWT + refresh token.</summary>
    /// <response code="400"><c>OTP_INVALID</c> (kèm <c>remainingAttempts</c> trong fieldErrors) hoặc <c>OTP_EXPIRED</c>.</response>
    /// <response code="429"><c>OTP_ATTEMPTS_EXCEEDED</c>.</response>
    [HttpPost("email/verify")]
    [AllowAnonymous]
    [ProducesResponseType<AuthResponse>(StatusCodes.Status200OK)]
    public async Task<AuthResponse> VerifyEmail(VerifyOtpRequest req, CancellationToken ct) =>
        await v2.VerifyEmailAsync(req, ct);

    /// <summary>Gửi lại OTP: tạo mã mới và vô hiệu mã/challenge cũ.</summary>
    /// <response code="429"><c>RESEND_TOO_SOON</c> (chưa đủ 60 giây, có header Retry-After) hoặc <c>RATE_LIMITED</c>.</response>
    [HttpPost("otp/resend")]
    [AllowAnonymous]
    [ProducesResponseType<OtpChallengeDto>(StatusCodes.Status202Accepted)]
    public async Task<IActionResult> Resend(ResendOtpRequest req, CancellationToken ct) =>
        Accepted(await v2.ResendAsync(req, ClientIp, ct));

    /// <summary>Quên mật khẩu bước 1: luôn trả 202 dù email có tồn tại hay không (chống dò tài khoản).</summary>
    [HttpPost("password/forgot")]
    [AllowAnonymous]
    [ProducesResponseType<OtpChallengeDto>(StatusCodes.Status202Accepted)]
    public async Task<IActionResult> Forgot(ForgotPasswordRequest req, CancellationToken ct) =>
        Accepted(await v2.ForgotPasswordAsync(req, ClientIp, ct));

    /// <summary>Quên mật khẩu bước 2: nhập OTP đúng → nhận <c>resetToken</c> dùng một lần. KHÔNG cấp phiên đăng nhập.</summary>
    [HttpPost("password/verify-otp")]
    [AllowAnonymous]
    [ProducesResponseType<ResetTokenDto>(StatusCodes.Status200OK)]
    public async Task<ResetTokenDto> VerifyResetOtp(VerifyOtpRequest req, CancellationToken ct) =>
        await v2.VerifyResetOtpAsync(req, ct);

    /// <summary>Quên mật khẩu bước 3: đặt mật khẩu mới. Thu hồi mọi phiên cũ; người dùng phải đăng nhập lại.</summary>
    /// <response code="204">Đã đổi mật khẩu.</response>
    /// <response code="400"><c>RESET_TOKEN_INVALID</c> hoặc <c>WEAK_PASSWORD</c>.</response>
    [HttpPost("password/reset")]
    [AllowAnonymous]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> Reset(ResetPasswordRequest req, CancellationToken ct)
    {
        await v2.ResetPasswordAsync(req, ct);
        return NoContent();
    }

    /// <summary>Đăng nhập bằng Google: gửi ID token từ SDK Google, backend tự xác minh rồi cấp JWT Game Hub.</summary>
    /// <remarks>
    /// Backend xác minh chữ ký, issuer, audience (client ID cấu hình), hạn và <c>email_verified</c>; dùng <c>sub</c> làm định danh.
    /// Không bao giờ nhận email / user id do client gửi.
    /// </remarks>
    /// <response code="401"><c>GOOGLE_TOKEN_INVALID</c> hoặc <c>GOOGLE_EMAIL_NOT_VERIFIED</c>.</response>
    /// <response code="409"><c>ACCOUNT_EXISTS_LINK_REQUIRED</c>: email đã có tài khoản, cần liên kết thủ công.</response>
    [HttpPost("google")]
    [AllowAnonymous]
    [ProducesResponseType<AuthResponse>(StatusCodes.Status200OK)]
    [ProducesResponseType<ErrorResponse>(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType<ErrorResponse>(StatusCodes.Status409Conflict)]
    public async Task<AuthResponse> Google(GoogleLoginRequest req, CancellationToken ct) =>
        await v2.GoogleLoginAsync(req, ct);

    /// <summary>Liên kết Google vào tài khoản đang đăng nhập (chứng minh quyền sở hữu bằng phiên hiện tại + Google ID token).</summary>
    [HttpPost("google/link")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType<ErrorResponse>(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> LinkGoogle(GoogleLoginRequest req, CancellationToken ct)
    {
        await v2.LinkGoogleAsync(UserId, req, ct);
        return NoContent();
    }
}
