namespace NguyenDuongNhutKhang_APIGAME.Models;

/// <summary>Một ván đang chơi (bảng <c>GameSessions</c>). Server ghi thời điểm bắt đầu để kiểm tra thời gian client báo về.</summary>
public class GameSession
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public AppUser User { get; set; } = null!;

    public string Game { get; set; } = "";
    public string Mode { get; set; } = "";
    public string Status { get; set; } = Helpers.SessionStatus.Active;

    /// <summary>Trạng thái ván (JSON do client gửi, ví dụ facelets Rubik / lưới Sudoku) để chơi tiếp.</summary>
    public string? StateJson { get; set; }

    /// <summary>Ngày thử thách hằng ngày (yyyy-MM-dd) nếu ván thuộc thử thách ngày.</summary>
    public string? DailyDate { get; set; }

    public DateTime StartedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? EndedAt { get; set; }

    public Guid? ResultId { get; set; }
}

/// <summary>Kết quả một ván (bảng <c>GameResults</c>). Điểm do server tính, không lấy điểm client.</summary>
public class GameResult
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public AppUser User { get; set; } = null!;

    /// <summary>Id do client sinh (UUID) — chống gửi trùng khi đồng bộ offline.</summary>
    public string ClientId { get; set; } = "";
    public Guid? SessionId { get; set; }

    public string Game { get; set; } = "";
    public string Mode { get; set; } = "";
    public string Outcome { get; set; } = "";
    public int Score { get; set; }
    public long DurationMs { get; set; }
    public int Moves { get; set; }
    public int Errors { get; set; }
    public int Hints { get; set; }
    public bool Assisted { get; set; }

    /// <summary>false nếu dùng trợ giúp hoặc không qua được kiểm tra → không vào bảng xếp hạng.</summary>
    public bool Rankable { get; set; }

    public string? DailyDate { get; set; }
    public string? ChallengeCode { get; set; }
    public string? DetailsJson { get; set; }

    public DateTime PlayedAt { get; set; }
    public DateTime ReceivedAt { get; set; } = DateTime.UtcNow;
}

/// <summary>Thống kê tích luỹ theo người chơi + game (bảng <c>GameStatistics</c>), cập nhật mỗi khi lưu kết quả.</summary>
public class GameStatistic
{
    public Guid UserId { get; set; }
    public AppUser User { get; set; } = null!;
    public string Game { get; set; } = "";

    public int GamesPlayed { get; set; }
    public int Wins { get; set; }
    public int Losses { get; set; }
    public int Draws { get; set; }
    public long TotalDurationMs { get; set; }
    public long? BestTimeMs { get; set; }
    public long TotalMoves { get; set; }
    public int? BestMoves { get; set; }
    public int BestScore { get; set; }
    public int CurrentStreak { get; set; }
    public int BestStreak { get; set; }
    public DateTime? LastPlayedAt { get; set; }
}

/// <summary>Thử thách hằng ngày (bảng <c>DailyChallenges</c>): mỗi (ngày, game) một seed cố định cho mọi người.</summary>
public class DailyChallenge
{
    public int Id { get; set; }
    public string Date { get; set; } = "";
    public string Game { get; set; } = "";
    public long Seed { get; set; }
    public string Mode { get; set; } = "";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

/// <summary>Bảng xếp hạng (bảng <c>Leaderboards</c>). Board = "all" hoặc "daily:yyyy-MM-dd".</summary>
public class LeaderboardEntry
{
    public long Id { get; set; }
    public string Board { get; set; } = "all";
    public string Game { get; set; } = "";
    public Guid UserId { get; set; }
    public AppUser User { get; set; } = null!;
    public int BestScore { get; set; }
    public long? BestTimeMs { get; set; }
    public int GamesPlayed { get; set; }
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

/// <summary>Nhật ký mỗi lần đồng bộ offline → online (bảng <c>SyncRecords</c>).</summary>
public class SyncRecord
{
    public long Id { get; set; }
    public Guid UserId { get; set; }
    public AppUser User { get; set; } = null!;
    public string? DeviceId { get; set; }
    public int Accepted { get; set; }
    public int Duplicates { get; set; }
    public int Rejected { get; set; }
    public DateTime SyncedAt { get; set; } = DateTime.UtcNow;
}

/// <summary>Mã thử thách Rubik chia sẻ được (bảng <c>RubikChallengeCodes</c>): cùng một scramble cho mọi người.</summary>
public class RubikChallengeCode
{
    public string Code { get; set; } = "";
    public Guid CreatorId { get; set; }
    public AppUser Creator { get; set; } = null!;
    public string Scramble { get; set; } = "";
    public string? Note { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime ExpiresAt { get; set; }
}
