using System.Text;
using Microsoft.EntityFrameworkCore;
using NguyenDuongNhutKhang_APIGAME.Data;
using NguyenDuongNhutKhang_APIGAME.DTOs;
using NguyenDuongNhutKhang_APIGAME.Helpers;
using NguyenDuongNhutKhang_APIGAME.Interfaces;
using NguyenDuongNhutKhang_APIGAME.Models;

namespace NguyenDuongNhutKhang_APIGAME.Services;

/// <summary>
/// Chat trong phòng đấu: chỉ người trong phòng đọc/gửi; chống gửi trùng bằng clientId;
/// tối đa 5 tin / 10 giây; ẩn tin của người mình đã chặn; đóng chat 10 phút sau khi trận kết thúc.
/// </summary>
public class ChatService(
    AppDbContext db, IFriendService friends, PresenceTracker presence, RealtimeNotifier notifier, TimeProvider clock) : IChatService
{
    public const int RateLimit = 5;
    public static readonly TimeSpan RateWindow = TimeSpan.FromSeconds(10);

    public async Task<List<RoomMessageDto>> HistoryAsync(Guid me, Guid matchId, long after)
    {
        await ParticipantsAsync(me, matchId);
        var blocked = await db.UserBlocks.Where(b => b.BlockerId == me).Select(b => b.BlockedId).ToListAsync();
        return await db.ChatMessages.AsNoTracking()
            .Where(m => m.MatchRoomId == matchId && m.Id > after && !blocked.Contains(m.SenderId))
            .OrderBy(m => m.Id).Take(100)
            .Select(m => new RoomMessageDto(m.Id, m.MatchRoomId, m.SenderId, m.Text, m.ClientId ?? "", m.SentAt))
            .ToListAsync();
    }

    public async Task<RoomMessageDto> SendAsync(Guid me, Guid matchId, string text, string? clientId)
    {
        var (room, participants) = await ParticipantsAsync(me, matchId);
        var now = clock.GetUtcNow().UtcDateTime;
        if (room.Status == MatchStatus.Cancelled || (room.EndedAt != null && room.EndedAt + MatchService.ChatAfterEnd < now))
            throw AppException.Conflict("Phòng đã đóng chat.", "CHAT_CLOSED");

        text = Clean(text);
        if (text.Length == 0) throw AppException.BadRequest("Tin nhắn trống.", "EMPTY_MESSAGE");
        if (text.Length > 300) text = text[..300];
        clientId = string.IsNullOrWhiteSpace(clientId) ? null : clientId.Trim();

        if (clientId != null)
        {
            var dup = await db.ChatMessages.AsNoTracking()
                .FirstOrDefaultAsync(m => m.MatchRoomId == matchId && m.SenderId == me && m.ClientId == clientId);
            if (dup != null) return ToDto(dup);
        }
        if (!presence.TryChat(me, RateLimit, RateWindow)) throw AppException.TooMany("Bạn gửi tin quá nhanh, chờ vài giây nhé.");

        var msg = new ChatMessage { MatchRoomId = matchId, SenderId = me, ClientId = clientId, Text = text, SentAt = now };
        db.ChatMessages.Add(msg);
        await db.SaveChangesAsync();
        var dto = ToDto(msg);

        // Người đã chặn mình không nhận tin realtime (và cũng không thấy trong lịch sử).
        var blockedMe = await db.UserBlocks.Where(b => b.BlockedId == me && participants.Contains(b.BlockerId)).Select(b => b.BlockerId).ToListAsync();
        await notifier.ChatAsync(participants.Except(blockedMe), dto);
        return dto;
    }

    public async Task ReportAsync(Guid me, Guid matchId, MatchReportRequest req)
    {
        var (_, participants) = await ParticipantsAsync(me, matchId);
        Guid target;
        if (req.MessageId is { } mid)
        {
            target = await db.ChatMessages.Where(m => m.Id == mid && m.MatchRoomId == matchId).Select(m => (Guid?)m.SenderId).FirstOrDefaultAsync()
                     ?? throw AppException.NotFound("Không tìm thấy tin nhắn.");
        }
        else
        {
            var others = participants.Where(p => p != me).ToList();
            if (others.Count != 1) throw AppException.BadRequest("Trận nhiều người: hãy chọn tin nhắn cần báo cáo.", "TARGET_REQUIRED");
            target = others[0];
        }
        await friends.ReportAsync(me, target, req.Reason, matchId, req.MessageId);
    }

    private async Task<(MatchRoom Room, List<Guid> Participants)> ParticipantsAsync(Guid me, Guid matchId)
    {
        var room = await db.MatchRooms.AsNoTracking().Include(r => r.Participants).FirstOrDefaultAsync(r => r.Id == matchId);
        if (room == null || room.Participants.All(p => p.UserId != me)) throw AppException.NotFound("Không tìm thấy trận đấu.");
        return (room, room.Participants.Select(p => p.UserId).ToList());
    }

    /// <summary>Bỏ ký tự điều khiển (giữ xuống dòng), gộp khoảng trắng thừa ở hai đầu.</summary>
    private static string Clean(string s)
    {
        var sb = new StringBuilder(s.Length);
        foreach (var ch in s) if (!char.IsControl(ch) || ch == '\n') sb.Append(ch);
        return sb.ToString().Trim();
    }

    private static RoomMessageDto ToDto(ChatMessage m) => new(m.Id, m.MatchRoomId, m.SenderId, m.Text, m.ClientId ?? "", m.SentAt);
}
