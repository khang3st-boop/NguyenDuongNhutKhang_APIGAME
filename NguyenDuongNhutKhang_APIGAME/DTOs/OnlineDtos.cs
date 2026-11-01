using System.ComponentModel.DataAnnotations;

namespace NguyenDuongNhutKhang_APIGAME.DTOs;

// ====================================================================== bạn bè / chặn / báo cáo

/// <summary>Bạn bè và trạng thái do server tính: ONLINE | READY | IN_MATCH | OFFLINE.</summary>
public record FriendDto(UserSummaryDto User, string Status, DateTime? Since);

public record FriendRequestDto(UserSummaryDto User, DateTime CreatedAt);

public record FriendRequestsResponse(List<FriendRequestDto> Incoming, List<FriendRequestDto> Outgoing);

public record FriendRequestBody
{
    [Required(ErrorMessage = "Thiếu userId.")]
    public Guid? UserId { get; init; }
}

/// <summary><c>PENDING</c> hoặc <c>ACCEPTED</c> (nếu người kia đã mời mình trước).</summary>
public record FriendRequestResult(string Status);

public record ReportRequest
{
    [Required(ErrorMessage = "Hãy nhập lý do."), StringLength(300, MinimumLength = 3, ErrorMessage = "Lý do 3–300 ký tự.")]
    public string Reason { get; init; } = "";
}

public record MatchReportRequest
{
    /// <summary>Tin nhắn bị báo cáo (nếu có). Không có → báo cáo người còn lại trong trận 2 người.</summary>
    public long? MessageId { get; init; }

    [Required(ErrorMessage = "Hãy nhập lý do."), StringLength(300, MinimumLength = 3, ErrorMessage = "Lý do 3–300 ký tự.")]
    public string Reason { get; init; } = "";
}

// ====================================================================== sảnh thách đấu

public record RegionRef(string Code, string Name);

public record LobbyEntryDto(List<string> Games, List<int> Capacities, RegionRef? Region, bool ShowStats, DateTime ExpiresAt);

public record LobbyStatsDto(string Game, int Rating, int Played, int Wins);

public record LobbyPlayerDto(UserSummaryDto User, List<string> Games, List<int> Capacities, string Status, RegionRef? Region, List<LobbyStatsDto> Stats, bool Friend);

public record JoinLobbyRequest
{
    [Required, MinLength(1, ErrorMessage = "Chọn ít nhất một game."), MaxLength(4)]
    public List<string> Games { get; init; } = [];

    [Required, MinLength(1, ErrorMessage = "Chọn số người chơi."), MaxLength(2)]
    public List<int> Capacities { get; init; } = [];

    /// <summary>Mã vùng thô tự chọn (VN-N, VN-C, VN-S, ASIA, OTHER). null = không chia sẻ khu vực. Không dùng GPS.</summary>
    [StringLength(8)]
    public string? Region { get; init; }

    public bool ShowStats { get; init; }
}

// ====================================================================== lời mời / phòng

public record InviteDto(
    Guid Id, UserSummaryDto From, UserSummaryDto To, string Game, string Mode, string Status,
    DateTime CreatedAt, DateTime ExpiresAt, Guid? MatchId, int Capacity, Guid? RoomId);

public record CreateInviteRequest
{
    [Required(ErrorMessage = "Thiếu userId.")]
    public Guid? UserId { get; init; }

    [Required, RegularExpression("^(rubik|sudoku|puzzle|caro)$", ErrorMessage = "Game không hợp lệ.")]
    public string Game { get; init; } = "";

    [Required, StringLength(16)]
    public string Mode { get; init; } = "";

    /// <summary>Mời vào phòng chờ của tôi (game/chế độ lấy theo phòng).</summary>
    public Guid? RoomId { get; init; }
}

public record CreateRoomRequest
{
    [Required, RegularExpression("^(rubik|sudoku|puzzle|caro)$", ErrorMessage = "Game không hợp lệ.")]
    public string Game { get; init; } = "";

    [Required, StringLength(16)]
    public string Mode { get; init; } = "";

    /// <summary>2 hoặc 4 người (Caro chỉ 2).</summary>
    [Range(2, 4)]
    public int Capacity { get; init; } = 2;
}

