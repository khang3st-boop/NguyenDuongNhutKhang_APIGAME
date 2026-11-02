namespace NguyenDuongNhutKhang_APIGAME.Models;

/// <summary>
/// Thách đấu Rubik bất đồng bộ (bảng <c>DuelChallenges</c>) — tương thích <c>/challenges</c> của app Flutter / server Java:
/// cùng một scramble, mỗi người giải lúc nào cũng được trước hạn; cả hai nộp xong → COMPLETED, nhanh hơn thắng.
/// Không có <c>OpponentId</c> = thách đấu mở, ai cũng nhận được.
/// </summary>
public class DuelChallenge
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid CreatorId { get; set; }
    public AppUser Creator { get; set; } = null!;
    public Guid? OpponentId { get; set; }
    public AppUser? Opponent { get; set; }
    public string Scramble { get; set; } = "";
    public bool AllowAssist { get; set; }
    public string? Message { get; set; }
    public string Status { get; set; } = Helpers.DuelStatus.Open;
    public Guid? WinnerId { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime ExpiresAt { get; set; }

    public string? CreatorClientId { get; set; }
    public long? CreatorDurationMs { get; set; }
    public int? CreatorMoves { get; set; }
    public bool? CreatorAssisted { get; set; }
    public DateTime? CreatorSubmittedAt { get; set; }

    public string? OpponentClientId { get; set; }
    public long? OpponentDurationMs { get; set; }
    public int? OpponentMoves { get; set; }
    public bool? OpponentAssisted { get; set; }
    public DateTime? OpponentSubmittedAt { get; set; }
}

/// <summary>Tin nhắn riêng 1-1 ngoài trận (bảng <c>DirectMessages</c>).</summary>
public class DirectMessage
{
    public long Id { get; set; }
    public Guid SenderId { get; set; }
    public Guid RecipientId { get; set; }
    public string Text { get; set; } = "";
    public string? ClientId { get; set; }
    public DateTime SentAt { get; set; }
    public DateTime? ReadAt { get; set; }
}
