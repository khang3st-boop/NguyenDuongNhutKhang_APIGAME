using System.Text;
using Microsoft.EntityFrameworkCore;
using NguyenDuongNhutKhang_APIGAME.Data;
using NguyenDuongNhutKhang_APIGAME.DTOs;
using NguyenDuongNhutKhang_APIGAME.Helpers;
using NguyenDuongNhutKhang_APIGAME.Interfaces;
using NguyenDuongNhutKhang_APIGAME.Models;
using NguyenDuongNhutKhang_APIGAME.Repositories;

namespace NguyenDuongNhutKhang_APIGAME.Services;

/// <summary>
/// Trạng thái online của tôi (<c>/presence/me</c>) và phát sự kiện <c>presence</c> / <c>presence.self</c> / <c>match.connection</c>.
/// "Sẵn sàng thách đấu" = có dòng PlayerPresences (cùng sảnh <c>/lobby</c>), tự hết hạn sau <see cref="LobbyService.Ttl"/>.
/// </summary>
public class PresenceService(
    AppDbContext db, OnlineRepository repo, IFriendService friends, RealtimeNotifier notifier, TimeProvider clock)
{
    public async Task<PresenceDto> MineAsync(Guid me) => new((await friends.StatusesAsync([me]))[me]);

    public async Task<PresenceDto> SetReadyAsync(Guid me, bool ready)
    {
        if (ready)
        {
            var p = await db.PlayerPresences.FirstOrDefaultAsync(x => x.UserId == me);
            // Bật từ màn "Sẵn sàng": nhận lời mời mọi game, trận 2 người (đổi chi tiết qua PUT /lobby).
            if (p == null) db.PlayerPresences.Add(p = new PlayerPresence { UserId = me, Games = string.Join(',', GameIds.All), Capacities = "2" });
            p.LastSeenAt = clock.GetUtcNow().UtcDateTime;
            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException ex) when (GameResultService.IsUniqueViolation(ex))
            {
                // Hai yêu cầu bật cùng lúc — dòng đã có, coi như thành công.
            }
        }
        else await db.PlayerPresences.Where(x => x.UserId == me).ExecuteDeleteAsync();

        var status = await BroadcastAsync(me);
        await notifier.LobbyUpdatedAsync();
        return new PresenceDto(status);
    }

    /// <summary>Tính trạng thái hiện tại và báo cho bạn bè + chính mình.</summary>
    public async Task<string> BroadcastAsync(Guid me)
    {
        var status = (await friends.StatusesAsync([me]))[me];
        var friendIds = await db.Friendships.AsNoTracking()
            .Where(f => f.Status == FriendStatus.Accepted && (f.RequesterId == me || f.AddresseeId == me))
            .Select(f => f.RequesterId == me ? f.AddresseeId : f.RequesterId).ToListAsync();
        await notifier.PresenceAsync(friendIds, me, status);
        await notifier.PresenceSelfAsync(me, status);
        return status;
    }

    /// <summary>Mở / đóng kết nối realtime: báo bạn bè và người cùng trận đang diễn ra.</summary>
    public async Task ConnectionChangedAsync(Guid me, bool connected)
    {
        await BroadcastAsync(me);
        if (await repo.ActiveMatchIdAsync(me) is not { } matchId) return;
        var others = await db.MatchParticipants.AsNoTracking()
            .Where(p => p.MatchRoomId == matchId && p.UserId != me).Select(p => p.UserId).ToListAsync();
        await notifier.ConnectionAsync(others, matchId, me, connected);
    }
}

/// <summary>
/// Thách đấu Rubik bất đồng bộ <c>/challenges</c> (tương thích app Flutter / server Java). Server sinh scramble,
/// kiểm lời giải bằng mô phỏng khối; dùng trợ giúp khi thách đấu cấm trợ giúp → lượt đó không được tính thắng.
/// Hết hạn sau <see cref="Lifetime"/>: chỉ một người nộp hợp lệ → người đó thắng, không ai → EXPIRED.
/// </summary>
public class DuelService(AppDbContext db, OnlineRepository repo, IUserService users, TimeProvider clock)
{
    public static readonly TimeSpan Lifetime = TimeSpan.FromHours(24);
    public const long MinDurationMs = 3_000;
    private const int MaxActiveCreated = 10;

    private DateTime Now => clock.GetUtcNow().UtcDateTime;

