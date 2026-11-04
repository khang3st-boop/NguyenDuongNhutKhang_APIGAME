using System.ComponentModel.DataAnnotations;

namespace NguyenDuongNhutKhang_APIGAME.DTOs;

// Hợp đồng tương thích app Flutter (giống backend Java): /challenges, /chat/conversations, /presence/me, /reports.
// Tên trường JSON phải khớp ChallengeDto / ConversationDto / ChatMessageDto trong lib/data/remote/api_models.dart.

// ====================================================================== thách đấu Rubik bất đồng bộ

public record DuelEntryDto(Guid UserId, string DisplayName, long? DurationMs, int? Moves, bool? Assisted, DateTime? SubmittedAt);

public record DuelChallengeDto(
    Guid Id, string Scramble, string Status, bool AllowAssist, DuelEntryDto Creator, DuelEntryDto? Opponent,
    Guid? WinnerId, DateTime CreatedAt, DateTime ExpiresAt, string? Message);

public record CreateDuelRequest
{
    /// <summary>Người được thách; bỏ trống = thách đấu mở cho mọi người.</summary>
    public Guid? OpponentId { get; init; }

    public bool AllowAssist { get; init; }

    [StringLength(100, ErrorMessage = "Lời nhắn tối đa 100 ký tự.")]
    public string? Message { get; init; }
}

public record SubmitDuelRequest
{
    [Required(ErrorMessage = "Thiếu clientId."), StringLength(64)]
    public string ClientId { get; init; } = "";

    [Range(0, 24L * 3600 * 1000, ErrorMessage = "Thời gian không hợp lệ.")]
    public long DurationMs { get; init; }

    [Range(0, 100_000)]
    public int Moves { get; init; }

    /// <summary>Chuỗi nước đi của người chơi; server mô phỏng khối để xác nhận đã giải.</summary>
    [StringLength(8000)]
    public string Solution { get; init; } = "";

    public bool Assisted { get; init; }
}

// ====================================================================== chat 1-1

public record DirectMessageDto(long Id, Guid SenderId, Guid RecipientId, string Text, DateTime SentAt);

public record ConversationDto(Guid UserId, string DisplayName, int AvatarColor, string? LastMessage, DateTime? LastAt, int Unread, bool Blocked);

public record SendDirectMessageRequest
{
    [Required(ErrorMessage = "Tin nhắn trống."), StringLength(500, MinimumLength = 1, ErrorMessage = "Tin nhắn 1–500 ký tự.")]
    public string Text { get; init; } = "";

    [StringLength(64)]
    public string? ClientId { get; init; }
}

public record UserReportRequest
{
    [Required(ErrorMessage = "Thiếu userId.")]
    public Guid? UserId { get; init; }

    [Required(ErrorMessage = "Hãy nhập lý do."), StringLength(250, MinimumLength = 3, ErrorMessage = "Lý do 3–250 ký tự.")]
    public string Reason { get; init; } = "";

    /// <summary>Tin nhắn riêng bị báo cáo (nếu có).</summary>
    public long? MessageId { get; init; }
}

// ====================================================================== trạng thái online

public record PresenceDto(string Status);

public record SetPresenceRequest
{
    public bool Ready { get; init; }
}

/// <summary>Người chơi gần đây: chỉ có nhãn khoảng cách làm tròn, KHÔNG có toạ độ.</summary>
public record NearbyPlayerDto(Guid UserId, string DisplayName, int AvatarColor, string Distance, DateTime LastSeen);

public record NearbyPresenceRequest(double Lat, double Lon);
