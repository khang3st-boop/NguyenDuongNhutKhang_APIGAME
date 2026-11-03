using System.ComponentModel.DataAnnotations;
using System.Text.Json;
using System.Text.Json.Nodes;
using Microsoft.EntityFrameworkCore;
using NguyenDuongNhutKhang_APIGAME.Data;
using NguyenDuongNhutKhang_APIGAME.DTOs;
using NguyenDuongNhutKhang_APIGAME.Helpers;
using NguyenDuongNhutKhang_APIGAME.Interfaces;
using NguyenDuongNhutKhang_APIGAME.Models;
using NguyenDuongNhutKhang_APIGAME.Repositories;

namespace NguyenDuongNhutKhang_APIGAME.Services;

/// <summary>
/// Nhận kết quả ván: kiểm tra dữ liệu, tự tính điểm, kiểm chứng lời giải (Rubik/Sudoku) nếu có,
/// rồi cập nhật thống kê (<c>GameStatistics</c>) và bảng xếp hạng (<c>Leaderboards</c>) trong cùng một giao dịch.
/// </summary>
public class GameResultService(AppDbContext db, GameResultRepository repo, TimeProvider clock, ILogger<GameResultService> log)
    : IGameResultService
{
    private const int MaxDetailsLength = 4000;
    private static readonly JsonSerializerOptions Json = new(JsonSerializerDefaults.Web);

    /// <summary>Thời gian thắng tối thiểu hợp lý (ms) — nhanh hơn vẫn lưu nhưng không xếp hạng.</summary>
    private static readonly Dictionary<string, long> MinWinMs = new()
    {
        [GameIds.Rubik] = 3_000, [GameIds.Sudoku] = 15_000, [GameIds.Puzzle] = 2_000, [GameIds.Caro] = 1_000,
    };

    internal readonly record struct Prepared(GameResult? Entity, string? Reason, string? Note);

    public async Task<SubmitResultResponse> SubmitAsync(Guid userId, ResultInput input, Guid? sessionId = null)
    {
        var existing = await repo.FindByClientIdAsync(userId, input.ClientId);
        if (existing != null) return new SubmitResultResponse(GameResultRepository.ToDto(existing), true, "Kết quả này đã được lưu trước đó.");

        var p = await PrepareAsync(userId, input, clock.GetUtcNow().UtcDateTime);
        if (p.Entity == null) throw AppException.BadRequest(p.Reason!, "RESULT_REJECTED");
        p.Entity.SessionId = sessionId;

        try
        {
            await SaveAsync(userId, [p.Entity]);
        }
        catch (DbUpdateException ex) when (IsUniqueViolation(ex))
        {
            // Hai request cùng clientId gửi song song → bản đến sau trả về bản đã lưu.
            db.ChangeTracker.Clear();
            var saved = await repo.FindByClientIdAsync(userId, input.ClientId);
            if (saved == null) throw;
            return new SubmitResultResponse(GameResultRepository.ToDto(saved), true, "Kết quả này đã được lưu trước đó.");
        }
        return new SubmitResultResponse(GameResultRepository.ToDto(p.Entity), false, p.Note);
    }

    public async Task<SyncResponse> SyncAsync(Guid userId, SyncRequest req)
    {
        var now = clock.GetUtcNow().UtcDateTime;
        var accepted = new List<string>();
        var duplicates = new List<string>();
        var rejected = new List<RejectedResult>();
        var toSave = new List<GameResult>();

        // Đọc từng phần tử riêng: một kết quả lỗi không làm hỏng cả lô.
        var inputs = new List<ResultInput>();
        foreach (var (raw, i) in req.Results.Select((r, i) => (r, i)))
        {
            var clientId = raw.ValueKind == JsonValueKind.Object && raw.TryGetProperty("clientId", out var c) && c.ValueKind == JsonValueKind.String
                ? c.GetString()! : $"#{i}";
            ResultInput? input;
            try { input = raw.Deserialize<ResultInput>(Json); }
            catch (JsonException) { input = null; }
            if (input == null) { rejected.Add(new(clientId, "Dữ liệu kết quả sai định dạng.")); continue; }
            var errors = new List<ValidationResult>();
            if (!Validator.TryValidateObject(input, new ValidationContext(input), errors, true))
            {
                rejected.Add(new(clientId, errors[0].ErrorMessage ?? "Dữ liệu không hợp lệ."));
                continue;
            }
            inputs.Add(input);
        }

        var existing = await repo.ExistingClientIdsAsync(userId, inputs.Select(x => x.ClientId).ToList());
        var seen = new HashSet<string>();
        foreach (var input in inputs)
        {
            if (existing.Contains(input.ClientId) || !seen.Add(input.ClientId)) { duplicates.Add(input.ClientId); continue; }
            var p = await PrepareAsync(userId, input, now);
            if (p.Entity == null) rejected.Add(new(input.ClientId, p.Reason!));
            else { toSave.Add(p.Entity); accepted.Add(input.ClientId); }
        }

        db.SyncRecords.Add(new SyncRecord
        {
            UserId = userId, DeviceId = req.DeviceId, Accepted = accepted.Count,
            Duplicates = duplicates.Count, Rejected = rejected.Count, SyncedAt = now,
        });
        try
        {
            await SaveAsync(userId, toSave);
        }
        catch (DbUpdateException ex) when (IsUniqueViolation(ex))
        {
            // Lần đồng bộ khác của cùng người chơi chen vào giữa → chạy lại, phần đã lưu sẽ thành "duplicates".
            db.ChangeTracker.Clear();
            log.LogInformation("Sync race for user {User}, retrying", userId);
            return await SyncAsync(userId, req);
        }

        var results = await repo.HistoryAsync(userId, null, 500, null, req.Since?.ToUniversalTime(), byReceived: true);
        if (req.Since == null) results = [.. results.Take(200)];
        return new SyncResponse(accepted, duplicates, rejected, results, now);
    }

    public Task<List<ResultDto>> HistoryAsync(Guid userId, string? game, int limit, DateTime? before) =>
        repo.HistoryAsync(userId, game, Math.Clamp(limit, 1, 200), before?.ToUniversalTime());

    public async Task<List<GameStatsDto>> StatsAsync(Guid userId, string? game)
    {
        var rows = await db.GameStatistics.AsNoTracking()
            .Where(s => s.UserId == userId && (game == null || s.Game == game)).ToListAsync();
        var games = game != null ? [game] : GameIds.All;
        return [.. games.Select(g => ToStats(g, rows.FirstOrDefault(r => r.Game == g)))];
    }

    // ---------------------------------------------------------------------

    private async Task<Prepared> PrepareAsync(Guid userId, ResultInput input, DateTime now, string? gameOverride = null)
    {
        var game = (gameOverride ?? input.Game)?.Trim().ToLowerInvariant();
        if (!GameIds.IsValid(game)) return Reject("Game không hợp lệ (rubik, sudoku, puzzle, caro).");
        var playedAt = input.PlayedAt?.ToUniversalTime() ?? now;
        if (playedAt > now.AddMinutes(5)) return Reject("Thời điểm chơi nằm ở tương lai.");
        if (playedAt < now.AddDays(-365)) return Reject("Kết quả quá cũ (hơn 1 năm).");
        if (input.Outcome == Outcomes.Draw && game != GameIds.Caro) return Reject("Kết quả hoà chỉ dùng cho Caro.");

        JsonObject? details = null;
        if (input.Details is { } d && d.ValueKind != JsonValueKind.Null)
        {
            if (d.ValueKind != JsonValueKind.Object) return Reject("details phải là một object JSON.");
            details = Sanitize(JsonNode.Parse(d.GetRawText())!.AsObject());
        }
        var detailsJson = details?.ToJsonString();
        if (detailsJson?.Length > MaxDetailsLength) return Reject("details quá lớn (tối đa 4 KB).");

        var assisted = input.Assisted;
        string? note = null;
        var win = input.Outcome == Outcomes.Win;

        // Kiểm chứng lời giải khi app gửi kèm dữ liệu.
        if (win && game == GameIds.Rubik && Str(details, "scramble") is { } scramble && Str(details, "solution") is { } solution)
        {
            if (!RubikVerifier.Solves(scramble, solution)) return Reject("Lời giải Rubik không đưa khối về trạng thái đã giải.");
            if (details!["autoSolve"]?.GetValueKind() == JsonValueKind.True) assisted = true;
        }
        if (win && game == GameIds.Sudoku && Str(details, "solution") is { } grid)
        {
            if (!SudokuVerifier.IsValidSolution(grid)) return Reject("Lời giải Sudoku sai luật.");
            if (Str(details, "puzzle") is { } puzzle && !SudokuVerifier.MatchesGivens(puzzle, grid))
                return Reject("Lời giải Sudoku không khớp đề bài.");
        }

        var plausible = !win || input.DurationMs >= MinWinMs[game!];
        if (!plausible) note = "Thời gian quá ngắn — đã lưu nhưng không tính xếp hạng.";
        var rankable = !assisted && plausible && (win || game == GameIds.Caro);
        if (assisted) note = "Ván có trợ giúp — đã lưu nhưng không tính xếp hạng.";

        string? daily = null;
        if (Str(details, "daily") is { } dd)
        {
            if (DateOnly.TryParseExact(dd, "yyyy-MM-dd", out _) && dd == GameClock.Today(playedAt)) daily = dd;
            else note ??= "Ngày thử thách không khớp thời điểm chơi — không tính vào xếp hạng ngày.";
        }

        string? code = null;
        if (game == GameIds.Rubik && Str(details, "challengeCode") is { } cc && CodeGenerator.LooksValid(cc))
        {
            var ch = await db.RubikChallengeCodes.AsNoTracking().FirstOrDefaultAsync(c => c.Code == cc);
            if (ch != null && ch.ExpiresAt > playedAt && Str(details, "scramble") == ch.Scramble) code = cc;
        }

        return new Prepared(new GameResult
        {
            UserId = userId, ClientId = input.ClientId, Game = game!, Mode = input.Mode.Trim(), Outcome = input.Outcome,
            Score = ScoreCalculator.Compute(game!, input.Outcome, input.DurationMs, input.Moves, input.Errors, input.Hints),
            DurationMs = input.DurationMs, Moves = input.Moves, Errors = input.Errors, Hints = input.Hints,
            Assisted = assisted, Rankable = rankable, DailyDate = daily, ChallengeCode = code,
            DetailsJson = detailsJson, PlayedAt = playedAt, ReceivedAt = now,
        }, null, note);

        static Prepared Reject(string reason) => new(null, reason, null);
    }

    /// <summary>Dùng cho phiên chơi: thời gian do server đo, game lấy từ phiên.</summary>
    internal Task<Prepared> PrepareForSessionAsync(Guid userId, string game, ResultInput input, DateTime now) =>
        PrepareAsync(userId, input, now, game);

    internal async Task<ResultDto> SavePreparedAsync(Guid userId, GameResult entity)
    {
        await SaveAsync(userId, [entity]);
        return GameResultRepository.ToDto(entity);
    }

    /// <summary>Lưu kết quả + cập nhật thống kê và bảng xếp hạng (một SaveChanges = một giao dịch).</summary>
    private async Task SaveAsync(Guid userId, List<GameResult> results)
    {
        if (results.Count > 0)
        {
            var games = results.Select(r => r.Game).Distinct().ToList();
            var stats = await db.GameStatistics.Where(s => s.UserId == userId && games.Contains(s.Game))
                .ToDictionaryAsync(s => s.Game);
            var boards = results.Where(r => r.Rankable)
                .SelectMany(r => r.DailyDate != null ? new[] { "all", "daily:" + r.DailyDate } : ["all"]).Distinct().ToList();
            var entries = await db.Leaderboards.Where(l => l.UserId == userId && boards.Contains(l.Board) && games.Contains(l.Game))
                .ToDictionaryAsync(l => (l.Board, l.Game));

            foreach (var r in results.OrderBy(r => r.PlayedAt))
            {
                db.GameResults.Add(r);
                if (!stats.TryGetValue(r.Game, out var s))
                {
                    s = new GameStatistic { UserId = userId, Game = r.Game };
                    db.GameStatistics.Add(s);
                    stats[r.Game] = s;
                }
                Apply(s, r);
                if (!r.Rankable) continue;
                foreach (var board in r.DailyDate != null ? new[] { "all", "daily:" + r.DailyDate } : ["all"])
                {
                    if (!entries.TryGetValue((board, r.Game), out var e))
                    {
                        e = new LeaderboardEntry { Board = board, Game = r.Game, UserId = userId };
                        db.Leaderboards.Add(e);
                        entries[(board, r.Game)] = e;
                    }
                    e.GamesPlayed++;
                    e.BestScore = Math.Max(e.BestScore, r.Score);
                    if (r.Outcome == Outcomes.Win && (e.BestTimeMs == null || r.DurationMs < e.BestTimeMs)) e.BestTimeMs = r.DurationMs;
                    e.UpdatedAt = r.ReceivedAt;
                }
            }
        }
        await db.SaveChangesAsync();
    }

    private static void Apply(GameStatistic s, GameResult r)
    {
        s.GamesPlayed++;
        s.TotalDurationMs += r.DurationMs;
        s.TotalMoves += r.Moves;
        if (r.Rankable) s.BestScore = Math.Max(s.BestScore, r.Score);
        switch (r.Outcome)
        {
            case Outcomes.Win:
                s.Wins++;
                s.CurrentStreak++;
                s.BestStreak = Math.Max(s.BestStreak, s.CurrentStreak);
                // Kỷ lục chỉ tính ván hợp lệ (không trợ giúp, thời gian hợp lý).
                if (!r.Rankable) break;
                if (s.BestTimeMs == null || r.DurationMs < s.BestTimeMs) s.BestTimeMs = r.DurationMs;
                if (r.Moves > 0 && (s.BestMoves == null || r.Moves < s.BestMoves)) s.BestMoves = r.Moves;
                break;
            case Outcomes.Draw: s.Draws++; s.CurrentStreak = 0; break;
            default: s.Losses++; s.CurrentStreak = 0; break;
        }
        if (s.LastPlayedAt == null || r.PlayedAt > s.LastPlayedAt) s.LastPlayedAt = r.PlayedAt;
    }

    internal static GameStatsDto ToStats(string game, GameStatistic? s) => s == null
        ? new GameStatsDto(game, 0, 0, 0, 0, 0, null, null, null, 0, 0, 0, null)
        : new GameStatsDto(game, s.GamesPlayed, s.Wins, s.Losses, s.Draws, s.TotalDurationMs, s.BestTimeMs,
            s.GamesPlayed > 0 ? s.TotalDurationMs / s.GamesPlayed : null, s.BestMoves, s.BestScore,
            s.CurrentStreak, s.BestStreak, s.LastPlayedAt);

    /// <summary>
    /// Không lưu dữ liệu ảnh/đường dẫn file riêng tư: chuỗi dạng data-URL/base64 dài bị bỏ,
    /// trường ảnh chứa đường dẫn được thay bằng "photo".
    /// </summary>
    internal static JsonObject Sanitize(JsonObject obj)
    {
        foreach (var (key, value) in obj.ToList())
        {
            if (value is not JsonValue v || v.GetValueKind() != JsonValueKind.String) continue;
            var str = v.GetValue<string>();
            var k = key.ToLowerInvariant();
            if (str.StartsWith("data:", StringComparison.OrdinalIgnoreCase) || str.Length > 1000) obj.Remove(key);
            else if ((k.Contains("image") || k.Contains("photo") || k.Contains("path")) &&
                     (str.Contains('/') || str.Contains('\\') || str.Contains(':')))
                obj[key] = "photo";
        }
        return obj;
    }

    private static string? Str(JsonObject? o, string key) =>
        o?[key] is JsonValue v && v.GetValueKind() == JsonValueKind.String ? v.GetValue<string>() : null;

    internal static bool IsUniqueViolation(DbUpdateException ex) =>
        DatabaseErrors.IsUniqueViolation(ex);
}
