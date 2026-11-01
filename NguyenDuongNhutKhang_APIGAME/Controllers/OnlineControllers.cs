using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NguyenDuongNhutKhang_APIGAME.DTOs;
using NguyenDuongNhutKhang_APIGAME.Interfaces;

namespace NguyenDuongNhutKhang_APIGAME.Controllers;

/// <summary>Bạn bè: danh sách kèm trạng thái server tính, lời mời kết bạn.</summary>
[Route("api/v1/friends")]
[Tags("Friends")]
[Authorize]
[ProducesResponseType<ErrorResponse>(StatusCodes.Status401Unauthorized)]
public class FriendsController(IFriendService friends) : ApiControllerBase
{
    /// <summary>Bạn bè của tôi với trạng thái ONLINE | READY | IN_MATCH | OFFLINE.</summary>
    [HttpGet]
    [ProducesResponseType<List<FriendDto>>(StatusCodes.Status200OK)]
    public Task<List<FriendDto>> List() => friends.FriendsAsync(UserId);

    /// <summary>Lời mời kết bạn đến (incoming) và đã gửi (outgoing).</summary>
    [HttpGet("requests")]
    [ProducesResponseType<FriendRequestsResponse>(StatusCodes.Status200OK)]
    public Task<FriendRequestsResponse> Requests() => friends.RequestsAsync(UserId);

    /// <summary>Gửi lời mời kết bạn. Nếu người kia đã mời mình trước → thành bạn ngay (<c>ACCEPTED</c>).</summary>
    [HttpPost("requests")]
    [ProducesResponseType<FriendRequestResult>(StatusCodes.Status200OK)]
    [ProducesResponseType<ErrorResponse>(StatusCodes.Status404NotFound)]
    public Task<FriendRequestResult> Send(FriendRequestBody body) => friends.SendRequestAsync(UserId, body.UserId!.Value);

