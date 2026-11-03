using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using NguyenDuongNhutKhang_APIGAME.Models;

namespace NguyenDuongNhutKhang_APIGAME.Data;

/// <summary>
/// DbContext chính: bảng Identity (đổi tên thành Users, Roles, ...) + dữ liệu game, bạn bè, phòng đấu, chat.
/// </summary>
public class AppDbContext : IdentityDbContext<AppUser, AppRole, Guid>
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    protected AppDbContext(DbContextOptions options) : base(options) { }

    public DbSet<UserProfile> UserProfiles => Set<UserProfile>();
    public DbSet<RefreshToken> RefreshTokens => Set<RefreshToken>();
    public DbSet<GameSession> GameSessions => Set<GameSession>();
    public DbSet<GameResult> GameResults => Set<GameResult>();
    public DbSet<GameStatistic> GameStatistics => Set<GameStatistic>();
    public DbSet<DailyChallenge> DailyChallenges => Set<DailyChallenge>();
    public DbSet<LeaderboardEntry> Leaderboards => Set<LeaderboardEntry>();
    public DbSet<SyncRecord> SyncRecords => Set<SyncRecord>();
    public DbSet<RubikChallengeCode> RubikChallengeCodes => Set<RubikChallengeCode>();
    public DbSet<Friendship> Friendships => Set<Friendship>();
    public DbSet<UserBlock> UserBlocks => Set<UserBlock>();
    public DbSet<UserReport> UserReports => Set<UserReport>();
    public DbSet<PlayerPresence> PlayerPresences => Set<PlayerPresence>();
    public DbSet<Challenge> Challenges => Set<Challenge>();
    public DbSet<MatchRoom> MatchRooms => Set<MatchRoom>();
    public DbSet<MatchParticipant> MatchParticipants => Set<MatchParticipant>();
    public DbSet<MatchResult> MatchResults => Set<MatchResult>();
    public DbSet<ChatMessage> ChatMessages => Set<ChatMessage>();
    public DbSet<MatchmakingTicket> MatchmakingTickets => Set<MatchmakingTicket>();
    public DbSet<DuelChallenge> DuelChallenges => Set<DuelChallenge>();
    public DbSet<DirectMessage> DirectMessages => Set<DirectMessage>();

    protected override void ConfigureConventions(ModelConfigurationBuilder b)
    {
        // Mọi DateTime lưu/đọc dưới dạng UTC để JSON trả về luôn có hậu tố "Z".
        b.Properties<DateTime>().HaveConversion<UtcDateTimeConverter>();
        b.Properties<DateTime?>().HaveConversion<NullableUtcDateTimeConverter>();
        b.Properties<string>().HaveMaxLength(256);
    }

    protected override void OnModelCreating(ModelBuilder b)
    {
        base.OnModelCreating(b);

        // ---- Identity: tên bảng ngắn gọn ----
        b.Entity<AppUser>(e =>
        {
            e.ToTable("Users");
            e.HasOne(u => u.Profile).WithOne(p => p.User).HasForeignKey<UserProfile>(p => p.UserId).OnDelete(DeleteBehavior.Cascade);
            e.Property(u => u.PasswordHash).HasMaxLength(1024);
            e.Property(u => u.SecurityStamp).HasMaxLength(1024);
            e.Property(u => u.ConcurrencyStamp).HasMaxLength(1024);
        });
        b.Entity<AppRole>().ToTable("Roles");
        b.Entity<IdentityUserRole<Guid>>().ToTable("UserRoles");
        b.Entity<IdentityUserClaim<Guid>>().ToTable("UserClaims");
        b.Entity<IdentityUserLogin<Guid>>().ToTable("UserLogins");
        b.Entity<IdentityRoleClaim<Guid>>().ToTable("RoleClaims");
        b.Entity<IdentityUserToken<Guid>>().ToTable("UserTokens");

        b.Entity<UserProfile>(e =>
        {
            e.HasKey(p => p.UserId);
            e.Property(p => p.DisplayName).HasMaxLength(30);
            e.Property(p => p.Bio).HasMaxLength(200);
            e.HasIndex(p => p.DisplayName);
        });

        b.Entity<RefreshToken>(e =>
        {
            e.Property(t => t.TokenHash).HasMaxLength(64);
            e.HasIndex(t => t.TokenHash).IsUnique();
            e.HasIndex(t => new { t.UserId, t.ExpiresAt });
            e.HasOne(t => t.User).WithMany().HasForeignKey(t => t.UserId).OnDelete(DeleteBehavior.Cascade);
        });

        // ---- Dữ liệu game ----
        b.Entity<GameSession>(e =>
        {
            e.Property(s => s.Game).HasMaxLength(16);
            e.Property(s => s.Mode).HasMaxLength(32);
            e.Property(s => s.Status).HasMaxLength(16);
            e.Property(s => s.DailyDate).HasMaxLength(10);
            e.Property(s => s.StateJson).HasMaxLength(16_000);
            e.HasIndex(s => new { s.UserId, s.Game, s.Status });
            e.HasOne(s => s.User).WithMany().HasForeignKey(s => s.UserId).OnDelete(DeleteBehavior.Cascade);
        });

        b.Entity<GameResult>(e =>
        {
            e.Property(r => r.ClientId).HasMaxLength(64);
            e.Property(r => r.Game).HasMaxLength(16);
            e.Property(r => r.Mode).HasMaxLength(32);
            e.Property(r => r.Outcome).HasMaxLength(8);
            e.Property(r => r.DailyDate).HasMaxLength(10);
            e.Property(r => r.ChallengeCode).HasMaxLength(12);
            e.Property(r => r.DetailsJson).HasMaxLength(4000);
            // Chống trùng khi đồng bộ offline: mỗi người, mỗi clientId chỉ một kết quả.
            e.HasIndex(r => new { r.UserId, r.ClientId }).IsUnique();
            e.HasIndex(r => new { r.UserId, r.Game, r.PlayedAt });
            e.HasIndex(r => new { r.Game, r.DailyDate, r.Rankable });
            e.HasIndex(r => r.ChallengeCode);
            e.HasOne(r => r.User).WithMany().HasForeignKey(r => r.UserId).OnDelete(DeleteBehavior.Cascade);
        });

        b.Entity<GameStatistic>(e =>
        {
            e.HasKey(s => new { s.UserId, s.Game });
            e.Property(s => s.Game).HasMaxLength(16);
            e.HasOne(s => s.User).WithMany().HasForeignKey(s => s.UserId).OnDelete(DeleteBehavior.Cascade);
        });

        b.Entity<DailyChallenge>(e =>
        {
            e.Property(d => d.Date).HasMaxLength(10);
            e.Property(d => d.Game).HasMaxLength(16);
            e.Property(d => d.Mode).HasMaxLength(32);
            e.HasIndex(d => new { d.Date, d.Game }).IsUnique();
        });

        b.Entity<LeaderboardEntry>(e =>
        {
            e.ToTable("Leaderboards");
            e.Property(l => l.Board).HasMaxLength(24);
            e.Property(l => l.Game).HasMaxLength(16);
            e.HasIndex(l => new { l.Board, l.Game, l.UserId }).IsUnique();
            e.HasIndex(l => new { l.Board, l.Game, l.BestScore });
            e.HasOne(l => l.User).WithMany().HasForeignKey(l => l.UserId).OnDelete(DeleteBehavior.Cascade);
        });

        b.Entity<SyncRecord>(e =>
        {
            e.Property(s => s.DeviceId).HasMaxLength(64);
            e.HasIndex(s => new { s.UserId, s.SyncedAt });
            e.HasOne(s => s.User).WithMany().HasForeignKey(s => s.UserId).OnDelete(DeleteBehavior.Cascade);
        });

        b.Entity<RubikChallengeCode>(e =>
        {
            e.HasKey(c => c.Code);
            e.Property(c => c.Code).HasMaxLength(12);
            e.Property(c => c.Scramble).HasMaxLength(200);
            e.Property(c => c.Note).HasMaxLength(100);
            e.HasIndex(c => c.CreatorId);
            e.HasOne(c => c.Creator).WithMany().HasForeignKey(c => c.CreatorId).OnDelete(DeleteBehavior.Cascade);
        });

        // ---- Bạn bè / chặn / báo cáo / sảnh ----
        b.Entity<Friendship>(e =>
        {
            e.Property(f => f.Status).HasMaxLength(16);
            e.HasIndex(f => new { f.RequesterId, f.AddresseeId }).IsUnique();
            e.HasIndex(f => new { f.AddresseeId, f.Status });
            e.HasOne(f => f.Requester).WithMany().HasForeignKey(f => f.RequesterId).OnDelete(DeleteBehavior.Cascade);
            e.HasOne(f => f.Addressee).WithMany().HasForeignKey(f => f.AddresseeId).OnDelete(DeleteBehavior.NoAction);
        });

        b.Entity<UserBlock>(e =>
        {
            e.HasKey(x => new { x.BlockerId, x.BlockedId });
            e.HasOne<AppUser>().WithMany().HasForeignKey(x => x.BlockerId).OnDelete(DeleteBehavior.Cascade);
            e.HasOne<AppUser>().WithMany().HasForeignKey(x => x.BlockedId).OnDelete(DeleteBehavior.NoAction);
        });

        b.Entity<UserReport>(e =>
        {
            e.Property(r => r.Reason).HasMaxLength(300);
            e.Property(r => r.Status).HasMaxLength(16);
            e.HasIndex(r => new { r.Status, r.CreatedAt });
            e.HasOne<AppUser>().WithMany().HasForeignKey(r => r.ReporterId).OnDelete(DeleteBehavior.Cascade);
            e.HasOne<AppUser>().WithMany().HasForeignKey(r => r.TargetUserId).OnDelete(DeleteBehavior.NoAction);
        });

        b.Entity<PlayerPresence>(e =>
        {
            e.HasKey(p => p.UserId);
            e.Property(p => p.Games).HasMaxLength(64);
            e.Property(p => p.Capacities).HasMaxLength(8);
            e.Property(p => p.Region).HasMaxLength(8);
            e.HasIndex(p => p.LastSeenAt);
            e.HasOne(p => p.User).WithOne().HasForeignKey<PlayerPresence>(p => p.UserId).OnDelete(DeleteBehavior.Cascade);
        });

        // ---- Thách đấu / phòng / chat ----
        b.Entity<Challenge>(e =>
        {
            e.Property(c => c.Game).HasMaxLength(16);
            e.Property(c => c.Mode).HasMaxLength(32);
            e.Property(c => c.Status).HasMaxLength(16);
            e.HasIndex(c => new { c.ToUserId, c.Status });
            e.HasIndex(c => new { c.FromUserId, c.Status });
            e.HasIndex(c => new { c.Status, c.ExpiresAt });
            e.HasOne(c => c.FromUser).WithMany().HasForeignKey(c => c.FromUserId).OnDelete(DeleteBehavior.Cascade);
            e.HasOne(c => c.ToUser).WithMany().HasForeignKey(c => c.ToUserId).OnDelete(DeleteBehavior.NoAction);
        });

        b.Entity<MatchRoom>(e =>
        {
            e.Property(m => m.Code).HasMaxLength(8);
            e.Property(m => m.Game).HasMaxLength(16);
            e.Property(m => m.Mode).HasMaxLength(32);
            e.Property(m => m.Source).HasMaxLength(8);
            e.Property(m => m.Status).HasMaxLength(16);
            e.Property(m => m.ConfigJson).HasMaxLength(2000);
            e.Property(m => m.CaroMovesJson).HasMaxLength(2000);
            e.Property(m => m.EndReason).HasMaxLength(32);
            e.HasIndex(m => m.Code);
            e.HasIndex(m => new { m.Status, m.CreatedAt });
            e.HasMany(m => m.Participants).WithOne(p => p.MatchRoom).HasForeignKey(p => p.MatchRoomId).OnDelete(DeleteBehavior.Cascade);
        });

        b.Entity<MatchParticipant>(e =>
        {
            e.HasIndex(p => new { p.MatchRoomId, p.UserId }).IsUnique();
            e.HasIndex(p => new { p.MatchRoomId, p.Seat }).IsUnique();
            e.HasIndex(p => p.UserId);
            e.HasOne(p => p.User).WithMany().HasForeignKey(p => p.UserId).OnDelete(DeleteBehavior.NoAction);
        });

        b.Entity<MatchResult>(e =>
        {
            e.Property(r => r.Outcome).HasMaxLength(8);
            e.HasIndex(r => new { r.MatchRoomId, r.UserId }).IsUnique();
            e.HasIndex(r => new { r.UserId, r.CreatedAt });
            e.HasOne(r => r.MatchRoom).WithMany().HasForeignKey(r => r.MatchRoomId).OnDelete(DeleteBehavior.Cascade);
            e.HasOne(r => r.User).WithMany().HasForeignKey(r => r.UserId).OnDelete(DeleteBehavior.NoAction);
        });

        b.Entity<ChatMessage>(e =>
        {
            e.Property(m => m.Text).HasMaxLength(300);
            e.Property(m => m.ClientId).HasMaxLength(64);
            e.HasIndex(m => new { m.MatchRoomId, m.SentAt });
            e.HasOne(m => m.MatchRoom).WithMany().HasForeignKey(m => m.MatchRoomId).OnDelete(DeleteBehavior.Cascade);
            e.HasOne(m => m.Sender).WithMany().HasForeignKey(m => m.SenderId).OnDelete(DeleteBehavior.NoAction);
        });

        b.Entity<MatchmakingTicket>(e =>
        {
            e.HasKey(t => t.UserId);
            e.Property(t => t.Game).HasMaxLength(16);
            e.Property(t => t.Mode).HasMaxLength(32);
            e.Property(t => t.Region).HasMaxLength(8);
            e.HasIndex(t => new { t.Game, t.Mode, t.MatchRoomId });
            e.HasOne<AppUser>().WithMany().HasForeignKey(t => t.UserId).OnDelete(DeleteBehavior.Cascade);
        });

        // ---- Tương thích app Flutter: thách đấu Rubik bất đồng bộ, chat 1-1 ----
        b.Entity<DuelChallenge>(e =>
        {
            e.Property(c => c.Scramble).HasMaxLength(200);
            e.Property(c => c.Message).HasMaxLength(100);
            e.Property(c => c.Status).HasMaxLength(16);
            e.Property(c => c.CreatorClientId).HasMaxLength(64);
            e.Property(c => c.OpponentClientId).HasMaxLength(64);
            e.HasIndex(c => new { c.CreatorId, c.CreatedAt });
            e.HasIndex(c => new { c.OpponentId, c.CreatedAt });
            e.HasIndex(c => new { c.Status, c.ExpiresAt });
            e.HasOne(c => c.Creator).WithMany().HasForeignKey(c => c.CreatorId).OnDelete(DeleteBehavior.Cascade);
            e.HasOne(c => c.Opponent).WithMany().HasForeignKey(c => c.OpponentId).OnDelete(DeleteBehavior.NoAction);
        });

        b.Entity<DirectMessage>(e =>
        {
            e.Property(m => m.Text).HasMaxLength(500);
            e.Property(m => m.ClientId).HasMaxLength(64);
            e.HasIndex(m => new { m.SenderId, m.RecipientId, m.Id });
            e.HasIndex(m => new { m.RecipientId, m.ReadAt });
            // Gửi lại cùng clientId (mạng chập chờn) không tạo bản trùng.
            e.HasIndex(m => new { m.SenderId, m.ClientId }).IsUnique()
                .HasFilter(Database.IsNpgsql() ? "\"ClientId\" IS NOT NULL" : "[ClientId] IS NOT NULL");
            e.HasOne<AppUser>().WithMany().HasForeignKey(m => m.SenderId).OnDelete(DeleteBehavior.Cascade);
            e.HasOne<AppUser>().WithMany().HasForeignKey(m => m.RecipientId).OnDelete(DeleteBehavior.NoAction);
        });
    }
}

public class UtcDateTimeConverter() : ValueConverter<DateTime, DateTime>(
    v => v.Kind == DateTimeKind.Utc ? v : v.ToUniversalTime(),
    v => DateTime.SpecifyKind(v, DateTimeKind.Utc));

public class NullableUtcDateTimeConverter() : ValueConverter<DateTime?, DateTime?>(
    v => v == null ? v : v.Value.Kind == DateTimeKind.Utc ? v : v.Value.ToUniversalTime(),
    v => v == null ? v : DateTime.SpecifyKind(v.Value, DateTimeKind.Utc));
