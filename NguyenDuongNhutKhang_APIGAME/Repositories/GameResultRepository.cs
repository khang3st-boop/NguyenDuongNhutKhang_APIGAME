using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using NguyenDuongNhutKhang_APIGAME.Data;
using NguyenDuongNhutKhang_APIGAME.DTOs;
using NguyenDuongNhutKhang_APIGAME.Models;

namespace NguyenDuongNhutKhang_APIGAME.Repositories;

/// <summary>Truy vấn kết quả ván và dựng bảng xếp hạng (dùng chung cho kết quả, daily, Rubik).</summary>
public class GameResultRepository(AppDbContext db)
{
    public Task<GameResult?> FindByClientIdAsync(Guid userId, string clientId) =>
        db.GameResults.AsNoTracking().FirstOrDefaultAsync(r => r.UserId == userId && r.ClientId == clientId);

    public async Task<HashSet<string>> ExistingClientIdsAsync(Guid userId, IReadOnlyCollection<string> clientIds) =>
        [.. await db.GameResults.AsNoTracking()
            .Where(r => r.UserId == userId && clientIds.Contains(r.ClientId))
            .Select(r => r.ClientId).ToListAsync()];

    public async Task<List<ResultDto>> HistoryAsync(Guid userId, string? game, int limit, DateTime? before, DateTime? after = null,
        bool dailyOnly = false, bool byReceived = false)
    {
        var q = db.GameResults.AsNoTracking().Where(r => r.UserId == userId);
        if (game != null) q = q.Where(r => r.Game == game);
        if (dailyOnly) q = q.Where(r => r.DailyDate != null);
        if (before != null) q = q.Where(r => r.PlayedAt < before);
        if (after != null) q = byReceived ? q.Where(r => r.ReceivedAt > after) : q.Where(r => r.PlayedAt >= after);
        var rows = await q.OrderByDescending(r => r.PlayedAt).Take(limit).ToListAsync();
        return rows.ConvertAll(ToDto);
    }

    /// <summary>Xếp hạng từ bảng <c>Leaderboards</c> (board "all" hoặc "daily:yyyy-MM-dd").</summary>
    public async Task<List<LeaderboardRow>> BoardAsync(string board, string game, int limit)
    {
        var rows = await db.Leaderboards.AsNoTracking()
            .Where(l => l.Board == board && l.Game == game)
            .OrderByDescending(l => l.BestScore).ThenBy(l => l.BestTimeMs).ThenBy(l => l.UpdatedAt)
            .Take(limit)
            .Select(l => new { l.UserId, l.BestScore, l.BestTimeMs, l.GamesPlayed })
            .ToListAsync();
        return await RankAsync(rows.Select(r => (r.UserId, r.BestScore, r.BestTimeMs, r.GamesPlayed)).ToList());
    }

    /// <summary>Xếp hạng tính trực tiếp từ <c>GameResults</c> hợp lệ (dùng cho 7 ngày và mã thử thách).</summary>
    public async Task<List<LeaderboardRow>> AggregateAsync(IQueryable<GameResult> rankable, int limit)
    {
        var rows = await rankable
            .GroupBy(r => r.UserId)
            .Select(g => new
            {
                UserId = g.Key,
                BestScore = g.Max(r => r.Score),
                BestTimeMs = g.Where(r => r.Outcome == Helpers.Outcomes.Win).Min(r => (long?)r.DurationMs),
                GamesPlayed = g.Count(),
            })
            .OrderByDescending(x => x.BestScore).ThenBy(x => x.BestTimeMs)
            .Take(limit)
            .ToListAsync();
        return await RankAsync(rows.Select(r => (r.UserId, r.BestScore, r.BestTimeMs, r.GamesPlayed)).ToList());
    }

    private async Task<List<LeaderboardRow>> RankAsync(List<(Guid UserId, int BestScore, long? BestTimeMs, int GamesPlayed)> rows)
    {
        var ids = rows.Select(r => r.UserId).ToList();
        var profiles = await db.UserProfiles.AsNoTracking().Where(p => ids.Contains(p.UserId))
            .ToDictionaryAsync(p => p.UserId, p => (p.DisplayName, p.AvatarColor));
        return [.. rows.Select((r, i) =>
        {
            var p = profiles.GetValueOrDefault(r.UserId, ("?", 0));
            return new LeaderboardRow(i + 1, r.UserId, p.Item1, p.Item2, r.BestScore, r.BestTimeMs, r.GamesPlayed);
        })];
    }

    public static ResultDto ToDto(GameResult r) => new(
        r.Id, r.ClientId, r.UserId, r.Game, r.Mode, r.Outcome, r.Score, r.DurationMs, r.Moves, r.Errors, r.Hints,
        r.Assisted, r.Rankable, r.DailyDate, r.ChallengeCode, r.PlayedAt, r.ReceivedAt, ParseJson(r.DetailsJson));

    public static JsonElement? ParseJson(string? json)
    {
        if (string.IsNullOrEmpty(json)) return null;
        using var doc = JsonDocument.Parse(json);
        return doc.RootElement.Clone();
    }
}
