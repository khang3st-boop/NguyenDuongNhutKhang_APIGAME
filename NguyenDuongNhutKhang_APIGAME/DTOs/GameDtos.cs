using System.ComponentModel.DataAnnotations;
using System.Text.Json;

namespace NguyenDuongNhutKhang_APIGAME.DTOs;

/// <summary>Một kết quả ván do app gửi lên (cùng định dạng <c>GameResult.toApiJson()</c> của Flutter).</summary>
/// <remarks>Trường <c>score</c> được nhận để tương thích nhưng bị bỏ qua — server tự tính điểm.</remarks>
public record ResultInput
{
    /// <summary>UUID do app sinh, dùng chống gửi trùng khi đồng bộ offline.</summary>
    [Required(ErrorMessage = "Thiếu clientId.")]
    [RegularExpression("^[A-Za-z0-9_-]{8,64}$", ErrorMessage = "clientId 8–64 ký tự: chữ, số, - hoặc _.")]
    public string ClientId { get; init; } = "";

    /// <summary>rubik | sudoku | puzzle | caro (bỏ qua khi gọi qua route riêng của game).</summary>
    [StringLength(16)]
    public string? Game { get; init; }

    [StringLength(32, ErrorMessage = "mode tối đa 32 ký tự.")]
    public string Mode { get; init; } = "";

    /// <summary>win | loss | draw.</summary>
    [Required(ErrorMessage = "Thiếu outcome.")]
    [RegularExpression("^(win|loss|draw)$", ErrorMessage = "outcome phải là win, loss hoặc draw.")]
    public string Outcome { get; init; } = "";

    /// <summary>Bị bỏ qua (server tự tính).</summary>
    public int? Score { get; init; }

    [Range(0, 86_400_000, ErrorMessage = "durationMs không hợp lệ.")]
    public long DurationMs { get; init; }

    [Range(0, 100_000, ErrorMessage = "moves không hợp lệ.")]
    public int Moves { get; init; }

    [Range(0, 10_000, ErrorMessage = "errors không hợp lệ.")]
    public int Errors { get; init; }

    [Range(0, 10_000, ErrorMessage = "hints không hợp lệ.")]
    public int Hints { get; init; }

    public bool Assisted { get; init; }

    /// <summary>Thời điểm chơi (ISO-8601). Bỏ trống = lúc server nhận.</summary>
    public DateTime? PlayedAt { get; init; }

    /// <summary>Chi tiết tuỳ game (object JSON ≤ 4 KB). Ví dụ <c>{"daily":"2026-11-02"}</c>, <c>{"scramble":"...","solution":"..."}</c>.</summary>
    public JsonElement? Details { get; init; }
}

/// <summary>Kết quả đã lưu trên server.</summary>
public record ResultDto(
    Guid Id, string ClientId, Guid UserId, string Game, string Mode, string Outcome, int Score,
    long DurationMs, int Moves, int Errors, int Hints, bool Assisted, bool Rankable,
    string? DailyDate, string? ChallengeCode, DateTime PlayedAt, DateTime ReceivedAt, JsonElement? Details);

/// <summary>Kết quả gửi đơn lẻ: <c>duplicate = true</c> nếu clientId đã có (trả lại bản đã lưu).</summary>
public record SubmitResultResponse(ResultDto Result, bool Duplicate, string? Note);

/// <summary>Body của <c>POST /sync</c>.</summary>
public record SyncRequest
{
    [MaxLength(100, ErrorMessage = "Tối đa 100 kết quả mỗi lần đồng bộ.")]
    public List<JsonElement> Results { get; init; } = [];

    /// <summary>Lần đồng bộ trước (serverTime đã nhận) — server trả về kết quả mới hơn từ thiết bị khác.</summary>
    public DateTime? Since { get; init; }

    [StringLength(64)]
    public string? DeviceId { get; init; }
}

public record RejectedResult(string ClientId, string Reason);

public record SyncResponse(
    List<string> Accepted, List<string> Duplicates, List<RejectedResult> Rejected,
    List<ResultDto> Results, DateTime ServerTime);

public record GameStatsDto(
    string Game, int GamesPlayed, int Wins, int Losses, int Draws, long TotalDurationMs, long? BestTimeMs,
    long? AverageTimeMs, int? BestMoves, int BestScore, int CurrentStreak, int BestStreak, DateTime? LastPlayedAt);

/// <summary>Một dòng bảng xếp hạng (cùng định dạng <c>LeaderboardEntry</c> của Flutter).</summary>
public record LeaderboardRow(int Rank, Guid UserId, string DisplayName, int AvatarColor, int BestScore, long? BestTimeMs, int GamesPlayed);

// ---- Phiên chơi ----

public record StartSessionRequest
{
    [StringLength(32)]
    public string Mode { get; init; } = "";

    /// <summary>Trạng thái ban đầu (JSON tuỳ game, ≤ 16 KB).</summary>
    public JsonElement? State { get; init; }

    /// <summary>yyyy-MM-dd nếu là ván thử thách hằng ngày.</summary>
    [RegularExpression(@"^\d{4}-\d{2}-\d{2}$", ErrorMessage = "dailyDate dạng yyyy-MM-dd.")]
    public string? DailyDate { get; init; }
}

public record SaveStateRequest
{
    [Required(ErrorMessage = "Thiếu state.")]
    public JsonElement? State { get; init; }
}

public record FinishSessionRequest
{
    [Required, RegularExpression("^(win|loss|draw)$", ErrorMessage = "outcome phải là win, loss hoặc draw.")]
    public string Outcome { get; init; } = "";

    [RegularExpression("^[A-Za-z0-9_-]{8,64}$", ErrorMessage = "clientId 8–64 ký tự.")]
    public string? ClientId { get; init; }

    [Range(0, 100_000)] public int Moves { get; init; }
    [Range(0, 10_000)] public int Errors { get; init; }
    [Range(0, 10_000)] public int Hints { get; init; }
    public bool Assisted { get; init; }
    public JsonElement? Details { get; init; }
}

public record SessionDto(
    Guid Id, string Game, string Mode, string Status, string? DailyDate, JsonElement? State,
    DateTime StartedAt, DateTime UpdatedAt, DateTime? EndedAt, Guid? ResultId);

public record FinishSessionResponse(SessionDto Session, ResultDto Result);

// ---- Thử thách hằng ngày ----

public record DailyGameDto(string Game, string Date, string Mode, long Seed);

/// <summary>
/// <c>challenge</c> luôn null: đề hằng ngày của app Flutter được sinh xác định trên máy (thuật toán phía Flutter/Java);
/// server C# chưa sinh lại y hệt nên không gửi đề khác để app không báo "đề lệch".
/// </summary>
public record DailyTodayResponse(string Date, DateTime ServerTime, DateTime NextResetAt, object? Challenge, List<DailyGameDto> Games);

// ---- Rubik ----

public record ScrambleResponse(string Scramble);

public record CreateRubikChallengeRequest
{
    [StringLength(100, ErrorMessage = "Ghi chú tối đa 100 ký tự.")]
    public string? Note { get; init; }
}

public record RubikChallengeDto(string Code, string Scramble, string? Note, UserSummaryDto? Creator, DateTime CreatedAt, DateTime ExpiresAt);

public record RubikVerifyRequest
{
    [Required, StringLength(200)] public string Scramble { get; init; } = "";
    [Required, StringLength(8000)] public string Solution { get; init; } = "";
}

public record RubikVerifyResponse(bool Valid, bool Solved, int Moves);
