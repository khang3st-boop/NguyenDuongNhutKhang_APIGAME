using Microsoft.EntityFrameworkCore;
using NguyenDuongNhutKhang_APIGAME.Data;
using NguyenDuongNhutKhang_APIGAME.DTOs;
using NguyenDuongNhutKhang_APIGAME.Helpers;
using NguyenDuongNhutKhang_APIGAME.Interfaces;
using NguyenDuongNhutKhang_APIGAME.Models;
using NguyenDuongNhutKhang_APIGAME.Repositories;

namespace NguyenDuongNhutKhang_APIGAME.Services;

/// <summary>Bạn bè, chặn, báo cáo. Người đã chặn nhau không kết bạn / mời / thấy nhau được.</summary>
public class FriendService(AppDbContext db, OnlineRepository repo, IUserService users, PresenceTracker presence, TimeProvider clock) : IFriendService
{
    private const int MaxReportsPerHour = 10;

    public async Task<List<FriendDto>> FriendsAsync(Guid me)
    {
        var rows = await db.Friendships.AsNoTracking()
            .Where(f => f.Status == FriendStatus.Accepted && (f.RequesterId == me || f.AddresseeId == me))
            .Select(f => new { Other = f.RequesterId == me ? f.AddresseeId : f.RequesterId, Since = f.RespondedAt ?? f.CreatedAt })
            .ToListAsync();
        var ids = rows.Select(r => r.Other).ToList();
        var summaries = await users.SummariesAsync(ids);
        var statuses = await StatusesAsync(ids);
        return rows.Where(r => summaries.ContainsKey(r.Other))
            .Select(r => new FriendDto(summaries[r.Other], statuses[r.Other], r.Since))
            .OrderBy(f => f.Status == "OFFLINE").ThenBy(f => f.User.DisplayName).ToList();
    }

    /// <summary>Trạng thái do server tính: IN_MATCH &gt; READY (bật sảnh) &gt; ONLINE &gt; OFFLINE.</summary>
    public async Task<Dictionary<Guid, string>> StatusesAsync(IReadOnlyCollection<Guid> ids)
    {
        var now = clock.GetUtcNow().UtcDateTime;
        var inMatch = await repo.InMatchAsync(ids);
        var since = now - LobbyService.Ttl;
        var ready = (await db.PlayerPresences.Where(p => ids.Contains(p.UserId) && p.LastSeenAt > since).Select(p => p.UserId).ToListAsync()).ToHashSet();
        return ids.Distinct().ToDictionary(id => id, id =>
            inMatch.Contains(id) ? "IN_MATCH" : ready.Contains(id) ? "READY" : presence.IsOnline(id) ? "ONLINE" : "OFFLINE");
    }

    public async Task<FriendRequestsResponse> RequestsAsync(Guid me)
    {
        var rows = await db.Friendships.AsNoTracking()
            .Where(f => f.Status == FriendStatus.Pending && (f.RequesterId == me || f.AddresseeId == me))
            .OrderByDescending(f => f.CreatedAt).ToListAsync();
        var summaries = await users.SummariesAsync(rows.Select(r => r.RequesterId == me ? r.AddresseeId : r.RequesterId));
        FriendRequestDto? Map(Guid other, DateTime at) => summaries.TryGetValue(other, out var u) ? new FriendRequestDto(u, at) : null;
        return new FriendRequestsResponse(
            [.. rows.Where(r => r.AddresseeId == me).Select(r => Map(r.RequesterId, r.CreatedAt)).OfType<FriendRequestDto>()],
            [.. rows.Where(r => r.RequesterId == me).Select(r => Map(r.AddresseeId, r.CreatedAt)).OfType<FriendRequestDto>()]);
    }

    public async Task<FriendRequestResult> SendRequestAsync(Guid me, Guid target)
    {
        if (target == me) throw AppException.BadRequest("Không thể kết bạn với chính mình.", "SELF");
        // Bị chặn → trả như không tìm thấy, không tiết lộ việc chặn.
        if (!await repo.UserExistsAsync(target) || await repo.BlockedEitherAsync(me, target))
            throw AppException.NotFound("Không tìm thấy người chơi.");

        var existing = await db.Friendships.Where(f => (f.RequesterId == me && f.AddresseeId == target) || (f.RequesterId == target && f.AddresseeId == me)).ToListAsync();
        if (existing.Any(f => f.Status == FriendStatus.Accepted)) return new FriendRequestResult(FriendStatus.Accepted);

        var reverse = existing.FirstOrDefault(f => f.RequesterId == target);
        if (reverse != null)
        {
            // Người kia đã mời mình trước → đồng ý luôn.
            reverse.Status = FriendStatus.Accepted;
            reverse.RespondedAt = clock.GetUtcNow().UtcDateTime;
            db.Friendships.RemoveRange(existing.Where(f => f != reverse));
            await db.SaveChangesAsync();
            return new FriendRequestResult(FriendStatus.Accepted);
        }
        if (existing.Count > 0) return new FriendRequestResult(FriendStatus.Pending);

        db.Friendships.Add(new Friendship { RequesterId = me, AddresseeId = target, CreatedAt = clock.GetUtcNow().UtcDateTime });
        await db.SaveChangesAsync();
        return new FriendRequestResult(FriendStatus.Pending);
    }

