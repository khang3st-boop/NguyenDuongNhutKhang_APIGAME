using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using NguyenDuongNhutKhang_APIGAME.DTOs;
using NguyenDuongNhutKhang_APIGAME.Helpers;
using NguyenDuongNhutKhang_APIGAME.Interfaces;
using NguyenDuongNhutKhang_APIGAME.Services;

namespace NguyenDuongNhutKhang_APIGAME.Hubs;

/// <summary>
/// Hub realtime SignalR tại <c>/hubs/game</c> — chỉ người đã đăng nhập (JWT qua header hoặc <c>?access_token=</c>).
/// Server → client: một phương thức duy nhất <c>event</c> với phong bì <c>{type, data, matchId, ts}</c>, cùng bộ tên sự kiện
/// với server Java (<c>invite.received</c>, <c>match.state</c>, <c>presence</c>, <c>chat.message</c>…) — xem <see cref="RealtimeNotifier"/>.
/// Client → server: <c>Ping()</c>, <c>SendChat(matchId, text, clientId)</c>, <c>Ready(matchId, ready)</c>,
/// <c>Progress(matchId, progress)</c>, <c>Assist(matchId)</c>. Giao thức SignalR JSON, KHÔNG phải STOMP (xem README).
/// </summary>
[Authorize]
public class GameHub(PresenceTracker presence, IChatService chat, IMatchService matches, PresenceService status, ILogger<GameHub> logger) : Hub
{
    private Guid UserId => Guid.Parse(Context.User!.FindFirst("sub")!.Value);

    public override async Task OnConnectedAsync()
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, RealtimeNotifier.Group(UserId));
        if (presence.Connected(UserId)) await NotifyConnectionAsync(true);
        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        if (presence.Disconnected(UserId)) await NotifyConnectionAsync(false);
        await base.OnDisconnectedAsync(exception);
    }

    /// <summary>Giữ trạng thái online và đồng bộ đồng hồ với server.</summary>
    public DateTime Ping()
    {
        presence.Touch(UserId);
        return DateTime.UtcNow;
    }

    public Task<RoomMessageDto> SendChat(Guid matchId, string text, string? clientId) =>
        Guard(() => chat.SendAsync(UserId, matchId, text ?? "", clientId));

    public Task<OnlineMatchDto> Ready(Guid matchId, bool ready) => Guard(() => matches.ReadyAsync(UserId, matchId, ready));

    public Task<bool> Progress(Guid matchId, int progress) => Guard(async () =>
    {
        await matches.ProgressAsync(UserId, matchId, progress);
        return true;
    });

    public Task<OnlineMatchDto> Assist(Guid matchId) => Guard(() => matches.AssistAsync(UserId, matchId));

    private static async Task<T> Guard<T>(Func<Task<T>> action)
    {
        try
        {
            return await action();
        }
        catch (AppException ex)
        {
            // Chỉ trả mã + thông báo đã chuẩn bị sẵn, không lộ chi tiết nội bộ.
            throw new HubException($"{ex.Code}: {ex.Message}");
        }
    }

    private async Task NotifyConnectionAsync(bool connected)
    {
        try
        {
            await status.ConnectionChangedAsync(UserId, connected);
        }
        catch (Exception ex)
        {
            // Không để lỗi phát presence làm hỏng kết nối.
            logger.LogWarning(ex, "Không phát được trạng thái kết nối của {User}", UserId);
        }
    }
}
