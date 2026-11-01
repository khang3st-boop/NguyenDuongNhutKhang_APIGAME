using System.Net;
using System.Net.Http.Json;
using Microsoft.EntityFrameworkCore;
using NguyenDuongNhutKhang_APIGAME.Helpers;
using NguyenDuongNhutKhang_APIGAME.Tests.Infrastructure;

namespace NguyenDuongNhutKhang_APIGAME.Tests.Integration;

[Collection(ApiCollection.Name)]
public class GameDataTests(ApiFactory api)
{
    private static string ClientId() => "t" + Guid.NewGuid().ToString("N")[..20];

    [Fact]
    public async Task Result_is_saved_to_database_and_duplicate_clientId_is_idempotent()
    {
        var u = await api.RegisterAsync("res");
        var cid = ClientId();
        var body = new { clientId = cid, mode = "easy", outcome = "win", durationMs = 300_000, moves = 50, errors = 1, hints = 0 };

        var first = await u.Client.PostAsJsonAsync("/api/v1/sudoku/results", body);
        Assert.Equal(HttpStatusCode.Created, first.StatusCode);
        var again = await u.Client.PostAsJsonAsync("/api/v1/sudoku/results", body);
        Assert.Equal(HttpStatusCode.OK, again.StatusCode);
        Assert.True((await again.JsonAsync()).GetProperty("duplicate").GetBoolean());

        var rows = await api.WithDbAsync(db => db.GameResults.AsNoTracking().Where(r => r.UserId == u.Id).ToListAsync());
        var row = Assert.Single(rows);
        Assert.Equal(("sudoku", "easy", "win", cid), (row.Game, row.Mode, row.Outcome, row.ClientId));
        Assert.True(row.Score > 0); // điểm do server tính

        var history = await (await u.Client.GetAsync("/api/v1/sudoku/history")).JsonAsync();
        Assert.Equal(1, history.GetArrayLength());
        var stats = await (await u.Client.GetAsync("/api/v1/stats/me?game=sudoku")).JsonAsync();
        Assert.Equal(HttpStatusCode.OK, (await u.Client.GetAsync("/api/v1/stats/me?game=sudoku")).StatusCode);
        Assert.Contains("sudoku", stats.GetRawText());
    }

    [Fact]
    public async Task Invalid_results_are_rejected_with_reason()
    {
        var u = await api.RegisterAsync("bad");
        var invalid = await u.Client.PostAsJsonAsync("/api/v1/sudoku/results", new { clientId = ClientId(), mode = "easy", outcome = "draw", durationMs = 1000 });
        Assert.Equal(HttpStatusCode.BadRequest, invalid.StatusCode);
        Assert.Equal("RESULT_REJECTED", (await invalid.JsonAsync()).Str("code"));

        var badOutcome = await u.Client.PostAsJsonAsync("/api/v1/caro/results", new { clientId = ClientId(), outcome = "maybe" });
        Assert.Equal("VALIDATION", (await badOutcome.JsonAsync()).Str("code"));

        // Rubik "thắng" nhưng lời giải không đưa khối về trạng thái giải → bị từ chối.
        var fake = await u.Client.PostAsJsonAsync("/api/v1/rubik/results", new
        {
            clientId = ClientId(), mode = "3x3", outcome = "win", durationMs = 60_000,
            details = new { scramble = "R U F", solution = "F' U'" },
        });
        Assert.Equal(HttpStatusCode.BadRequest, fake.StatusCode);
        Assert.Equal(0, await api.WithDbAsync(db => db.GameResults.CountAsync(r => r.UserId == u.Id)));
    }

    [Fact]
    public async Task Verified_rubik_win_counts_and_too_fast_win_is_not_rankable()
    {
        var u = await api.RegisterAsync("rk");
        var scramble = RubikVerifier.RandomScramble(20);
        var solution = string.Join(' ', scramble.Split(' ').Reverse().Select(m => m.EndsWith('\'') ? m[..1] : m.EndsWith('2') ? m : m + "'"));
        var ok = await u.Client.PostAsJsonAsync("/api/v1/rubik/results", new
        {
            clientId = ClientId(), mode = "3x3", outcome = "win", durationMs = 90_000, moves = 20, details = new { scramble, solution },
        });
        Assert.Equal(HttpStatusCode.Created, ok.StatusCode);
        Assert.True((await ok.JsonAsync()).GetProperty("result").GetProperty("rankable").GetBoolean());

        var fast = await u.Client.PostAsJsonAsync("/api/v1/rubik/results", new { clientId = ClientId(), mode = "3x3", outcome = "win", durationMs = 10 });
        var fastBody = await fast.JsonAsync();
        Assert.Equal(HttpStatusCode.Created, fast.StatusCode);
        Assert.False(fastBody.GetProperty("result").GetProperty("rankable").GetBoolean());
    }

    [Fact]
    public async Task Results_of_other_users_are_not_visible_in_my_history()
    {
        var a = await api.RegisterAsync("ha");
        var b = await api.RegisterAsync("hb");
        await a.Client.PostAsJsonAsync("/api/v1/caro/results", new { clientId = ClientId(), mode = "pvc", outcome = "draw", durationMs = 60_000 });
        var mine = await (await b.Client.GetAsync("/api/v1/caro/history")).JsonAsync();
        Assert.Equal(0, mine.GetArrayLength());
        Assert.Equal(HttpStatusCode.Unauthorized, (await api.CreateClient().GetAsync("/api/v1/caro/history")).StatusCode);
    }

    [Fact]
    public async Task Daily_challenge_is_deterministic_and_future_date_rejected()
    {
        var u = await api.RegisterAsync("daily");
        var d1 = await (await u.Client.GetAsync("/api/v1/sudoku/daily")).JsonAsync();
        var d2 = await (await u.Client.GetAsync("/api/v1/sudoku/daily")).JsonAsync();
        Assert.Equal(d1.GetRawText(), d2.GetRawText());
        var future = await u.Client.GetAsync("/api/v1/sudoku/daily?date=2099-01-01");
        Assert.Equal(HttpStatusCode.BadRequest, future.StatusCode);
        Assert.Equal("FUTURE_DATE", (await future.JsonAsync()).Str("code"));
    }
}
