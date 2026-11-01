namespace NguyenDuongNhutKhang_APIGAME.Models;

/// <summary>Quan hệ bạn bè (bảng <c>Friendships</c>): Requester gửi lời mời cho Addressee.</summary>
public class Friendship
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid RequesterId { get; set; }
    public AppUser Requester { get; set; } = null!;
    public Guid AddresseeId { get; set; }
    public AppUser Addressee { get; set; } = null!;
    public string Status { get; set; } = Helpers.FriendStatus.Pending;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? RespondedAt { get; set; }
}

/// <summary>Chặn người chơi (bảng <c>UserBlocks</c>): không mời, không kết bạn, không thấy nhau trong sảnh.</summary>
public class UserBlock
{
    public Guid BlockerId { get; set; }
    public Guid BlockedId { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

/// <summary>Báo cáo vi phạm (bảng <c>UserReports</c>) — Admin xem qua /api/v1/admin/reports.</summary>
public class UserReport
{
    public long Id { get; set; }
    public Guid ReporterId { get; set; }
    public Guid TargetUserId { get; set; }
    public Guid? MatchRoomId { get; set; }
    public long? ChatMessageId { get; set; }
    public string Reason { get; set; } = "";
    public string Status { get; set; } = "OPEN";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

/// <summary>
/// Có mặt trong sảnh thách đấu (bảng <c>PlayerPresences</c>). Chỉ người tự bật "Cho phép mời đấu" mới có dòng này.
/// Khu vực là mã vùng thô do người chơi tự chọn — không lưu GPS.
/// </summary>
public class PlayerPresence
{
    public Guid UserId { get; set; }
    public AppUser User { get; set; } = null!;
    /// <summary>Danh sách game, phân tách dấu phẩy: "rubik,caro".</summary>
    public string Games { get; set; } = "";
    /// <summary>Số người muốn chơi: "2,4".</summary>
    public string Capacities { get; set; } = "2";
    public string? Region { get; set; }
    public bool ShowStats { get; set; } = true;
    public DateTime LastSeenAt { get; set; } = DateTime.UtcNow;
}