public record JoinRoomRequest
{
    [Required(ErrorMessage = "Hãy nhập mã phòng."), RegularExpression("^[A-Za-z0-9]{4,12}$", ErrorMessage = "Mã phòng không hợp lệ.")]
    public string Code { get; init; } = "";
}

// ====================================================================== trận đấu

/// <summary>Người chơi trong trận. <c>slot</c> = A/B/C/D theo ghế; <c>out</c> = bỏ cuộc / bị loại.</summary>
public record MatchPlayerDto(UserSummaryDto User, string Slot, bool Ready, int Progress, bool Assisted, long? TimeMs, bool Connected, int? Rank, bool Out);

/// <summary>Bản chụp trận đấu — mọi trường do server quyết định.</summary>
public record OnlineMatchDto(
    Guid Id, string Game, string Mode, string Source, string Status, Dictionary<string, object?> Config,
    List<MatchPlayerDto> Players, DateTime? ReadyDeadline, DateTime? StartAt, DateTime? FinishedAt,
    Guid? WinnerId, string? EndReason, bool Rated, List<int> CaroMoves, DateTime? TurnDeadline,
    DateTime ServerTime, int Capacity, string? RoomCode, Guid? ParentId, string? Stage, List<object> Bracket, bool AssistLocked);

public record ProgressRequest
{
    [Range(0, 100)]
    public int Progress { get; init; }
}

public record PuzzleDrop
{
    [Range(0, 35)]
    public int Piece { get; init; }

    [Range(0, 86_400_000)]
    public long AtMs { get; init; }

    public bool Hint { get; init; }
}

/// <summary>Nộp bài: Rubik <c>solution</c>, Sudoku <c>grid</c>, Xếp hình <c>drops</c>. Server tự kiểm tra và đo thời gian.</summary>
public record FinishMatchRequest
{
    [StringLength(8000)]
    public string? Solution { get; init; }

    [StringLength(81, MinimumLength = 81, ErrorMessage = "grid gồm đúng 81 chữ số.")]
    public string? Grid { get; init; }

    [MaxLength(36)]
    public List<PuzzleDrop>? Drops { get; init; }

    [Range(0, 10_000)]
    public int WrongDrops { get; init; }

    public bool Assisted { get; init; }
}

public record CaroMoveRequest
{
    [Range(0, 224, ErrorMessage = "Ô không hợp lệ.")]
    public int Cell { get; init; }

    /// <summary>Số thứ tự nước đi mong đợi (= số nước đã có) — chống gửi trùng / lệch lượt.</summary>
    [Range(0, 225)]
    public int Index { get; init; }
}

// ====================================================================== chat

public record RoomMessageDto(long Id, Guid MatchId, Guid SenderId, string Text, string ClientId, DateTime SentAt);

public record SendMessageRequest
{
    [Required(ErrorMessage = "Tin nhắn trống."), StringLength(300, MinimumLength = 1, ErrorMessage = "Tin nhắn 1–300 ký tự.")]
    public string Text { get; init; } = "";

    [StringLength(64)]
    public string? ClientId { get; init; }
}

// ====================================================================== ghép trận / xếp hạng online

public record RegionDto(string Code, string Name, double Lat, double Lon, string[] Neighbours);

public record EnqueueRequest
{
    [Required, RegularExpression("^(rubik|sudoku|puzzle|caro)$", ErrorMessage = "Game không hợp lệ.")]
    public string Game { get; init; } = "";

    [Required, StringLength(16)]
    public string Mode { get; init; } = "";

    [Required(ErrorMessage = "Chọn khu vực."), StringLength(8)]
    public string Region { get; init; } = "";

    /// <summary>Cho phép ghép với khu vực lân cận / bất kỳ khi chờ lâu.</summary>
    public bool Widen { get; init; }
}

public record QueueTicketDto(string Game, string Mode, string Region, bool Widen, int Rating, DateTime QueuedAt, DateTime ExpiresAt, int WaitingInRegion);

public record OnlineRankEntryDto(int Rank, UserSummaryDto User, int Rating, int Played, int Wins);
