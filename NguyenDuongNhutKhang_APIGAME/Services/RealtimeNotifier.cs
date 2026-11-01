using Microsoft.AspNetCore.SignalR;
using NguyenDuongNhutKhang_APIGAME.DTOs;
using NguyenDuongNhutKhang_APIGAME.Hubs;

namespace NguyenDuongNhutKhang_APIGAME.Services;

/// <summary>
/// Đẩy sự kiện SignalR tới nhóm <c>user:{id}</c>. Sự kiện: <c>matchState</c>, <c>chatMessage</c>,
/// <c>inviteReceived</c>, <c>inviteUpdated</c>. Lỗi gửi chỉ ghi log — REST vẫn là nguồn dữ liệu chính.
/// </summary>
public class RealtimeNotifier(IHubContext<GameHub> hub, ILogger<RealtimeNotifier> logger)
{
    public static string Group(Guid user) => $"user:{user}";

    public Task MatchAsync(OnlineMatchDto match) =>
        SendAsync(match.Players.Select(p => p.User.Id), "matchState", match);

    public Task ChatAsync(IEnumerable<Guid> recipients, RoomMessageDto message) =>
        SendAsync(recipients, "chatMessage", message);

    public Task InviteReceivedAsync(InviteDto invite) => SendAsync([invite.To.Id], "inviteReceived", invite);

    public Task InviteUpdatedAsync(InviteDto invite) => SendAsync([invite.From.Id, invite.To.Id], "inviteUpdated", invite);

    private async Task SendAsync(IEnumerable<Guid> users, string method, object payload)
    {
        try
        {
            await hub.Clients.Groups(users.Distinct().Select(Group).ToList()).SendAsync(method, payload);
        }
        catch (Exception ex)
        {
            logger.LogWarning(ex, "Không gửi được sự kiện realtime {Method}", method);
        }
    }
}