    /// <summary>Đồng ý lời mời kết bạn của <c>userId</c>.</summary>
    [HttpPost("requests/{userId:guid}/accept")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType<ErrorResponse>(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Accept(Guid userId)
    {
        await friends.RespondAsync(UserId, userId, accept: true);
        return NoContent();
    }

    /// <summary>Từ chối lời mời kết bạn của <c>userId</c>.</summary>
    [HttpPost("requests/{userId:guid}/decline")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> Decline(Guid userId)
    {
        await friends.RespondAsync(UserId, userId, accept: false);
        return NoContent();
    }

    /// <summary>Huỷ kết bạn.</summary>
    [HttpDelete("{userId:guid}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType<ErrorResponse>(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Remove(Guid userId)
    {
        await friends.RemoveAsync(UserId, userId);
        return NoContent();
    }
}

/// <summary>Chặn / bỏ chặn / báo cáo người chơi.</summary>
[Route("api/v1/users")]
[Tags("Friends")]
[Authorize]
public class SafetyController(IFriendService friends) : ApiControllerBase
{
    /// <summary>Chặn: huỷ kết bạn, huỷ lời mời đang chờ; hai bên không thấy / mời nhau được nữa.</summary>
    [HttpPost("{id:guid}/block")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> Block(Guid id)
    {
        await friends.BlockAsync(UserId, id);
        return NoContent();
    }

    [HttpDelete("{id:guid}/block")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> Unblock(Guid id)
    {
        await friends.UnblockAsync(UserId, id);
        return NoContent();
    }

    /// <summary>Báo cáo vi phạm (tối đa 10 báo cáo / giờ). Admin xem tại /api/v1/admin/reports.</summary>
    [HttpPost("{id:guid}/report")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType<ErrorResponse>(StatusCodes.Status429TooManyRequests)]
    public async Task<IActionResult> Report(Guid id, ReportRequest req)
    {
        await friends.ReportAsync(UserId, id, req.Reason);
        return NoContent();
    }
}

/// <summary>Sảnh "Cho phép mời đấu" (tự bật, hết hạn sau 10 phút nếu không làm mới). Khu vực thô, không GPS.</summary>
[Route("api/v1/lobby")]
[Tags("Lobby & Matchmaking")]
[Authorize]
public class LobbyController(ILobbyService lobby) : ApiControllerBase
{
    /// <summary>Trạng thái sảnh của tôi; 204 nếu chưa bật.</summary>
    [HttpGet("me")]
    [ProducesResponseType<LobbyEntryDto>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> Mine() => await lobby.MineAsync(UserId) is { } e ? Ok(e) : NoContent();

    /// <summary>Bật / làm mới trạng thái sẵn sàng nhận lời mời.</summary>
    [HttpPut]
    [ProducesResponseType<LobbyEntryDto>(StatusCodes.Status200OK)]
    public Task<LobbyEntryDto> Join(JoinLobbyRequest req) => lobby.JoinAsync(UserId, req);

    /// <summary>Tắt "Cho phép mời đấu".</summary>
    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> Leave()
    {
        await lobby.LeaveAsync(UserId);
        return NoContent();
    }

    /// <summary>Người chơi đang bật sảnh (trừ tôi và người đã chặn), lọc theo game / khu vực / số người.</summary>
    [HttpGet]
    [ProducesResponseType<List<LobbyPlayerDto>>(StatusCodes.Status200OK)]
    public Task<List<LobbyPlayerDto>> List(
        [FromQuery, RegularExpression("^(rubik|sudoku|puzzle|caro)$")] string? game = null,
        [FromQuery, StringLength(8)] string? region = null,
        [FromQuery, Range(2, 4)] int? capacity = null,
        [FromQuery] bool readyOnly = false) =>
        lobby.ListAsync(UserId, game, region, capacity, readyOnly);
}

/// <summary>Lời mời thách đấu trực tiếp (hết hạn sau 60 giây).</summary>
[Route("api/v1/challenges/invites")]
[Tags("Invites & Rooms")]
[Authorize]
[ProducesResponseType<ErrorResponse>(StatusCodes.Status404NotFound)]
[ProducesResponseType<ErrorResponse>(StatusCodes.Status409Conflict)]
public class InvitesController(IInviteService invites) : ApiControllerBase
{
    /// <summary>Lời mời đang chờ (đến và đi).</summary>
    [HttpGet]
    [ProducesResponseType<List<InviteDto>>(StatusCodes.Status200OK)]
    public Task<List<InviteDto>> Pending() => invites.PendingAsync(UserId);

    /// <summary>Mời một người chơi (trận 2 người) hoặc mời vào phòng chờ của tôi (<c>roomId</c>).</summary>
    [HttpPost]
    [ProducesResponseType<InviteDto>(StatusCodes.Status201Created)]
    public async Task<IActionResult> Create(CreateInviteRequest req) =>
        StatusCode(StatusCodes.Status201Created, await invites.CreateAsync(UserId, req));

    /// <summary>Chấp nhận → server tạo trận (hoặc thêm vào phòng); <c>matchId</c> trong kết quả.</summary>
    [HttpPost("{id:guid}/accept")]
    [ProducesResponseType<InviteDto>(StatusCodes.Status200OK)]
    public Task<InviteDto> Accept(Guid id) => invites.AcceptAsync(UserId, id);

    [HttpPost("{id:guid}/decline")]
    [ProducesResponseType<InviteDto>(StatusCodes.Status200OK)]
    public Task<InviteDto> Decline(Guid id) => invites.DeclineAsync(UserId, id);

    /// <summary>Người mời huỷ lời mời.</summary>
    [HttpPost("{id:guid}/cancel")]
    [ProducesResponseType<InviteDto>(StatusCodes.Status200OK)]
    public Task<InviteDto> Cancel(Guid id) => invites.CancelAsync(UserId, id);
}

/// <summary>Phòng chờ 2 hoặc 4 người, vào bằng mã 6 ký tự.</summary>
[Route("api/v1/rooms")]
[Tags("Invites & Rooms")]
[Authorize]
[ProducesResponseType<ErrorResponse>(StatusCodes.Status409Conflict)]
public class RoomsController(IMatchService matches) : ApiControllerBase
{
    /// <summary>Tạo phòng (tôi là chủ phòng, ghế A). Đề do server sinh.</summary>
    [HttpPost]
    [ProducesResponseType<OnlineMatchDto>(StatusCodes.Status201Created)]
    public async Task<IActionResult> Create(CreateRoomRequest req) =>
        StatusCode(StatusCodes.Status201Created, await matches.CreateRoomAsync(UserId, req));

    /// <summary>Vào phòng bằng mã. Đủ người → bắt đầu đếm 60 giây để mọi người bấm Sẵn sàng.</summary>
    [HttpPost("join")]
    [ProducesResponseType<OnlineMatchDto>(StatusCodes.Status200OK)]
    [ProducesResponseType<ErrorResponse>(StatusCodes.Status404NotFound)]
    public Task<OnlineMatchDto> Join(JoinRoomRequest req) => matches.JoinRoomAsync(UserId, req.Code);
}

/// <summary>Trận đấu online: sẵn sàng, tiến độ, nộp bài (server kiểm tra), Caro, bỏ cuộc, chat.</summary>
[Route("api/v1/matches")]
[Tags("Matches")]
[Authorize]
[ProducesResponseType<ErrorResponse>(StatusCodes.Status404NotFound)]
[ProducesResponseType<ErrorResponse>(StatusCodes.Status409Conflict)]
public class MatchesController(IMatchService matches, IChatService chat) : ApiControllerBase
{
    /// <summary>Trận đang chờ / đang chơi của tôi; 204 nếu không có.</summary>
    [HttpGet("active")]
    [ProducesResponseType<OnlineMatchDto>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> Active() => await matches.ActiveAsync(UserId) is { } m ? Ok(m) : NoContent();

    /// <summary>Lịch sử trận online của tôi.</summary>
    [HttpGet("me")]
    [ProducesResponseType<List<OnlineMatchDto>>(StatusCodes.Status200OK)]
    public Task<List<OnlineMatchDto>> Mine([FromQuery, Range(1, 100)] int limit = 30) => matches.MineAsync(UserId, limit);

    /// <summary>Chi tiết trận (chỉ người trong trận).</summary>
    [HttpGet("{id:guid}")]
    [ProducesResponseType<OnlineMatchDto>(StatusCodes.Status200OK)]
    public Task<OnlineMatchDto> Get(Guid id) => matches.GetAsync(UserId, id);

    /// <summary>Bấm / bỏ Sẵn sàng. Mọi người sẵn sàng → COUNTDOWN 3 giây → PLAYING.</summary>
    [HttpPost("{id:guid}/ready")]
    [ProducesResponseType<OnlineMatchDto>(StatusCodes.Status200OK)]
    public Task<OnlineMatchDto> Ready(Guid id, [FromQuery] bool ready = true) => matches.ReadyAsync(UserId, id, ready);

    /// <summary>Báo tiến độ 0–99% (100% chỉ khi server xác nhận lời giải).</summary>
    [HttpPost("{id:guid}/progress")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> Progress(Guid id, ProgressRequest req)
    {
        await matches.ProgressAsync(UserId, id, req.Progress);
        return NoContent();
    }

    /// <summary>Báo đã dùng trợ giúp → trận online khoá trợ giúp nên bị loại (DISQUALIFIED).</summary>
    [HttpPost("{id:guid}/assist")]
    [ProducesResponseType<OnlineMatchDto>(StatusCodes.Status200OK)]
    public Task<OnlineMatchDto> Assist(Guid id) => matches.AssistAsync(UserId, id);

    /// <summary>Nộp bài. Rubik <c>{solution}</c>, Sudoku <c>{grid}</c>, Xếp hình <c>{drops}</c>. Sai → 400 RESULT_REJECTED.</summary>
    [HttpPost("{id:guid}/finish")]
    [ProducesResponseType<OnlineMatchDto>(StatusCodes.Status200OK)]
    public Task<OnlineMatchDto> Finish(Guid id, FinishMatchRequest req) => matches.FinishAsync(UserId, id, req);

    /// <summary>Đi một nước Caro: <c>cell</c> 0–224, <c>index</c> = số nước đã có. 30 giây mỗi lượt.</summary>
    [HttpPost("{id:guid}/caro/move")]
    [ProducesResponseType<OnlineMatchDto>(StatusCodes.Status200OK)]
    public Task<OnlineMatchDto> CaroMove(Guid id, CaroMoveRequest req) => matches.CaroMoveAsync(UserId, id, req.Cell, req.Index);

    /// <summary>Bỏ cuộc (đang chơi) hoặc rời phòng (đang chờ; chủ phòng rời → huỷ phòng).</summary>
    [HttpPost("{id:guid}/forfeit")]
    [ProducesResponseType<OnlineMatchDto>(StatusCodes.Status200OK)]
    public Task<OnlineMatchDto> Forfeit(Guid id) => matches.ForfeitAsync(UserId, id);

    /// <summary>Tin nhắn trong trận có id &gt; <c>after</c> (tối đa 100).</summary>
    [HttpGet("{id:guid}/messages")]
    [ProducesResponseType<List<RoomMessageDto>>(StatusCodes.Status200OK)]
    public Task<List<RoomMessageDto>> Messages(Guid id, [FromQuery, Range(0, long.MaxValue)] long after = 0) => chat.HistoryAsync(UserId, id, after);

    /// <summary>Gửi tin nhắn (tối đa 5 tin / 10 giây; gửi lại cùng <c>clientId</c> không bị nhân đôi).</summary>
    [HttpPost("{id:guid}/messages")]
    [ProducesResponseType<RoomMessageDto>(StatusCodes.Status200OK)]
    [ProducesResponseType<ErrorResponse>(StatusCodes.Status429TooManyRequests)]
    public Task<RoomMessageDto> Send(Guid id, SendMessageRequest req) => chat.SendAsync(UserId, id, req.Text, req.ClientId);

    /// <summary>Báo cáo tin nhắn / người chơi trong trận.</summary>
    [HttpPost("{id:guid}/report")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> Report(Guid id, MatchReportRequest req)
    {
        await chat.ReportAsync(UserId, id, req);
        return NoContent();
    }
}

/// <summary>Ghép nhanh theo game + chế độ + khu vực thô.</summary>
[Route("api/v1/matchmaking")]
[Tags("Lobby & Matchmaking")]
[Authorize]
public class MatchmakingController(IMatchmakingService mm) : ApiControllerBase
{
    /// <summary>Danh sách khu vực (tâm vùng chỉ để vẽ bản đồ, không phải vị trí người chơi).</summary>
    [HttpGet("regions")]
    [AllowAnonymous]
    [ProducesResponseType<List<RegionDto>>(StatusCodes.Status200OK)]
    public List<RegionDto> Regions() => mm.Regions();

    /// <summary>Vào hàng chờ (vé sống 5 phút). Ghép được → sự kiện <c>matchState</c> / GET /matches/active.</summary>
    [HttpPost("queue")]
    [ProducesResponseType<QueueTicketDto>(StatusCodes.Status200OK)]
    [ProducesResponseType<ErrorResponse>(StatusCodes.Status409Conflict)]
    public Task<QueueTicketDto> Enqueue(EnqueueRequest req) => mm.EnqueueAsync(UserId, req);

    /// <summary>Vé đang chờ của tôi; 204 nếu không có (đã ghép hoặc hết hạn).</summary>
    [HttpGet("queue")]
    [ProducesResponseType<QueueTicketDto>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> Ticket() => await mm.TicketAsync(UserId) is { } t ? Ok(t) : NoContent();

    [HttpDelete("queue")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> Leave()
    {
        await mm.LeaveAsync(UserId);
        return NoContent();
    }
}

/// <summary>Bảng xếp hạng online (chỉ trận ghép / mời 2 người, không dùng trợ giúp).</summary>
[Route("api/v1/leaderboards")]
[Tags("Lobby & Matchmaking")]
public class OnlineLeaderboardController(IMatchService matches) : ApiControllerBase
{
    /// <summary>Điểm online = 1200 ± 16 mỗi trận thắng / thua. Không cần đăng nhập.</summary>
    [HttpGet("online")]
    [AllowAnonymous]
    [ProducesResponseType<List<OnlineRankEntryDto>>(StatusCodes.Status200OK)]
    public Task<List<OnlineRankEntryDto>> Online(
        [FromQuery, Required(ErrorMessage = "Thiếu game."), RegularExpression("^(rubik|sudoku|puzzle|caro)$", ErrorMessage = "Game không hợp lệ.")] string game,
        [FromQuery, Range(1, 100)] int limit = 50) =>
        matches.LeaderboardAsync(game, limit);
}
