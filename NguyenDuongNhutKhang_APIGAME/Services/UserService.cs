using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using NguyenDuongNhutKhang_APIGAME.Data;
using NguyenDuongNhutKhang_APIGAME.DTOs;
using NguyenDuongNhutKhang_APIGAME.Helpers;
using NguyenDuongNhutKhang_APIGAME.Models;

namespace NguyenDuongNhutKhang_APIGAME.Services;

public interface IUserService
{
    Task<MeDto> GetMeAsync(Guid userId);
    Task<MeDto> UpdateMeAsync(Guid userId, UpdateProfileRequest req);
    Task<List<UserSummaryDto>> SearchAsync(Guid me, string q, int limit);
    Task<Dictionary<Guid, UserSummaryDto>> SummariesAsync(IEnumerable<Guid> ids);
}

public class UserService(AppDbContext db, UserManager<AppUser> users, TimeProvider clock) : IUserService
{
    public async Task<MeDto> GetMeAsync(Guid userId)
    {
        var user = await db.Users.AsNoTracking().Include(u => u.Profile).FirstOrDefaultAsync(u => u.Id == userId)
                   ?? throw AppException.NotFound("Không tìm thấy tài khoản.");
        var roles = await users.GetRolesAsync(user);
        return ToMe(user, roles);
    }

    public async Task<MeDto> UpdateMeAsync(Guid userId, UpdateProfileRequest req)
    {
        var profile = await db.UserProfiles.FirstOrDefaultAsync(p => p.UserId == userId)
                      ?? throw AppException.NotFound("Không tìm thấy tài khoản.");
        if (req.DisplayName != null) profile.DisplayName = req.DisplayName.Trim();
        if (req.AvatarColor != null) profile.AvatarColor = req.AvatarColor.Value;
        if (req.Bio != null) profile.Bio = req.Bio.Trim().Length == 0 ? null : req.Bio.Trim();
        if (req.ShowStats != null) profile.ShowStats = req.ShowStats.Value;
        profile.UpdatedAt = clock.GetUtcNow().UtcDateTime;
        await db.SaveChangesAsync();
        return await GetMeAsync(userId);
    }

    public async Task<List<UserSummaryDto>> SearchAsync(Guid me, string q, int limit)
    {
        q = q.Trim();
        if (q.Length < 2) return [];
        var blocked = db.UserBlocks.Where(b => b.BlockerId == me || b.BlockedId == me)
            .Select(b => b.BlockerId == me ? b.BlockedId : b.BlockerId);
        var pattern = $"%{q.Replace("[", "[[]").Replace("%", "[%]").Replace("_", "[_]")}%";
        return await db.UserProfiles.AsNoTracking()
            .Where(p => p.UserId != me && !blocked.Contains(p.UserId))
            .Where(p => EF.Functions.Like(p.User.UserName!, pattern) || EF.Functions.Like(p.DisplayName, pattern))
            .OrderBy(p => p.User.UserName)
            .Take(Math.Clamp(limit, 1, 50))
            .Select(p => new UserSummaryDto(p.UserId, p.User.UserName!, p.DisplayName, p.AvatarColor))
            .ToListAsync();
    }

    public async Task<Dictionary<Guid, UserSummaryDto>> SummariesAsync(IEnumerable<Guid> ids)
    {
        var list = ids.Distinct().ToList();
        return await db.UserProfiles.AsNoTracking()
            .Where(p => list.Contains(p.UserId))
            .Select(p => new UserSummaryDto(p.UserId, p.User.UserName!, p.DisplayName, p.AvatarColor))
            .ToDictionaryAsync(u => u.Id);
    }

    private static MeDto ToMe(AppUser u, IList<string> roles) => new(
        u.Id, u.UserName!, u.Profile?.DisplayName ?? u.UserName!, u.Profile?.AvatarColor ?? 0, u.CreatedAt,
        u.Profile?.Bio, u.Profile?.ShowStats ?? true, [.. roles.Order()]);
}