    public async Task<List<DuelChallengeDto>> MineAsync(Guid me)
    {
        await SettleExpiredAsync();
        var rows = await db.DuelChallenges.AsNoTracking().Where(c => c.CreatorId == me || c.OpponentId == me)
            .OrderByDescending(c => c.CreatedAt).Take(50).ToListAsync();
        return await ToDtosAsync(rows);
    }

    public async Task<List<DuelChallengeDto>> OpenAsync(Guid me)
    {
        await SettleExpiredAsync();
        var now = Now;
        var blocked = await repo.BlockedSetAsync(me);
        var rows = await db.DuelChallenges.AsNoTracking()
            .Where(c => c.Status == DuelStatus.Open && c.OpponentId == null && c.CreatorId != me && c.ExpiresAt > now)
            .OrderByDescending(c => c.CreatedAt).Take(50).ToListAsync();
        return await ToDtosAsync(rows.Where(c => !blocked.Contains(c.CreatorId)).ToList());
    }

    public async Task<DuelChallengeDto> GetAsync(Guid me, Guid id)
    {
        await SettleExpiredAsync();
        var c = await db.DuelChallenges.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
        if (c == null || !(c.CreatorId == me || c.OpponentId == me || (c.OpponentId == null && c.Status == DuelStatus.Open)))
            throw AppException.NotFound("Không tìm thấy thách đấu.");
        return (await ToDtosAsync([c]))[0];
    }

    public async Task<DuelChallengeDto> CreateAsync(Guid me, CreateDuelRequest req)
    {
        if (req.OpponentId is { } target)
        {
            if (target == me) throw AppException.BadRequest("Không thể tự thách đấu chính mình.", "SELF");
            if (!await repo.UserExistsAsync(target) || await repo.BlockedEitherAsync(me, target))
                throw AppException.NotFound("Không tìm thấy người chơi.");
        }
        var now = Now;
        if (await db.DuelChallenges.CountAsync(c => c.CreatorId == me && (c.Status == DuelStatus.Open || c.Status == DuelStatus.Accepted) && c.ExpiresAt > now) >= MaxActiveCreated)
            throw AppException.TooMany("Bạn đang có quá nhiều thách đấu chưa xong.");

        var c = new DuelChallenge
        {
            CreatorId = me, OpponentId = req.OpponentId, Scramble = RubikVerifier.RandomScramble(20), AllowAssist = req.AllowAssist,
            Message = string.IsNullOrWhiteSpace(req.Message) ? null : req.Message.Trim(), CreatedAt = now, ExpiresAt = now + Lifetime,
        };
        db.DuelChallenges.Add(c);
        await db.SaveChangesAsync();
        return (await ToDtosAsync([c]))[0];
    }

    public async Task<DuelChallengeDto> AcceptAsync(Guid me, Guid id)
    {
        var c = await db.DuelChallenges.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Không tìm thấy thách đấu.");
        if (c.OpponentId is { } o && o != me) throw AppException.NotFound("Không tìm thấy thách đấu.");
        if (c.CreatorId == me) throw AppException.BadRequest("Không thể nhận thách đấu của chính mình.", "SELF");
        if (c.Status == DuelStatus.Accepted && c.OpponentId == me) return (await ToDtosAsync([c]))[0];
        if (c.Status != DuelStatus.Open || c.ExpiresAt <= Now) throw AppException.Conflict("Thách đấu không còn mở.", "CHALLENGE_CLOSED");
        if (await repo.BlockedEitherAsync(me, c.CreatorId)) throw AppException.NotFound("Không tìm thấy thách đấu.");

        // Nhận nguyên tử: thách đấu mở chỉ một người giành được.
        var claimed = await db.DuelChallenges.Where(x => x.Id == id && x.Status == DuelStatus.Open && (x.OpponentId == null || x.OpponentId == me))
            .ExecuteUpdateAsync(s => s.SetProperty(x => x.OpponentId, me).SetProperty(x => x.Status, DuelStatus.Accepted));
        if (claimed == 0) throw AppException.Conflict("Thách đấu vừa được người khác nhận.", "CHALLENGE_CLOSED");
        return await ReloadAsync(id);
    }

