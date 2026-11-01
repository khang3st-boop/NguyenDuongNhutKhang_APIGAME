using NguyenDuongNhutKhang_APIGAME.DTOs;

namespace NguyenDuongNhutKhang_APIGAME.Interfaces;

public interface IFriendService
{
    Task<List<FriendDto>> FriendsAsync(Guid me);
    Task<FriendRequestsResponse> RequestsAsync(Guid me);
    Task<FriendRequestResult> SendRequestAsync(Guid me, Guid target);
    Task RespondAsync(Guid me, Guid requester, bool accept);
    Task RemoveAsync(Guid me, Guid other);
    Task BlockAsync(Guid me, Guid target);
    Task UnblockAsync(Guid me, Guid target);
    Task ReportAsync(Guid me, Guid target, string reason, Guid? matchId = null, long? messageId = null);
}

public interface ILobbyService
{
    Task<LobbyEntryDto?> MineAsync(Guid me);
    Task<LobbyEntryDto> JoinAsync(Guid me, JoinLobbyRequest req);
    Task LeaveAsync(Guid me);
    Task<List<LobbyPlayerDto>> ListAsync(Guid me, string? game, string? region, int? capacity, bool readyOnly);
}

public interface IInviteService
{
    Task<List<InviteDto>> PendingAsync(Guid me);
    Task<InviteDto> CreateAsync(Guid me, CreateInviteRequest req);
    Task<InviteDto> AcceptAsync(Guid me, Guid id);
    Task<InviteDto> DeclineAsync(Guid me, Guid id);
    Task<InviteDto> CancelAsync(Guid me, Guid id);
}

public interface IMatchService
{
    Task<OnlineMatchDto> CreateRoomAsync(Guid me, CreateRoomRequest req);
    Task<OnlineMatchDto> JoinRoomAsync(Guid me, string code);
    Task<OnlineMatchDto?> ActiveAsync(Guid me);
    Task<OnlineMatchDto> GetAsync(Guid me, Guid id);
    Task<List<OnlineMatchDto>> MineAsync(Guid me, int limit);
    Task<OnlineMatchDto> ReadyAsync(Guid me, Guid id, bool ready);
    Task ProgressAsync(Guid me, Guid id, int progress);
    Task<OnlineMatchDto> AssistAsync(Guid me, Guid id);
    Task<OnlineMatchDto> FinishAsync(Guid me, Guid id, FinishMatchRequest req);
    Task<OnlineMatchDto> CaroMoveAsync(Guid me, Guid id, int cell, int index);
    Task<OnlineMatchDto> ForfeitAsync(Guid me, Guid id);
    Task<List<OnlineRankEntryDto>> LeaderboardAsync(string game, int limit);
}

public interface IChatService
{
    Task<List<RoomMessageDto>> HistoryAsync(Guid me, Guid matchId, long after);
    Task<RoomMessageDto> SendAsync(Guid me, Guid matchId, string text, string? clientId);
    Task ReportAsync(Guid me, Guid matchId, MatchReportRequest req);
}

public interface IMatchmakingService
{
    List<RegionDto> Regions();
    Task<QueueTicketDto> EnqueueAsync(Guid me, EnqueueRequest req);
    Task<QueueTicketDto?> TicketAsync(Guid me);
    Task LeaveAsync(Guid me);
    /// <summary>Ghép các vé đang chờ (gọi khi có vé mới và định kỳ từ dịch vụ nền).</summary>
    Task PairAsync();
}
