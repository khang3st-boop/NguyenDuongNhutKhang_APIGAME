using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NguyenDuongNhutKhang_APIGAME.Data;
using NguyenDuongNhutKhang_APIGAME.DTOs;
using NguyenDuongNhutKhang_APIGAME.Helpers;
using NguyenDuongNhutKhang_APIGAME.Models;

namespace NguyenDuongNhutKhang_APIGAME.Controllers;

/// <summary>Quản trị — chỉ tài khoản có role Admin. User thường gọi → 403.</summary>
[Route("api/v1/admin")]
[Tags("Admin")]
[Authorize(Roles = AppRoles.Admin)]
[ProducesResponseType<ErrorResponse>(StatusCodes.Status403Forbidden)]
public class AdminController(AppDbContext db, UserManager<AppUser> users, TimeProvider clock) : ApiControllerBase
{
    /// <summary>Danh sách người dùng (phân trang, lọc theo tên).</summary>
    [HttpGet("users")]
    [ProducesResponseType<List<AdminUserDto>>(StatusCodes.Status200OK)]
    public async Task<List<AdminUserDto>> ListUsers([FromQuery, StringLength(30)] string? q, [FromQuery, Range(0, 10_000)] int page = 0, [FromQuery, Range(1, 100)] int size = 20)
    {
        var query = db.Users.AsNoTracking().Include(u => u.Profile).AsQueryable();
        if (!string.IsNullOrWhiteSpace(q)) query = query.Where(u => u.UserName!.Contains(q) || u.Profile!.DisplayName.Contains(q));
        var list = await query.OrderBy(u => u.CreatedAt).Skip(page * size).Take(size).ToListAsync();

        var ids = list.Select(u => u.Id).ToList();
        var roleRows = await db.UserRoles.Where(r => ids.Contains(r.UserId))
            .Join(db.Roles, ur => ur.RoleId, r => r.Id, (ur, r) => new { ur.UserId, r.Name })
            .ToListAsync();
        var now = clock.GetUtcNow();
        return list.Select(u => new AdminUserDto(
            u.Id, u.UserName!, u.Profile?.DisplayName ?? u.UserName!, u.CreatedAt,
            [.. roleRows.Where(r => r.UserId == u.Id).Select(r => r.Name!).Order()],
            u.LockoutEnd != null && u.LockoutEnd > now)).ToList();
    }

    /// <summary>Cấp hoặc gỡ role của một người dùng. Không thể tự gỡ quyền Admin của chính mình.</summary>
    [HttpPut("users/{id:guid}/role")]
    [ProducesResponseType<AdminUserDto>(StatusCodes.Status200OK)]
    [ProducesResponseType<ErrorResponse>(StatusCodes.Status404NotFound)]
    public async Task<AdminUserDto> SetRole(Guid id, SetRoleRequest req)
    {
        var user = await users.FindByIdAsync(id.ToString()) ?? throw AppException.NotFound("Không tìm thấy người dùng.");
        if (id == UserId && req.Role == AppRoles.Admin && !req.Grant)
            throw AppException.BadRequest("Không thể tự gỡ quyền Admin của chính mình.");
        if (req.Role == AppRoles.User && !req.Grant)
            throw AppException.BadRequest("Mọi tài khoản đều phải có role User.");

        var has = await users.IsInRoleAsync(user, req.Role);
        if (req.Grant && !has) await users.AddToRoleAsync(user, req.Role);
        if (!req.Grant && has) await users.RemoveFromRoleAsync(user, req.Role);
        if (req.Grant != has)
        {
            // Đổi quyền → token cũ (mang role cũ) hết hiệu lực.
            user.TokenVersion++;
            await users.UpdateAsync(user);
        }
        var profile = await db.UserProfiles.AsNoTracking().FirstOrDefaultAsync(p => p.UserId == id);
        return new AdminUserDto(user.Id, user.UserName!, profile?.DisplayName ?? user.UserName!, user.CreatedAt,
            [.. (await users.GetRolesAsync(user)).Order()], await users.IsLockedOutAsync(user));
    }

    /// <summary>Báo cáo vi phạm từ người chơi (mặc định chỉ báo cáo đang mở).</summary>
    [HttpGet("reports")]
    [ProducesResponseType<List<AdminReportDto>>(StatusCodes.Status200OK)]
    public async Task<List<AdminReportDto>> Reports([FromQuery] bool all = false, [FromQuery, Range(1, 200)] int limit = 50)
    {
        var q = db.UserReports.AsNoTracking().AsQueryable();
        if (!all) q = q.Where(r => r.Status == "OPEN");
        var list = await q.OrderByDescending(r => r.CreatedAt).Take(limit).ToListAsync();
        var ids = list.SelectMany(r => new[] { r.ReporterId, r.TargetUserId }).Distinct().ToList();
        var people = await db.UserProfiles.AsNoTracking().Where(p => ids.Contains(p.UserId))
            .Select(p => new UserSummaryDto(p.UserId, p.User.UserName!, p.DisplayName, p.AvatarColor)).ToDictionaryAsync(p => p.Id);
        UserSummaryDto Get(Guid id) => people.GetValueOrDefault(id) ?? new UserSummaryDto(id, "?", "(đã xoá)", 0);
        return list.Select(r => new AdminReportDto(r.Id, Get(r.ReporterId), Get(r.TargetUserId), r.MatchRoomId, r.ChatMessageId,
            r.Reason, r.Status, r.CreatedAt)).ToList();
    }

    /// <summary>Đóng một báo cáo (đã xử lý).</summary>
    [HttpPost("reports/{id:long}/resolve")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> Resolve(long id)
    {
        var n = await db.UserReports.Where(r => r.Id == id).ExecuteUpdateAsync(s => s.SetProperty(r => r.Status, "RESOLVED"));
        return n == 0 ? throw AppException.NotFound() : NoContent();
    }

    /// <summary>Số liệu tổng quan.</summary>
    [HttpGet("stats")]
    [ProducesResponseType<AdminStatsDto>(StatusCodes.Status200OK)]
    public async Task<AdminStatsDto> Stats()
    {
        var adminRole = await db.Roles.Where(r => r.Name == AppRoles.Admin).Select(r => r.Id).FirstOrDefaultAsync();
        return new AdminStatsDto(
            await db.Users.CountAsync(),
            await db.UserRoles.CountAsync(r => r.RoleId == adminRole),
            await db.GameResults.CountAsync(),
            await db.MatchRooms.CountAsync(m => m.Status == MatchStatus.Waiting || m.Status == MatchStatus.Playing),
            await db.UserReports.CountAsync(r => r.Status == "OPEN"));
    }
}
