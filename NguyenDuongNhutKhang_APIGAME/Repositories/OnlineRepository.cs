using Microsoft.EntityFrameworkCore;
using NguyenDuongNhutKhang_APIGAME.Data;
using NguyenDuongNhutKhang_APIGAME.Helpers;
using NguyenDuongNhutKhang_APIGAME.Models;

namespace NguyenDuongNhutKhang_APIGAME.Repositories;

/// <summary>Truy vấn dùng chung cho bạn bè / sảnh / trận online.</summary>
public class OnlineRepository(AppDbContext db)
{
    public const int BaseRating = 1200;
    public const int RatingStep = 16;

    /// <summary>Hai người có chặn nhau (theo bất kỳ chiều nào) không.</summary>
    public Task<bool> BlockedEitherAsync(Guid a, Guid b) =>
        db.UserBlocks.AnyAsync(x => (x.BlockerId == a && x.BlockedId == b) || (x.BlockerId == b && x.BlockedId == a));

    /// <summary>Những người tôi chặn hoặc đã chặn tôi.</summary>
    public async Task<HashSet<Guid>> BlockedSetAsync(Guid me)
    {
        var rows = await db.UserBlocks.Where(x => x.BlockerId == me || x.BlockedId == me)
            .Select(x => x.BlockerId == me ? x.BlockedId : x.BlockerId).ToListAsync();
        return [.. rows];
    }

    public Task<bool> UserExistsAsync(Guid id) => db.Users.AnyAsync(u => u.Id == id);

    /// <summary>Trận đang chờ / đang chơi của người dùng (mỗi người tối đa một trận).</summary>
    public Task<Guid?> ActiveMatchIdAsync(Guid user) =>
        db.MatchParticipants.Where(p => p.UserId == user && !p.Forfeited &&
                                        (p.MatchRoom.Status == MatchStatus.Waiting || p.MatchRoom.Status == MatchStatus.Playing))
            .OrderByDescending(p => p.JoinedAt).Select(p => (Guid?)p.MatchRoomId).FirstOrDefaultAsync();

    public async Task<HashSet<Guid>> InMatchAsync(IEnumerable<Guid> users)
    {
        var ids = users.ToList();
        var rows = await db.MatchParticipants.Where(p => ids.Contains(p.UserId) && !p.Forfeited &&
                                                         (p.MatchRoom.Status == MatchStatus.Waiting || p.MatchRoom.Status == MatchStatus.Playing))
            .Select(p => p.UserId).Distinct().ToListAsync();
        return [.. rows];
    }

    /// <summary>Kết quả các trận tính xếp hạng: không phải phòng tự tạo, 2 người, không ai dùng trợ giúp.</summary>
    public IQueryable<MatchResult> RatedResults(string game) =>
        db.MatchResults.Where(r => r.MatchRoom.Game == game && r.MatchRoom.Status == MatchStatus.Finished &&
                                   r.MatchRoom.Source != MatchSource.Room && r.MatchRoom.Capacity == 2 &&
                                   !r.MatchRoom.Participants.Any(p => p.Assisted));

    public record RatingRow(Guid UserId, int Played, int Wins, int Losses)
    {
        /// <summary>Điểm online đơn giản: 1200 ± 16 mỗi trận thắng/thua (không phải Elo đầy đủ).</summary>
        public int Rating => Math.Max(100, BaseRating + RatingStep * (Wins - Losses));
    }

    public async Task<Dictionary<Guid, RatingRow>> RatingsAsync(string game, IEnumerable<Guid>? users = null)
    {
        var q = RatedResults(game);
        if (users != null)
        {
            var ids = users.ToList();
            q = q.Where(r => ids.Contains(r.UserId));
        }
        var rows = await q.GroupBy(r => r.UserId)
            .Select(g => new RatingRow(g.Key, g.Count(), g.Count(r => r.Outcome == Outcomes.Win), g.Count(r => r.Outcome == Outcomes.Loss)))
            .ToListAsync();
        return rows.ToDictionary(r => r.UserId);
    }

    public async Task<int> RatingAsync(string game, Guid user) =>
        (await RatingsAsync(game, [user])).GetValueOrDefault(user)?.Rating ?? BaseRating;
}
