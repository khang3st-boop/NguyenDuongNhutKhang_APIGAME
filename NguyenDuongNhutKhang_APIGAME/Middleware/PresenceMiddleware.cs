using NguyenDuongNhutKhang_APIGAME.Services;

namespace NguyenDuongNhutKhang_APIGAME.Middleware;

/// <summary>Ghi nhận "vừa hoạt động" cho người dùng đã xác thực (dùng tính trạng thái ONLINE của bạn bè).</summary>
public class PresenceMiddleware(RequestDelegate next, PresenceTracker presence)
{
    public Task InvokeAsync(HttpContext ctx)
    {
        if (ctx.User.Identity?.IsAuthenticated == true && Guid.TryParse(ctx.User.FindFirst("sub")?.Value, out var id))
            presence.Touch(id);
        return next(ctx);
    }
}
