using System.Security.Cryptography;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using NguyenDuongNhutKhang_APIGAME.Data;
using NguyenDuongNhutKhang_APIGAME.DTOs;
using NguyenDuongNhutKhang_APIGAME.Helpers;
using NguyenDuongNhutKhang_APIGAME.Interfaces;
using NguyenDuongNhutKhang_APIGAME.Models;
using NguyenDuongNhutKhang_APIGAME.Repositories;

namespace NguyenDuongNhutKhang_APIGAME.Services;

/// <summary>
/// Thử thách hằng ngày (theo giờ Việt Nam). Mỗi (ngày, game) có một seed lưu ở bảng <c>DailyChallenges</c>
/// — tạo lần đầu khi có người hỏi, sau đó cố định cho mọi người.
/// </summary>
public class DailyService(AppDbContext db, GameResultRepository repo, TimeProvider clock) : IDailyService
{
    public async Task<DailyTodayResponse> TodayAsync()
    {
        var now = clock.GetUtcNow().UtcDateTime;
        var date = GameClock.Today(now);
        var games = new List<DailyGameDto>();
        foreach (var g in GameIds.Daily) games.Add(await ForGameAsync(g, date));
        return new DailyTodayResponse(date, now, GameClock.NextReset(now), null, games);
    }

    public async Task<DailyGameDto> ForGameAsync(string game, string? date)
    {
        if (!GameIds.Daily.Contains(game)) throw AppException.BadRequest("Game này không có thử thách ngày trên server.", "NO_DAILY");
        var today = GameClock.Today(clock.GetUtcNow().UtcDateTime);
        date ??= today;
        if (!DateOnly.TryParseExact(date, "yyyy-MM-dd", out var day)) throw AppException.BadRequest("Ngày dạng yyyy-MM-dd.", "INVALID_DATE");
        if (string.CompareOrdinal(date, today) > 0) throw AppException.BadRequest("Chưa tới ngày của thử thách này.", "FUTURE_DATE");

        var row = await db.DailyChallenges.AsNoTracking().FirstOrDefaultAsync(d => d.Date == date && d.Game == game);
        if (row == null)
        {
            row = new DailyChallenge { Date = date, Game = game, Seed = RandomNumberGenerator.GetInt32(int.MaxValue), Mode = ModeFor(game, day) };
            db.DailyChallenges.Add(row);
            try { await db.SaveChangesAsync(); }
            catch (DbUpdateException ex) when (ex.InnerException is SqlException { Number: 2601 or 2627 })
            {
                // Request khác vừa tạo cùng ngày → dùng bản đã có.
                db.ChangeTracker.Clear();
                row = await db.DailyChallenges.AsNoTracking().FirstAsync(d => d.Date == date && d.Game == game);
            }
        }
        return new DailyGameDto(row.Game, row.Date, row.Mode, row.Seed);
    }

    public Task<List<ResultDto>> MineAsync(Guid userId, int days) =>
        repo.HistoryAsync(userId, null, 500, null, clock.GetUtcNow().UtcDateTime.AddDays(-Math.Clamp(days, 1, 366)), dailyOnly: true);

    /// <summary>Độ khó theo thứ (giống app): T2–T3 dễ, T4–T6 trung bình, T7–CN khó.</summary>
    internal static string ModeFor(string game, DateOnly day)
    {
        var level = day.DayOfWeek switch
        {
            DayOfWeek.Monday or DayOfWeek.Tuesday => 0,
            DayOfWeek.Saturday or DayOfWeek.Sunday => 2,
            _ => 1,
        };
        return game == GameIds.Sudoku ? new[] { "easy", "medium", "hard" }[level] : new[] { "3x3", "4x4", "5x5" }[level];
    }
}

/// <summary>Bảng xếp hạng: "all" đọc bảng <c>Leaderboards</c>; "week" tính từ kết quả 7 ngày gần nhất.</summary>
public class LeaderboardService(AppDbContext db, GameResultRepository repo, TimeProvider clock) : ILeaderboardService
{
    public Task<List<LeaderboardRow>> TopAsync(string game, string period, int limit)
    {
        limit = Math.Clamp(limit, 1, 100);
        if (period == "week")
        {
            var since = clock.GetUtcNow().UtcDateTime.AddDays(-7);
            return repo.AggregateAsync(db.GameResults.AsNoTracking().Where(r => r.Game == game && r.Rankable && r.PlayedAt >= since), limit);
        }
        return repo.BoardAsync("all", game, limit);
    }

    public Task<List<LeaderboardRow>> DailyAsync(string date, string game, int limit)
    {
        if (!DateOnly.TryParseExact(date, "yyyy-MM-dd", out _)) throw AppException.BadRequest("Ngày dạng yyyy-MM-dd.", "INVALID_DATE");
        return repo.BoardAsync("daily:" + date, game, Math.Clamp(limit, 1, 100));
    }
}

/// <summary>Mã thử thách Rubik: server sinh scramble, ai có mã đều giải cùng một đề (hạn 30 ngày).</summary>
public class RubikChallengeService(AppDbContext db, GameResultRepository repo, IUserService users, TimeProvider clock) : IRubikChallengeService
{
    public async Task<RubikChallengeDto> CreateAsync(Guid userId, CreateRubikChallengeRequest req)
    {
        var now = clock.GetUtcNow().UtcDateTime;
        var recent = await db.RubikChallengeCodes.CountAsync(c => c.CreatorId == userId && c.CreatedAt > now.AddHours(-1));
        if (recent >= 20) throw AppException.TooMany("Bạn tạo quá nhiều mã thử thách, thử lại sau.");

        RubikChallengeCode row = null!;
        for (var attempt = 0; attempt < 5; attempt++)
        {
            var code = CodeGenerator.New(6);
            if (await db.RubikChallengeCodes.AnyAsync(c => c.Code == code)) continue;
            row = new RubikChallengeCode
            {
                Code = code, CreatorId = userId, Scramble = RubikVerifier.RandomScramble(20),
                Note = string.IsNullOrWhiteSpace(req.Note) ? null : req.Note.Trim(), CreatedAt = now, ExpiresAt = now.AddDays(30),
            };
            break;
        }
        if (row == null) throw AppException.Conflict("Không tạo được mã, vui lòng thử lại.", "CODE_EXHAUSTED");
        db.RubikChallengeCodes.Add(row);
        await db.SaveChangesAsync();
        return await ToDto(row);
    }

    public async Task<RubikChallengeDto> GetAsync(string code)
    {
        code = code.Trim().ToUpperInvariant();
        var row = CodeGenerator.LooksValid(code) ? await db.RubikChallengeCodes.AsNoTracking().FirstOrDefaultAsync(c => c.Code == code) : null;
        if (row == null || row.ExpiresAt <= clock.GetUtcNow().UtcDateTime) throw AppException.NotFound("Mã thử thách không tồn tại hoặc đã hết hạn.");
        return await ToDto(row);
    }

    public async Task<List<LeaderboardRow>> ResultsAsync(string code, int limit)
    {
        var c = await GetAsync(code);
        return await repo.AggregateAsync(
            db.GameResults.AsNoTracking().Where(r => r.ChallengeCode == c.Code && r.Rankable), Math.Clamp(limit, 1, 100));
    }

    private async Task<RubikChallengeDto> ToDto(RubikChallengeCode c)
    {
        var creator = (await users.SummariesAsync([c.CreatorId])).GetValueOrDefault(c.CreatorId);
        return new RubikChallengeDto(c.Code, c.Scramble, c.Note, creator, c.CreatedAt, c.ExpiresAt);
    }
}
