using Microsoft.AspNetCore.Identity;

namespace NguyenDuongNhutKhang_APIGAME.Models;

/// <summary>Tài khoản đăng nhập (bảng <c>Users</c>, do ASP.NET Core Identity quản lý; mật khẩu chỉ lưu dạng băm).</summary>
public class AppUser : IdentityUser<Guid>
{
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    /// <summary>Tăng lên khi đổi mật khẩu / đăng xuất mọi thiết bị → mọi access token cũ mất hiệu lực.</summary>
    public int TokenVersion { get; set; }

    public UserProfile? Profile { get; set; }
}

/// <summary>Vai trò (bảng <c>Roles</c>): User hoặc Admin.</summary>
public class AppRole : IdentityRole<Guid>
{
    public AppRole() { }
    public AppRole(string name) : base(name) { }
}

/// <summary>Hồ sơ công khai của người chơi (bảng <c>UserProfiles</c>, quan hệ 1-1 với Users).</summary>
public class UserProfile
{
    public Guid UserId { get; set; }
    public AppUser User { get; set; } = null!;

    public string DisplayName { get; set; } = "";

    /// <summary>Chỉ số màu avatar 0..7 (giống app Flutter).</summary>
    public int AvatarColor { get; set; }

    public string? Bio { get; set; }

    /// <summary>Cho người khác xem thống kê trong sảnh thách đấu.</summary>
    public bool ShowStats { get; set; } = true;

    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

/// <summary>Refresh token (chỉ lưu SHA-256, không lưu token gốc). Mỗi lần làm mới được xoay vòng.</summary>
public class RefreshToken
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public AppUser User { get; set; } = null!;

    public string TokenHash { get; set; } = "";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime ExpiresAt { get; set; }
    public DateTime? RevokedAt { get; set; }

    /// <summary>Token mới thay thế. Dùng lại token đã bị thay → nghi bị lộ, thu hồi mọi phiên.</summary>
    public Guid? ReplacedById { get; set; }

    public bool IsActive(DateTime now) => RevokedAt == null && ExpiresAt > now;
}
