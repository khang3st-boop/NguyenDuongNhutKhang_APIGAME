using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NguyenDuongNhutKhang_APIGAME.DTOs;
using NguyenDuongNhutKhang_APIGAME.Services;

namespace NguyenDuongNhutKhang_APIGAME.Controllers;

// Các endpoint app Flutter đang gọi trên server Java mà backend C# chưa có — cùng đường dẫn và dạng JSON.

/// <summary>Thách đấu Rubik bất đồng bộ: cùng scramble, mỗi người giải trước hạn 24 giờ, nhanh hơn thắng.</summary>
[Route("api/v1/challenges")]
[Tags("Rubik Duels")]
[Authorize]
public class DuelsController(DuelService duels) : ApiControllerBase
{
    /// <summary>Thách đấu tôi tạo hoặc được mời (50 gần nhất).</summary>
    [HttpGet]
    public async Task<ActionResult<List<DuelChallengeDto>>> Mine() => await duels.MineAsync(UserId);

    /// <summary>Thách đấu mở của người khác, ai cũng nhận được.</summary>
    [HttpGet("open")]
    public async Task<ActionResult<List<DuelChallengeDto>>> Open() => await duels.OpenAsync(UserId);

    [HttpPost]
    [ProducesResponseType<DuelChallengeDto>(StatusCodes.Status201Created)]
    public async Task<IActionResult> Create(CreateDuelRequest req) =>
        StatusCode(StatusCodes.Status201Created, await duels.CreateAsync(UserId, req));

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<DuelChallengeDto>> Get(Guid id) => await duels.GetAsync(UserId, id);

    [HttpPost("{id:guid}/accept")]
    public async Task<ActionResult<DuelChallengeDto>> Accept(Guid id) => await duels.AcceptAsync(UserId, id);

    [HttpPost("{id:guid}/decline")]
    public async Task<ActionResult<DuelChallengeDto>> Decline(Guid id) => await duels.DeclineAsync(UserId, id);

    /// <summary>Nộp lời giải; server mô phỏng khối Rubik để xác nhận, gửi lại cùng lượt không nhân đôi.</summary>
    [HttpPost("{id:guid}/submit")]
    public async Task<ActionResult<DuelChallengeDto>> Submit(Guid id, SubmitDuelRequest req) => await duels.SubmitAsync(UserId, id, req);
}

/// <summary>Chat 1-1 ngoài trận (bạn bè). Tin mới đẩy realtime qua sự kiện <c>chat.message</c>.</summary>
[Route("api/v1/chat/conversations")]
[Tags("Direct Chat")]
[Authorize]
public class ConversationsController(DirectChatService chat) : ApiControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<ConversationDto>>> List() => await chat.ConversationsAsync(UserId);

    [HttpGet("{userId:guid}/messages")]
    public async Task<ActionResult<List<DirectMessageDto>>> Messages(Guid userId, [FromQuery] long? afterId) =>
        await chat.MessagesAsync(UserId, userId, afterId);

    [HttpPost("{userId:guid}/messages")]
    public async Task<ActionResult<DirectMessageDto>> Send(Guid userId, SendDirectMessageRequest req) =>
        await chat.SendAsync(UserId, userId, req.Text, req.ClientId);
}

[Route("api/v1/presence")]
[Tags("Friends")]
[Authorize]
public class PresenceController(PresenceService presence) : ApiControllerBase
{
    /// <summary>Trạng thái của tôi do server tính: IN_MATCH &gt; READY &gt; ONLINE &gt; OFFLINE.</summary>
    [HttpGet("me")]
    public async Task<ActionResult<PresenceDto>> Mine() => await presence.MineAsync(UserId);

    /// <summary>Bật / tắt "Sẵn sàng nhận thách đấu" (xuất hiện trong sảnh, tự hết hạn sau 10 phút).</summary>
    [HttpPut("me")]
    public async Task<ActionResult<PresenceDto>> Set(SetPresenceRequest req) => await presence.SetReadyAsync(UserId, req.Ready);
}

[Route("api/v1/reports")]
[Tags("Friends")]
[Authorize]
public class ReportsController(DirectChatService chat) : ApiControllerBase
{
    /// <summary>Báo cáo người chơi (có thể kèm id tin nhắn riêng).</summary>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> Report(UserReportRequest req)
    {
        await chat.ReportAsync(UserId, req);
        return NoContent();
    }
}