    public async Task RespondAsync(Guid me, Guid requester, bool accept)
    {
        var f = await db.Friendships.FirstOrDefaultAsync(x => x.RequesterId == requester && x.AddresseeId == me && x.Status == FriendStatus.Pending)
                ?? throw AppException.NotFound("Không có lời mời kết bạn này.");
        if (accept)
        {
            f.Status = FriendStatus.Accepted;
            f.RespondedAt = clock.GetUtcNow().UtcDateTime;
        }
        else db.Friendships.Remove(f);
        await db.SaveChangesAsync();
    }

    public async Task RemoveAsync(Guid me, Guid other)
    {
        var n = await db.Friendships.Where(f => (f.RequesterId == me && f.AddresseeId == other) || (f.RequesterId == other && f.AddresseeId == me)).ExecuteDeleteAsync();
        if (n == 0) throw AppException.NotFound("Hai bạn chưa là bạn bè.");
    }

    public async Task BlockAsync(Guid me, Guid target)
    {
        if (target == me) throw AppException.BadRequest("Không thể tự chặn chính mình.", "SELF");
        if (!await repo.UserExistsAsync(target)) throw AppException.NotFound("Không tìm thấy người chơi.");
        if (!await db.UserBlocks.AnyAsync(b => b.BlockerId == me && b.BlockedId == target))
        {
            db.UserBlocks.Add(new UserBlock { BlockerId = me, BlockedId = target, CreatedAt = clock.GetUtcNow().UtcDateTime });
            await db.SaveChangesAsync();
        }
        // Chặn → huỷ kết bạn và các lời mời đang chờ giữa hai người.
        await db.Friendships.Where(f => (f.RequesterId == me && f.AddresseeId == target) || (f.RequesterId == target && f.AddresseeId == me)).ExecuteDeleteAsync();
        await db.Challenges.Where(c => c.Status == InviteStatus.Pending &&
                                       ((c.FromUserId == me && c.ToUserId == target) || (c.FromUserId == target && c.ToUserId == me)))
            .ExecuteUpdateAsync(s => s.SetProperty(c => c.Status, InviteStatus.Cancelled).SetProperty(c => c.RespondedAt, clock.GetUtcNow().UtcDateTime));
    }

    public async Task UnblockAsync(Guid me, Guid target) =>
        await db.UserBlocks.Where(b => b.BlockerId == me && b.BlockedId == target).ExecuteDeleteAsync();

    public async Task ReportAsync(Guid me, Guid target, string reason, Guid? matchId = null, long? messageId = null)
    {
        if (target == me) throw AppException.BadRequest("Không thể tự báo cáo chính mình.", "SELF");
        if (!await repo.UserExistsAsync(target)) throw AppException.NotFound("Không tìm thấy người chơi.");
        var now = clock.GetUtcNow().UtcDateTime;
        if (await db.UserReports.CountAsync(r => r.ReporterId == me && r.CreatedAt > now.AddHours(-1)) >= MaxReportsPerHour)
            throw AppException.TooMany("Bạn đã gửi quá nhiều báo cáo, vui lòng thử lại sau.");
        db.UserReports.Add(new UserReport
        {
            ReporterId = me, TargetUserId = target, MatchRoomId = matchId, ChatMessageId = messageId,
            Reason = reason.Trim(), CreatedAt = now,
        });
        await db.SaveChangesAsync();
    }
}

/// <summary>Sảnh "Cho phép mời đấu": chỉ người tự bật mới xuất hiện; hết hạn sau 10 phút không làm mới.</summary>
public class LobbyService(AppDbContext db, OnlineRepository repo, IUserService users, TimeProvider clock) : ILobbyService
{
    public static readonly TimeSpan Ttl = TimeSpan.FromMinutes(10);