    public async Task<DuelChallengeDto> DeclineAsync(Guid me, Guid id)
    {
        var n = await db.DuelChallenges.Where(x => x.Id == id && x.OpponentId == me && x.Status == DuelStatus.Open)
            .ExecuteUpdateAsync(s => s.SetProperty(x => x.Status, DuelStatus.Declined));
        if (n == 0)
        {
            var c = await db.DuelChallenges.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id && x.OpponentId == me)
                    ?? throw AppException.NotFound("Không tìm thấy thách đấu.");
            if (c.Status != DuelStatus.Declined) throw AppException.Conflict("Thách đấu không còn chờ trả lời.", "CHALLENGE_CLOSED");
        }
        return await ReloadAsync(id);
    }

    public async Task<DuelChallengeDto> SubmitAsync(Guid me, Guid id, SubmitDuelRequest req)
    {
        var c = await db.DuelChallenges.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Không tìm thấy thách đấu.");
        var creator = c.CreatorId == me;
        if (!creator && c.OpponentId != me) throw AppException.NotFound("Không tìm thấy thách đấu.");
        if ((creator ? c.CreatorSubmittedAt : c.OpponentSubmittedAt) != null) return (await ToDtosAsync([c]))[0]; // gửi lại
        var open = creator ? c.Status is DuelStatus.Open or DuelStatus.Accepted : c.Status == DuelStatus.Accepted;
        if (!open || c.ExpiresAt <= Now) throw AppException.Conflict("Thách đấu đã đóng hoặc chưa được nhận.", "CHALLENGE_CLOSED");
        if (req.DurationMs < MinDurationMs || !RubikVerifier.Solves(c.Scramble, req.Solution))
            throw AppException.BadRequest("Lời giải không hợp lệ — server kiểm tra không khớp với scramble.", "RESULT_REJECTED");

        var moves = RubikVerifier.Parse(req.Solution)?.Count ?? req.Moves;
        var now = Now;
        var clientId = req.ClientId.Trim();
        if (creator)
            await db.DuelChallenges.Where(x => x.Id == id && x.CreatorSubmittedAt == null).ExecuteUpdateAsync(s => s
                .SetProperty(x => x.CreatorClientId, clientId).SetProperty(x => x.CreatorDurationMs, req.DurationMs)
                .SetProperty(x => x.CreatorMoves, moves).SetProperty(x => x.CreatorAssisted, req.Assisted)
                .SetProperty(x => x.CreatorSubmittedAt, now));
        else
            await db.DuelChallenges.Where(x => x.Id == id && x.OpponentSubmittedAt == null).ExecuteUpdateAsync(s => s
                .SetProperty(x => x.OpponentClientId, clientId).SetProperty(x => x.OpponentDurationMs, req.DurationMs)
                .SetProperty(x => x.OpponentMoves, moves).SetProperty(x => x.OpponentAssisted, req.Assisted)
                .SetProperty(x => x.OpponentSubmittedAt, now));

        var fresh = await db.DuelChallenges.AsNoTracking().FirstAsync(x => x.Id == id);
        if (fresh.Status == DuelStatus.Accepted && fresh.CreatorSubmittedAt != null && fresh.OpponentSubmittedAt != null)
            await CompleteAsync(fresh, DuelStatus.Accepted);
        return await ReloadAsync(id);
    }

    /// <summary>Chốt thách đấu quá hạn (gọi trước mỗi lần đọc — không cần dịch vụ nền).</summary>
    internal async Task SettleExpiredAsync()
    {
        var now = Now;
        var due = await db.DuelChallenges.AsNoTracking()
            .Where(c => (c.Status == DuelStatus.Open || c.Status == DuelStatus.Accepted) && c.ExpiresAt <= now)
            .OrderBy(c => c.ExpiresAt).Take(100).ToListAsync();
        foreach (var c in due)
        {
            if (c.Status == DuelStatus.Accepted && Winner(c) != null) await CompleteAsync(c, DuelStatus.Accepted);
            else
                await db.DuelChallenges.Where(x => x.Id == c.Id && x.Status == c.Status)
                    .ExecuteUpdateAsync(s => s.SetProperty(x => x.Status, DuelStatus.Expired));
        }
    }

    private Task<int> CompleteAsync(DuelChallenge c, string from)
    {
        var winner = Winner(c);
        return db.DuelChallenges.Where(x => x.Id == c.Id && x.Status == from)
            .ExecuteUpdateAsync(s => s.SetProperty(x => x.Status, DuelStatus.Completed).SetProperty(x => x.WinnerId, winner));
    }

    /// <summary>Nhanh hơn thắng → ít nước hơn → nộp sớm hơn. Dùng trợ giúp khi bị cấm → không được tính.</summary>
    internal static Guid? Winner(DuelChallenge c)
    {
        var entries = new List<(Guid User, long Ms, int Moves, DateTime At)>();
        if (c.CreatorSubmittedAt is { } ca && !(c.CreatorAssisted == true && !c.AllowAssist))
            entries.Add((c.CreatorId, c.CreatorDurationMs ?? long.MaxValue, c.CreatorMoves ?? int.MaxValue, ca));
        if (c.OpponentId is { } o && c.OpponentSubmittedAt is { } oa && !(c.OpponentAssisted == true && !c.AllowAssist))
            entries.Add((o, c.OpponentDurationMs ?? long.MaxValue, c.OpponentMoves ?? int.MaxValue, oa));
        return entries.OrderBy(e => e.Ms).ThenBy(e => e.Moves).ThenBy(e => e.At).Select(e => (Guid?)e.User).FirstOrDefault();
    }

    private async Task<DuelChallengeDto> ReloadAsync(Guid id) =>
        (await ToDtosAsync([await db.DuelChallenges.AsNoTracking().FirstAsync(x => x.Id == id)]))[0];

    private async Task<List<DuelChallengeDto>> ToDtosAsync(List<DuelChallenge> rows)
    {
        var summaries = await users.SummariesAsync(rows.SelectMany(r => r.OpponentId is { } o ? new[] { r.CreatorId, o } : [r.CreatorId]).Distinct());
        string Name(Guid id) => summaries.GetValueOrDefault(id)?.DisplayName ?? "Người chơi";
        return rows.Select(r => new DuelChallengeDto(
            r.Id, r.Scramble, r.Status, r.AllowAssist,
            new DuelEntryDto(r.CreatorId, Name(r.CreatorId), r.CreatorDurationMs, r.CreatorMoves, r.CreatorAssisted, r.CreatorSubmittedAt),
            r.OpponentId is { } o ? new DuelEntryDto(o, Name(o), r.OpponentDurationMs, r.OpponentMoves, r.OpponentAssisted, r.OpponentSubmittedAt) : null,
            r.WinnerId, r.CreatedAt, r.ExpiresAt, r.Message)).ToList();
    }
}

