using System.ComponentModel.DataAnnotations;

namespace NguyenDuongNhutKhang_APIGAME.Models;

/// <summary>Lời mời thách đấu (bảng <c>Challenges</c>). Hết hạn sau ~60 giây nếu không trả lời.</summary>
public class Challenge
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid FromUserId { get; set; }
    public AppUser FromUser { get; set; } = null!;
    public Guid ToUserId { get; set; }
    public AppUser ToUser { get; set; } = null!;
    public string Game { get; set; } = "";
    public string Mode { get; set; } = "";
    public int Capacity { get; set; } = 2;
    /// <summary>Phòng chờ đã có của người mời (mời thêm người vào phòng).</summary>
    public Guid? MatchRoomId { get; set; }
    public string Status { get; set; } = Helpers.InviteStatus.Pending;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime ExpiresAt { get; set; }
    public DateTime? RespondedAt { get; set; }
}

/// <summary>Phòng đấu 2 hoặc 4 người (bảng <c>MatchRooms</c>). Server là nguồn trạng thái chính.</summary>
public class MatchRoom
{
    public Guid Id { get; set; } = Guid.NewGuid();
    /// <summary>Mã phòng 6 ký tự để bạn bè nhập vào.</summary>
    public string Code { get; set; } = "";
    public string Game { get; set; } = "";
    public string Mode { get; set; } = "";
    public int Capacity { get; set; } = 2;
    public string Source { get; set; } = Helpers.MatchSource.Room;
    public string Status { get; set; } = Helpers.MatchStatus.Waiting;
    public Guid HostId { get; set; }

    /// <summary>Cấu hình ván do server sinh (scramble Rubik, seed Sudoku/Xếp hình) — JSON.</summary>
    public string ConfigJson { get; set; } = "{}";

    /// <summary>Trận online luôn khoá trợ giúp (gợi ý / tự giải).</summary>
    public bool AssistLocked { get; set; } = true;

    /// <summary>Caro: các ô đã đánh theo thứ tự (JSON mảng số). Nước chẵn là X (ghế 0).</summary>
    public string CaroMovesJson { get; set; } = "[]";
    public DateTime? TurnDeadline { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? ReadyDeadline { get; set; }
    public DateTime? StartedAt { get; set; }
    public DateTime? EndedAt { get; set; }
    public Guid? WinnerId { get; set; }
    public string? EndReason { get; set; }

    /// <summary>Khoá lạc quan: hai yêu cầu cùng sửa phòng → một yêu cầu nhận 409.</summary>
    [Timestamp]
    public byte[] RowVersion { get; set; } = [];

    public List<MatchParticipant> Participants { get; set; } = [];
}

/// <summary>Người chơi trong phòng (bảng <c>MatchParticipants</c>).</summary>
public class MatchParticipant
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid MatchRoomId { get; set; }
    public MatchRoom MatchRoom { get; set; } = null!;
    public Guid UserId { get; set; }
    public AppUser User { get; set; } = null!;
    public int Seat { get; set; }
    public bool Ready { get; set; }
    public int Progress { get; set; }
    public bool Assisted { get; set; }
    public bool Forfeited { get; set; }
    /// <summary>Thời gian hoàn thành do server đo (từ StartedAt tới lúc nhận /finish).</summary>
    public long? FinishTimeMs { get; set; }
    public int? Moves { get; set; }
    /// <summary>Kết quả kiểm tra lời giải của server (null = game không kiểm tra được).</summary>
    public bool? Verified { get; set; }
    public DateTime JoinedAt { get; set; } = DateTime.UtcNow;
    public DateTime? FinishedAt { get; set; }
}

/// <summary>Kết quả cuối của từng người trong trận (bảng <c>MatchResults</c>), xếp hạng do server.</summary>
public class MatchResult
{
    public long Id { get; set; }
    public Guid MatchRoomId { get; set; }
    public MatchRoom MatchRoom { get; set; } = null!;
    public Guid UserId { get; set; }
    public AppUser User { get; set; } = null!;
    public int Rank { get; set; }
    public string Outcome { get; set; } = "";
    public long? TimeMs { get; set; }
    /// <summary>false nếu dùng trợ giúp / không qua kiểm tra → không tính xếp hạng.</summary>
    public bool Valid { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

/// <summary>Tin nhắn trong phòng đấu (bảng <c>ChatMessages</c>). Chỉ người trong phòng đọc/gửi được.</summary>
public class ChatMessage
{
    public long Id { get; set; }
    public Guid MatchRoomId { get; set; }
    public MatchRoom MatchRoom { get; set; } = null!;
    public Guid SenderId { get; set; }
    public AppUser Sender { get; set; } = null!;
    /// <summary>Id do client sinh — gửi lại khi mất mạng không bị nhân đôi.</summary>
    public string? ClientId { get; set; }
    public string Text { get; set; } = "";
    public DateTime SentAt { get; set; } = DateTime.UtcNow;
}

/// <summary>Vé chờ ghép nhanh (bảng <c>MatchmakingTickets</c>).</summary>
public class MatchmakingTicket
{
    public Guid UserId { get; set; }
    public string Game { get; set; } = "";
    public string Mode { get; set; } = "";
    public string Region { get; set; } = "";
    /// <summary>Cho phép ghép với khu vực khác.</summary>
    public bool Widen { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime ExpiresAt { get; set; }
    public Guid? MatchRoomId { get; set; }
}
