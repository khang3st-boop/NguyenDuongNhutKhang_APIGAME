using Microsoft.AspNetCore.SignalR;
using NguyenDuongNhutKhang_APIGAME.DTOs;
using NguyenDuongNhutKhang_APIGAME.Helpers;
using NguyenDuongNhutKhang_APIGAME.Hubs;

namespace NguyenDuongNhutKhang_APIGAME.Services;

/// <summary>Khung sự kiện realtime — cùng dạng <c>{type, data, ts}</c> với khung STOMP của backend Java (thêm <c>matchId</c>).</summary>
public record RealtimeEnvelope(string Type, object? Data, Guid? MatchId, DateTime Ts);

/// <summary>
/// Đẩy sự kiện tới nhóm <c>user:{id}</c> qua một method SignalR duy nhất <see cref="Method"/>.
/// Tên sự kiện dùng đúng từ vựng app Flutter đang đọc từ server Java (<c>invite.received</c>, <c>match.state</c>, ...)
/// để app chỉ đổi lớp vận chuyển (STOMP ↔ SignalR), không đổi logic xử lý sự kiện.
/// Lỗi gửi chỉ ghi log — REST vẫn là nguồn sự thật, app tự đồng bộ lại khi nối lại.
/// </summary>
public class RealtimeNotifier(IHubContext<GameHub> hub, TimeProvider clock, ILogger<RealtimeNotifier> logger)
{
    public const string Method = "event";

    public static string Group(Guid user) => $"user:{user}";

    /// <summary>Trạng thái trận; mặc định <c>match.ended</c> khi đã kết thúc / huỷ, ngược lại <c>match.state</c>.</summary>
    public Task MatchAsync(OnlineMatchDto match, string? type = null) =>
        SendAsync(match.Players.Select(p => p.User.Id),
            type ?? (match.Status is MatchStatus.Finished or MatchStatus.Cancelled ? "match.ended" : "match.state"), match, match.Id);

    /// <summary>Ghép nhanh thành công — dạng giống Java: <c>{matchId, match}</c>.</summary>
    public Task MatchFoundAsync(OnlineMatchDto match) =>
        SendAsync(match.Players.Select(p => p.User.Id), "matchmaking.found", new { matchId = match.Id, match }, match.Id);

    public Task MatchLeftAsync(Guid user, OnlineMatchDto match) => SendAsync([user], "match.left", match, match.Id);

    public Task ConnectionAsync(IEnumerable<Guid> recipients, Guid matchId, Guid user, bool connected) =>
        SendAsync(recipients, "match.connection", new { userId = user, connected }, matchId);

    public Task ChatAsync(IEnumerable<Guid> recipients, RoomMessageDto message) =>
        SendAsync(recipients, "match.chat", message, message.MatchId);

    public Task DirectMessageAsync(IEnumerable<Guid> recipients, DirectMessageDto message) =>
        SendAsync(recipients, "chat.message", message);

    public Task InviteReceivedAsync(InviteDto invite) => SendAsync([invite.To.Id], "invite.received", invite);

    /// <summary>
    /// <c>invite.accepted | invite.declined | invite.cancelled | invite.expired</c> theo trạng thái lời mời.
    /// <c>declined</c> chỉ gửi người mời (app hiển thị "X đã từ chối" theo góc nhìn người mời).
    /// </summary>
    public Task InviteUpdatedAsync(InviteDto invite)
    {
        var type = "invite." + invite.Status.ToLowerInvariant();
        Guid[] to = type == "invite.declined" ? [invite.From.Id] : [invite.From.Id, invite.To.Id];
        return SendAsync(to, type, invite);
    }

    public Task PresenceAsync(IEnumerable<Guid> friends, Guid user, string status) =>
        SendAsync(friends, "presence", new { userId = user, status });

    public Task PresenceSelfAsync(Guid user, string status) => SendAsync([user], "presence.self", new { status });

    /// <summary><c>friend.request | friend.accepted | friend.removed</c> — app chỉ dùng làm tín hiệu tải lại.</summary>
    public Task FriendAsync(IEnumerable<Guid> users, string type) => SendAsync(users, "friend." + type, new { });

    /// <summary>Sảnh thay đổi → client đang kết nối tải lại danh sách (chỉ là tín hiệu, không kèm dữ liệu cá nhân).</summary>
    public async Task LobbyUpdatedAsync()
    {
        try
        {
            await hub.Clients.All.SendAsync(Method, Envelope("lobby.updated", new { }, null));
        }
        catch (Exception ex)
        {
            logger.LogWarning(ex, "Không gửi được sự kiện realtime lobby.updated");
        }
    }

    private RealtimeEnvelope Envelope(string type, object? data, Guid? matchId) =>
        new(type, data, matchId, clock.GetUtcNow().UtcDateTime);

    private async Task SendAsync(IEnumerable<Guid> users, string type, object? payload, Guid? matchId = null)
    {
        var groups = users.Distinct().Select(Group).ToList();
        if (groups.Count == 0) return;
        try
        {
            await hub.Clients.Groups(groups).SendAsync(Method, Envelope(type, payload, matchId));
        }
        catch (Exception ex)
        {
            logger.LogWarning(ex, "Không gửi được sự kiện realtime {Type}", type);
        }
    }
}