/// <summary>
/// Chat 1-1 ngoài trận <c>/chat/conversations</c>. Chỉ nhắn được cho bạn bè (hoặc trả lời người đã nhắn mình);
/// bị chặn → 403; tối đa 5 tin / 10 giây; gửi lại cùng clientId không nhân đôi. Sự kiện realtime: <c>chat.message</c>.
/// </summary>
public class DirectChatService(
    AppDbContext db, OnlineRepository repo, IUserService users, IFriendService friends, PresenceTracker presence,
    RealtimeNotifier notifier, TimeProvider clock)
{
    public async Task<List<ConversationDto>> ConversationsAsync(Guid me)
    {
        var heads = await db.DirectMessages.AsNoTracking()
            .Where(m => m.SenderId == me || m.RecipientId == me)
            .GroupBy(m => m.SenderId == me ? m.RecipientId : m.SenderId)
            .Select(g => new { Other = g.Key, LastId = g.Max(m => m.Id), Unread = g.Count(m => m.RecipientId == me && m.ReadAt == null) })
            .OrderByDescending(x => x.LastId).Take(100).ToListAsync();
        var lastIds = heads.Select(h => h.LastId).ToList();
        var last = await db.DirectMessages.AsNoTracking().Where(m => lastIds.Contains(m.Id)).ToDictionaryAsync(m => m.Id);
        var summaries = await users.SummariesAsync(heads.Select(h => h.Other));
        var iBlocked = (await db.UserBlocks.Where(b => b.BlockerId == me).Select(b => b.BlockedId).ToListAsync()).ToHashSet();
        return heads.Where(h => summaries.ContainsKey(h.Other)).Select(h => new ConversationDto(
            h.Other, summaries[h.Other].DisplayName, summaries[h.Other].AvatarColor,
            last[h.LastId].Text, last[h.LastId].SentAt, h.Unread, iBlocked.Contains(h.Other))).ToList();
    }

    /// <summary>Tin nhắn với <paramref name="other"/>: không có <paramref name="afterId"/> → 100 tin gần nhất; đánh dấu đã đọc.</summary>
    public async Task<List<DirectMessageDto>> MessagesAsync(Guid me, Guid other, long? afterId)
    {
        if (!await repo.UserExistsAsync(other)) throw AppException.NotFound("Không tìm thấy người chơi.");
        var q = db.DirectMessages.AsNoTracking()
            .Where(m => (m.SenderId == me && m.RecipientId == other) || (m.SenderId == other && m.RecipientId == me));
        var rows = afterId is { } after
            ? await q.Where(m => m.Id > after).OrderBy(m => m.Id).Take(200).ToListAsync()
            : (await q.OrderByDescending(m => m.Id).Take(100).ToListAsync()).OrderBy(m => m.Id).ToList();
        var now = clock.GetUtcNow().UtcDateTime;
        await db.DirectMessages.Where(m => m.SenderId == other && m.RecipientId == me && m.ReadAt == null)
            .ExecuteUpdateAsync(s => s.SetProperty(m => m.ReadAt, now));
        return rows.Select(ToDto).ToList();
    }

    public async Task<DirectMessageDto> SendAsync(Guid me, Guid other, string text, string? clientId)
    {
        if (other == me) throw AppException.BadRequest("Không thể nhắn cho chính mình.", "SELF");
        if (!await repo.UserExistsAsync(other)) throw AppException.NotFound("Không tìm thấy người chơi.");
        if (await repo.BlockedEitherAsync(me, other)) throw new AppException(403, "BLOCKED", "Không thể nhắn tin với người chơi này.");
        clientId = string.IsNullOrWhiteSpace(clientId) ? null : clientId.Trim();
        if (clientId != null && await db.DirectMessages.AsNoTracking().FirstOrDefaultAsync(m => m.SenderId == me && m.ClientId == clientId) is { } dup)
            return ToDto(dup);

        var isFriend = await db.Friendships.AnyAsync(f => f.Status == FriendStatus.Accepted &&
                                                          ((f.RequesterId == me && f.AddresseeId == other) || (f.RequesterId == other && f.AddresseeId == me)));
        if (!isFriend && !await db.DirectMessages.AnyAsync(m => m.SenderId == other && m.RecipientId == me))
            throw new AppException(403, "NOT_FRIENDS", "Chỉ nhắn tin được với bạn bè.");

        text = Clean(text);
        if (text.Length == 0) throw AppException.BadRequest("Tin nhắn trống.", "EMPTY_MESSAGE");
        if (!presence.TryChat(me, ChatService.RateLimit, ChatService.RateWindow)) throw AppException.TooMany("Bạn gửi tin quá nhanh, chờ vài giây nhé.");

        var msg = new DirectMessage { SenderId = me, RecipientId = other, Text = text, ClientId = clientId, SentAt = clock.GetUtcNow().UtcDateTime };
        db.DirectMessages.Add(msg);
        try
        {
            await db.SaveChangesAsync();
        }
        catch (DbUpdateException ex) when (clientId != null && GameResultService.IsUniqueViolation(ex))
        {
            return ToDto(await db.DirectMessages.AsNoTracking().FirstAsync(m => m.SenderId == me && m.ClientId == clientId));
        }
        var dto = ToDto(msg);
        await notifier.DirectMessageAsync([me, other], dto);
        return dto;
    }

    /// <summary><c>POST /reports</c>: báo cáo người chơi, có thể kèm id tin nhắn riêng (ghi vào lý do để Admin tra cứu).</summary>
    public async Task ReportAsync(Guid me, UserReportRequest req)
    {
        var target = req.UserId!.Value;
        var reason = req.Reason.Trim();
        if (req.MessageId is { } mid)
        {
            var ok = await db.DirectMessages.AnyAsync(m => m.Id == mid && m.SenderId == target && m.RecipientId == me);
            if (!ok) throw AppException.NotFound("Không tìm thấy tin nhắn.");
            reason = $"[Tin nhắn riêng #{mid}] {reason}";
        }
        await friends.ReportAsync(me, target, reason);
    }

    private static string Clean(string s)
    {
        var sb = new StringBuilder(s.Length);
        foreach (var ch in s) if (!char.IsControl(ch) || ch == '\n') sb.Append(ch);
        var t = sb.ToString().Trim();
        return t.Length > 500 ? t[..500] : t;
    }

    private static DirectMessageDto ToDto(DirectMessage m) => new(m.Id, m.SenderId, m.RecipientId, m.Text, m.SentAt);
}
