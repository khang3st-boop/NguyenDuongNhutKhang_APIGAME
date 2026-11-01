using Microsoft.AspNetCore.Mvc;
using NguyenDuongNhutKhang_APIGAME.Data;
using NguyenDuongNhutKhang_APIGAME.DTOs;

namespace NguyenDuongNhutKhang_APIGAME.Controllers;

/// <summary>Kiểm tra tình trạng máy chủ.</summary>
[Route("api/v1/health")]
[Tags("Health")]
public class HealthController(AppDbContext db, TimeProvider clock) : ApiControllerBase
{
    /// <summary>Trạng thái API và kết nối cơ sở dữ liệu (không cần đăng nhập).</summary>
    /// <remarks>status = UP khi kết nối được database, DOWN (HTTP 503) khi không.</remarks>
    [HttpGet]
    [ProducesResponseType<HealthResponse>(StatusCodes.Status200OK)]
    [ProducesResponseType<HealthResponse>(StatusCodes.Status503ServiceUnavailable)]
    public async Task<IActionResult> Get(CancellationToken ct)
    {
        bool ok;
        try { ok = await db.Database.CanConnectAsync(ct); }
        catch { ok = false; }
        var version = typeof(HealthController).Assembly.GetName().Version?.ToString(3) ?? "1.0.0";
        var body = new HealthResponse(ok ? "UP" : "DOWN", ok ? "UP" : "DOWN", clock.GetUtcNow().UtcDateTime, version);
        return ok ? Ok(body) : StatusCode(StatusCodes.Status503ServiceUnavailable, body);
    }
}
