using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using NguyenDuongNhutKhang_APIGAME.DTOs;
using NguyenDuongNhutKhang_APIGAME.Helpers;
using NguyenDuongNhutKhang_APIGAME.Interfaces;
using NguyenDuongNhutKhang_APIGAME.Services;

namespace NguyenDuongNhutKhang_APIGAME.Hubs;

/// <summary>
/// Hub realtime SignalR tại <c>/hubs/game</c> — chỉ người đã đăng nhập (JWT qua header hoặc <c>?access_token=</c>).
/// Server → client: <c>matchState</c>, <c>chatMessage</c>, <c>inviteReceived</c>, <c>inviteUpdated</c>.
/// Client → server: <c>Ping()</c>, <c>SendChat(matchId, text, clientId)</c>.
/// Đây là giao thức riêng của backend C#; KHÔNG tương thích STOMP của server Java trên Render (xem README).
/// </summary>
[Authorize]
public class GameHub(PresenceTracker presence, IChatService chat) : Hub
{
    private Guid UserId => Guid.Parse(Context.User!.FindFirst("sub")!.Value);

    public override async Task OnConnectedAsync()
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, RealtimeNotifier.Group(UserId));
        presence.Connected(UserId);
        await base.OnConnectedAsync();
    }

    public override Task OnDisconnectedAsync(Exception? exception)
    {
        presence.Disconnected(UserId);
        return base.OnDisconnectedAsync(exception);
    }

    /// <summary>Giữ trạng thái online và đồng bộ đồng hồ với server.</summary>
    public DateTime Ping()
    {
        presence.Touch(UserId);
        return DateTime.UtcNow;
    }

    public async Task<RoomMessageDto> SendChat(Guid matchId, string text, string? clientId)
    {
        try
        {
            return await chat.SendAsync(UserId, matchId, text ?? "", clientId);
        }
        catch (AppException ex)
        {
            // Chỉ trả mã + thông báo đã chuẩn bị sẵn, không lộ chi tiết nội bộ.
            throw new HubException($"{ex.Code}: {ex.Message}");
        }
    }
}