    public async Task<LobbyEntryDto?> MineAsync(Guid me)
    {
        var p = await db.PlayerPresences.AsNoTracking().FirstOrDefaultAsync(x => x.UserId == me);
        return p == null || p.LastSeenAt + Ttl <= clock.GetUtcNow().UtcDateTime ? null : ToEntry(p);
    }

    public async Task<LobbyEntryDto> JoinAsync(Guid me, JoinLobbyRequest req)
    {
        var games = req.Games.Distinct().ToList();
        if (games.Any(g => !GameIds.IsValid(g))) throw AppException.BadRequest("Game không hợp lệ.", "INVALID_GAME");
        var caps = req.Capacities.Distinct().Order().ToList();
        if (caps.Any(c => c is not (2 or 4))) throw AppException.BadRequest("Số người chơi là 2 hoặc 4.", "INVALID_CAPACITY");
        if (req.Region != null && !Regions.IsValid(req.Region)) throw AppException.BadRequest("Khu vực không hợp lệ.", "INVALID_REGION");

        var p = await db.PlayerPresences.FirstOrDefaultAsync(x => x.UserId == me);
        if (p == null) db.PlayerPresences.Add(p = new PlayerPresence { UserId = me });
        p.Games = string.Join(',', games);
        p.Capacities = string.Join(',', caps);
        p.Region = req.Region;
        p.ShowStats = req.ShowStats;
        p.LastSeenAt = clock.GetUtcNow().UtcDateTime;
        await db.SaveChangesAsync();
        return ToEntry(p);
    }

    public async Task LeaveAsync(Guid me) => await db.PlayerPresences.Where(p => p.UserId == me).ExecuteDeleteAsync();

    public async Task<List<LobbyPlayerDto>> ListAsync(Guid me, string? game, string? region, int? capacity, bool readyOnly)
    {
        var since = clock.GetUtcNow().UtcDateTime - Ttl;
        var blocked = await repo.BlockedSetAsync(me);
        var rows = await db.PlayerPresences.AsNoTracking()
            .Where(p => p.UserId != me && p.LastSeenAt > since)
            .OrderByDescending(p => p.LastSeenAt).Take(200).ToListAsync();
        rows = rows.Where(p => !blocked.Contains(p.UserId)
                               && (game == null || Split(p.Games).Contains(game))
                               && (region == null || p.Region == region)
                               && (capacity == null || SplitInt(p.Capacities).Contains(capacity.Value))).ToList();

        var ids = rows.Select(r => r.UserId).ToList();
        var summaries = await users.SummariesAsync(ids);
        var inMatch = await repo.InMatchAsync(ids);
        if (readyOnly) rows = rows.Where(r => !inMatch.Contains(r.UserId)).ToList();
        var friends = (await db.Friendships.Where(f => f.Status == FriendStatus.Accepted && (f.RequesterId == me || f.AddresseeId == me))
            .Select(f => f.RequesterId == me ? f.AddresseeId : f.RequesterId).ToListAsync()).ToHashSet();

        var ratings = new Dictionary<string, Dictionary<Guid, OnlineRepository.RatingRow>>();
        foreach (var g in GameIds.All) ratings[g] = await repo.RatingsAsync(g, rows.Where(r => r.ShowStats).Select(r => r.UserId));

        return rows.Where(r => summaries.ContainsKey(r.UserId)).Select(r =>
        {
            var games = Split(r.Games);
            var stats = r.ShowStats
                ? games.Select(g => ratings[g].GetValueOrDefault(r.UserId) is { } x
                    ? new LobbyStatsDto(g, x.Rating, x.Played, x.Wins)
                    : new LobbyStatsDto(g, OnlineRepository.BaseRating, 0, 0)).ToList()
                : [];
            return new LobbyPlayerDto(summaries[r.UserId], games, SplitInt(r.Capacities),
                inMatch.Contains(r.UserId) ? "IN_MATCH" : "READY", RegionOf(r.Region), stats, friends.Contains(r.UserId));
        }).ToList();
    }

    private static LobbyEntryDto ToEntry(PlayerPresence p) =>
        new(Split(p.Games), SplitInt(p.Capacities), RegionOf(p.Region), p.ShowStats, p.LastSeenAt + Ttl);

    internal static RegionRef? RegionOf(string? code) => Regions.Find(code) is { } r ? new RegionRef(r.Code, r.Name) : null;
    private static List<string> Split(string csv) => [.. csv.Split(',', StringSplitOptions.RemoveEmptyEntries)];
    private static List<int> SplitInt(string csv) => [.. Split(csv).Select(int.Parse)];
}
