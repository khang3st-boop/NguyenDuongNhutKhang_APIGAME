using Microsoft.EntityFrameworkCore;
using NguyenDuongNhutKhang_APIGAME.Data;
using NguyenDuongNhutKhang_APIGAME.DTOs;
using NguyenDuongNhutKhang_APIGAME.Helpers;
using NguyenDuongNhutKhang_APIGAME.Interfaces;
using NguyenDuongNhutKhang_APIGAME.Models;
using NguyenDuongNhutKhang_APIGAME.Repositories;

namespace NguyenDuongNhutKhang_APIGAME.Services;

/// <summary>
/// Ghép nhanh 2 người theo game + chế độ + khu vực thô (người chơi tự chọn, không GPS).
/// Cùng khu vực ghép ngay; bật <c>widen</c>: sau 10 giây mở sang vùng lân cận, sau 30 giây (cả hai bật) mở mọi vùng.
/// </summary>
public class MatchmakingService(AppDbContext db, OnlineRepository repo, MatchService matches, TimeProvider clock, ILogger<MatchmakingService> logger) : IMatchmakingService
{
    public static readonly TimeSpan TicketLifetime = TimeSpan.FromMinutes(5);
    public static readonly TimeSpan NeighbourAfter = TimeSpan.FromSeconds(10);
    public static readonly TimeSpan AnyAfter = TimeSpan.FromSeconds(30);

    /// <summary>Một tiến trình: ghép tuần tự để một vé không bị ghép hai lần.</summary>
    private static readonly SemaphoreSlim PairLock = new(1, 1);

    private DateTime Now => clock.GetUtcNow().UtcDateTime;

    public List<RegionDto> Regions() => [.. Helpers.Regions.All.Select(r => new RegionDto(r.Code, r.Name, r.Lat, r.Lon, r.Neighbours))];

    public async Task<QueueTicketDto> EnqueueAsync(Guid me, EnqueueRequest req)
    {
        MatchService.Validate(req.Game, req.Mode, 2);
        if (!Helpers.Regions.IsValid(req.Region)) throw AppException.BadRequest("Khu vực không hợp lệ.", "INVALID_REGION");
        await matches.EnsureFreeAsync(me);

        var now = Now;
        var t = await db.MatchmakingTickets.FirstOrDefaultAsync(x => x.UserId == me);
        if (t == null) db.MatchmakingTickets.Add(t = new MatchmakingTicket { UserId = me, CreatedAt = now });
        else if (t.Game != req.Game || t.Mode != req.Mode || t.Region != req.Region) t.CreatedAt = now;
        t.Game = req.Game;
        t.Mode = req.Mode;
        t.Region = req.Region;
        t.Widen = req.Widen;
        t.ExpiresAt = now + TicketLifetime;
        t.MatchRoomId = null;
        await db.SaveChangesAsync();

        var dto = await ToDtoAsync(t);
        await PairAsync();
        return dto;
    }

    public async Task<QueueTicketDto?> TicketAsync(Guid me)
    {
        var now = Now;
        var t = await db.MatchmakingTickets.AsNoTracking().FirstOrDefaultAsync(x => x.UserId == me && x.ExpiresAt > now);
        return t == null ? null : await ToDtoAsync(t);
    }

    public async Task LeaveAsync(Guid me) => await db.MatchmakingTickets.Where(x => x.UserId == me).ExecuteDeleteAsync();

    public async Task PairAsync()
    {
        await PairLock.WaitAsync();
        try
        {
            var now = Now;
            await db.MatchmakingTickets.Where(t => t.ExpiresAt <= now).ExecuteDeleteAsync();
            var tickets = await db.MatchmakingTickets.AsNoTracking().Where(t => t.MatchRoomId == null)
                .OrderBy(t => t.CreatedAt).Take(500).ToListAsync();
            var used = new HashSet<Guid>();
            foreach (var a in tickets)
            {
                if (used.Contains(a.UserId)) continue;
                if (await repo.ActiveMatchIdAsync(a.UserId) != null)
                {
                    used.Add(a.UserId);
                    await db.MatchmakingTickets.Where(t => t.UserId == a.UserId).ExecuteDeleteAsync();
                    continue;
                }
                foreach (var b in tickets.Where(b => b.UserId != a.UserId && !used.Contains(b.UserId) && b.Game == a.Game && b.Mode == a.Mode)
                             .OrderBy(b => Distance(a, b, now)))
                {
                    if (Distance(a, b, now) == int.MaxValue) break;
                    if (await repo.BlockedEitherAsync(a.UserId, b.UserId) || await repo.ActiveMatchIdAsync(b.UserId) != null) continue;

                    var room = await matches.NewMatchAsync(a.Game, a.Mode, 2, MatchSource.Queue, [a.UserId, b.UserId]);
                    await db.MatchmakingTickets.Where(t => t.UserId == a.UserId || t.UserId == b.UserId).ExecuteDeleteAsync();
                    used.Add(a.UserId);
                    used.Add(b.UserId);
                    await matches.PublishAsync(room);
                    logger.LogInformation("Ghép trận {Game}/{Mode} {MatchId}", a.Game, a.Mode, room.Id);
                    break;
                }
            }
        }
        finally
        {
            PairLock.Release();
        }
    }

    /// <summary>0 = cùng vùng, 1 = lân cận (đã chờ đủ lâu), 2 = vùng bất kỳ; MaxValue = chưa được ghép.</summary>
    private static int Distance(MatchmakingTicket a, MatchmakingTicket b, DateTime now)
    {
        if (a.Region == b.Region) return 0;
        var waited = now - (a.CreatedAt < b.CreatedAt ? a.CreatedAt : b.CreatedAt);
        var neighbours = Helpers.Regions.Find(a.Region)?.Neighbours.Contains(b.Region) == true
                         || Helpers.Regions.Find(b.Region)?.Neighbours.Contains(a.Region) == true;
        if (neighbours && (a.Widen || b.Widen) && waited >= NeighbourAfter) return 1;
        if (a.Widen && b.Widen && waited >= AnyAfter) return 2;
        return int.MaxValue;
    }

    private async Task<QueueTicketDto> ToDtoAsync(MatchmakingTicket t)
    {
        var now = Now;
        var waiting = await db.MatchmakingTickets.CountAsync(x => x.UserId != t.UserId && x.Game == t.Game && x.Mode == t.Mode &&
                                                                  x.Region == t.Region && x.ExpiresAt > now && x.MatchRoomId == null);
        return new QueueTicketDto(t.Game, t.Mode, t.Region, t.Widen, await repo.RatingAsync(t.Game, t.UserId), t.CreatedAt, t.ExpiresAt, waiting);
    }
}
