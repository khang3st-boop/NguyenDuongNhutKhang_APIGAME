using Microsoft.EntityFrameworkCore;
using NguyenDuongNhutKhang_APIGAME.Data;
using NguyenDuongNhutKhang_APIGAME.DTOs;
using NguyenDuongNhutKhang_APIGAME.Helpers;
using NguyenDuongNhutKhang_APIGAME.Interfaces;
using NguyenDuongNhutKhang_APIGAME.Models;
using NguyenDuongNhutKhang_APIGAME.Repositories;

namespace NguyenDuongNhutKhang_APIGAME.Services;

/// <summary>Lời mời thách đấu trực tiếp (bảng Challenges): hết hạn sau 60 giây; chấp nhận → tạo trận hoặc vào phòng chờ.</summary>
public class InviteService(
    AppDbContext db, OnlineRepository repo, MatchService matches, IUserService users,
    RealtimeNotifier notifier, TimeProvider clock) : IInviteService
{
    public static readonly TimeSpan Lifetime = TimeSpan.FromSeconds(60);
    private const int MaxPendingOutgoing = 5;

    private DateTime Now => clock.GetUtcNow().UtcDateTime;

    public async Task<List<InviteDto>> PendingAsync(Guid me)
    {
        var now = Now;
        var rows = await db.Challenges.AsNoTracking()
            .Where(c => (c.FromUserId == me || c.ToUserId == me) && c.Status == InviteStatus.Pending && c.ExpiresAt > now)
            .OrderByDescending(c => c.CreatedAt).Take(50).ToListAsync();
        return await ToDtosAsync(rows);
    }

    public async Task<InviteDto> CreateAsync(Guid me, CreateInviteRequest req)
    {
        var target = req.UserId!.Value;
        if (target == me) throw AppException.BadRequest("Không thể tự mời chính mình.", "SELF");
        if (!await repo.UserExistsAsync(target) || await repo.BlockedEitherAsync(me, target))
            throw AppException.NotFound("Không tìm thấy người chơi.");

        var now = Now;
        string game = req.Game, mode = req.Mode;
        var capacity = 2;
        if (req.RoomId is { } roomId)
        {
            var room = await matches.LoadAsync(roomId, noTracking: true);
            if (room == null || room.Participants.All(p => p.UserId != me)) throw AppException.NotFound("Không tìm thấy phòng.");
            if (room.Status != MatchStatus.Waiting) throw AppException.Conflict("Phòng đã bắt đầu hoặc đã đóng.", "ROOM_CLOSED");
            if (room.Participants.Count >= room.Capacity) throw AppException.Conflict("Phòng đã đủ người.", "ROOM_FULL");
            if (room.Participants.Any(p => p.UserId == target)) throw AppException.Conflict("Người này đã ở trong phòng.", "ALREADY_IN_ROOM");
            (game, mode, capacity) = (room.Game, room.Mode, room.Capacity);
        }
        else
        {
            MatchService.Validate(game, mode, capacity);
            await matches.EnsureFreeAsync(me);
        }
        if (await repo.ActiveMatchIdAsync(target) != null) throw AppException.Conflict("Người chơi đang ở trong trận khác.", "TARGET_BUSY");

        var pending = await db.Challenges.Where(c => c.FromUserId == me && c.Status == InviteStatus.Pending && c.ExpiresAt > now)
            .Select(c => c.ToUserId).ToListAsync();
        if (pending.Contains(target)) throw AppException.Conflict("Bạn đã mời người này, hãy chờ trả lời.", "INVITE_EXISTS");
        if (pending.Count >= MaxPendingOutgoing) throw AppException.TooMany("Bạn đang có quá nhiều lời mời chờ trả lời.");

        var invite = new Challenge
        {
            FromUserId = me, ToUserId = target, Game = game, Mode = mode, Capacity = capacity, MatchRoomId = req.RoomId,
            CreatedAt = now, ExpiresAt = now + Lifetime,
        };
        db.Challenges.Add(invite);
        await db.SaveChangesAsync();
        var dto = (await ToDtosAsync([invite]))[0];
        await notifier.InviteReceivedAsync(dto);
        return dto;
    }

    public async Task<InviteDto> AcceptAsync(Guid me, Guid id)
    {
        var invite = await db.Challenges.FirstOrDefaultAsync(c => c.Id == id && c.ToUserId == me) ?? throw AppException.NotFound("Không tìm thấy lời mời.");
        var now = Now;
        if (invite.Status == InviteStatus.Accepted) return (await ToDtosAsync([invite]))[0];
        if (invite.Status != InviteStatus.Pending) throw AppException.Conflict("Lời mời không còn hiệu lực.", "INVITE_CLOSED");
        if (invite.ExpiresAt <= now) throw AppException.Conflict("Lời mời đã hết hạn.", "INVITE_EXPIRED");
        if (await repo.BlockedEitherAsync(me, invite.FromUserId)) throw AppException.NotFound("Không tìm thấy lời mời.");

        // Giành quyền chấp nhận nguyên tử: chỉ một yêu cầu chuyển được PENDING → ACCEPTED.
        var claimed = await db.Challenges.Where(c => c.Id == id && c.Status == InviteStatus.Pending)
            .ExecuteUpdateAsync(s => s.SetProperty(c => c.Status, InviteStatus.Accepted).SetProperty(c => c.RespondedAt, now));
        if (claimed == 0) throw AppException.Conflict("Lời mời vừa được xử lý ở nơi khác.", "INVITE_CLOSED");

        MatchRoom room;
        var created = false;
        try
        {
            if (invite.MatchRoomId is { } roomId) room = await matches.JoinAsync(me, roomId);
            else
            {
                await matches.EnsureFreeAsync(me);
                if (await repo.ActiveMatchIdAsync(invite.FromUserId) != null)
                    throw AppException.Conflict("Người mời đang ở trong trận khác.", "TARGET_BUSY");
                room = await matches.NewMatchAsync(invite.Game, invite.Mode, 2, MatchSource.Invite, [invite.FromUserId, me]);
                created = true;
            }
        }
        catch
        {
            // Không tạo / vào được trận → trả lời mời về trạng thái huỷ để hai bên biết.
            await db.Challenges.Where(c => c.Id == id).ExecuteUpdateAsync(s => s.SetProperty(c => c.Status, InviteStatus.Cancelled));
            throw;
        }

        await db.Challenges.Where(c => c.Id == id).ExecuteUpdateAsync(s => s.SetProperty(c => c.MatchRoomId, room.Id));
        invite.Status = InviteStatus.Accepted;
        invite.RespondedAt = now;
        invite.MatchRoomId = room.Id;
        var dto = (await ToDtosAsync([invite]))[0];
        await notifier.InviteUpdatedAsync(dto);
        await matches.PublishAsync(room, created ? "match.created" : null);
        return dto;
    }

    public Task<InviteDto> DeclineAsync(Guid me, Guid id) => CloseAsync(id, c => c.ToUserId == me, InviteStatus.Declined);

    public Task<InviteDto> CancelAsync(Guid me, Guid id) => CloseAsync(id, c => c.FromUserId == me, InviteStatus.Cancelled);

    private async Task<InviteDto> CloseAsync(Guid id, Func<Challenge, bool> allowed, string status)
    {
        var invite = await db.Challenges.FirstOrDefaultAsync(c => c.Id == id);
        if (invite == null || !allowed(invite)) throw AppException.NotFound("Không tìm thấy lời mời.");
        if (invite.Status != InviteStatus.Pending) throw AppException.Conflict("Lời mời không còn hiệu lực.", "INVITE_CLOSED");
        invite.Status = status;
        invite.RespondedAt = Now;
        await db.SaveChangesAsync();
        var dto = (await ToDtosAsync([invite]))[0];
        await notifier.InviteUpdatedAsync(dto);
        return dto;
    }

    /// <summary>Đánh dấu EXPIRED cho lời mời quá 60 giây (dịch vụ nền gọi) và báo <c>invite.expired</c> cho hai bên.</summary>
    internal async Task<int> ExpireAsync(CancellationToken ct)
    {
        var now = Now;
        var due = await db.Challenges.AsNoTracking().Where(c => c.Status == InviteStatus.Pending && c.ExpiresAt <= now)
            .OrderBy(c => c.ExpiresAt).Take(100).ToListAsync(ct);
        var expired = new List<Challenge>();
        foreach (var c in due)
        {
            // Điều kiện PENDING: lời mời vừa được chấp nhận / từ chối ở nơi khác thì không ghi đè.
            var n = await db.Challenges.Where(x => x.Id == c.Id && x.Status == InviteStatus.Pending)
                .ExecuteUpdateAsync(s => s.SetProperty(x => x.Status, InviteStatus.Expired).SetProperty(x => x.RespondedAt, now), ct);
            if (n == 0) continue;
            c.Status = InviteStatus.Expired;
            c.RespondedAt = now;
            expired.Add(c);
        }
        if (expired.Count > 0)
            foreach (var dto in await ToDtosAsync(expired)) await notifier.InviteUpdatedAsync(dto);
        return expired.Count;
    }

    private async Task<List<InviteDto>> ToDtosAsync(List<Challenge> rows)
    {
        var summaries = await users.SummariesAsync(rows.SelectMany(r => new[] { r.FromUserId, r.ToUserId }).Distinct());
        var roomIds = rows.Where(r => r.MatchRoomId != null).Select(r => r.MatchRoomId!.Value).ToList();
        var roomRooms = roomIds.Count == 0 ? [] : (await db.MatchRooms.AsNoTracking()
            .Where(m => roomIds.Contains(m.Id) && m.Source == MatchSource.Room).Select(m => m.Id).ToListAsync()).ToHashSet();
        var unknown = new UserSummaryDto(Guid.Empty, "unknown", "Người chơi", 0);
        return rows.Select(r =>
        {
            var isRoom = r.MatchRoomId is { } m && roomRooms.Contains(m);
            return new InviteDto(r.Id, summaries.GetValueOrDefault(r.FromUserId) ?? unknown, summaries.GetValueOrDefault(r.ToUserId) ?? unknown,
                r.Game, r.Mode, r.Status, r.CreatedAt, r.ExpiresAt,
                r.Status == InviteStatus.Accepted ? r.MatchRoomId : null, r.Capacity, isRoom ? r.MatchRoomId : null);
        }).ToList();
    }
}
