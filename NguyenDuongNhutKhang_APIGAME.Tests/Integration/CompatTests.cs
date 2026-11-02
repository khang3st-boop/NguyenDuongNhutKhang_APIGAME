using System.Net;
using System.Net.Http.Json;
using Microsoft.EntityFrameworkCore;
using NguyenDuongNhutKhang_APIGAME.Tests.Infrastructure;

namespace NguyenDuongNhutKhang_APIGAME.Tests.Integration;

/// <summary>Endpoint tương thích app Flutter (giống server Java): /challenges, /chat/conversations, /presence/me, /reports.</summary>
[Collection(ApiCollection.Name)]
public class CompatTests(ApiFactory api)
{
    [Fact]
    public async Task Rubik_duel_verified_by_server_and_fastest_wins()
    {
        var a = await api.RegisterAsync("da");
        var b = await api.RegisterAsync("db");
        var c = await api.RegisterAsync("dc");

        var created = await a.Post("/api/v1/challenges", new { allowAssist = false, message = "chơi không?" }).Ok();
        var id = created.Str("id");
        Assert.Equal("OPEN", created.Str("status"));
        Assert.Equal(20, created.Str("scramble").Split(' ').Length);
        Assert.Contains((await b.Client.GetAsync("/api/v1/challenges/open").Ok()).EnumerateArray(), x => x.Str("id") == id);
        Assert.DoesNotContain((await a.Client.GetAsync("/api/v1/challenges/open").Ok()).EnumerateArray(), x => x.Str("id") == id);

        // Thách đấu mở: chỉ một người nhận được.
        Assert.Equal("ACCEPTED", (await b.Post($"/api/v1/challenges/{id}/accept").Ok()).Str("status"));
        Assert.Equal(HttpStatusCode.NotFound, (await c.Post($"/api/v1/challenges/{id}/accept")).StatusCode);

        var solution = Online.Inverse(created.Str("scramble"));
        // Lời giải sai hoặc quá nhanh bị server từ chối.
        var wrong = await b.Post($"/api/v1/challenges/{id}/submit", new { clientId = "b1", durationMs = 9000, moves = 1, solution = "R", assisted = false });
        Assert.Equal(HttpStatusCode.BadRequest, wrong.StatusCode);
        Assert.Equal("RESULT_REJECTED", (await wrong.JsonAsync()).Str("code"));
        Assert.Equal(HttpStatusCode.BadRequest,
            (await b.Post($"/api/v1/challenges/{id}/submit", new { clientId = "b1", durationMs = 500, moves = 20, solution, assisted = false })).StatusCode);

        await a.Post($"/api/v1/challenges/{id}/submit", new { clientId = "a1", durationMs = 40_000, moves = 20, solution, assisted = false }).Ok();
        var done = await b.Post($"/api/v1/challenges/{id}/submit", new { clientId = "b1", durationMs = 30_000, moves = 20, solution, assisted = false }).Ok();
        Assert.Equal("COMPLETED", done.Str("status"));
        Assert.Equal(b.Id.ToString(), done.Str("winnerId"));
        Assert.Equal(20, done.GetProperty("opponent").GetProperty("moves").GetInt32());
        // Gửi lại cùng lượt không đổi kết quả.
        var again = await b.Post($"/api/v1/challenges/{id}/submit", new { clientId = "b1", durationMs = 1_000_000, moves = 20, solution, assisted = false }).Ok();
        Assert.Equal(30_000, again.GetProperty("opponent").GetProperty("durationMs").GetInt64());

        Assert.Contains((await a.Client.GetAsync("/api/v1/challenges").Ok()).EnumerateArray(), x => x.Str("id") == id);
        Assert.Equal(HttpStatusCode.NotFound, (await c.Client.GetAsync($"/api/v1/challenges/{id}")).StatusCode);
        Assert.True(await api.WithDbAsync(db => db.DuelChallenges.AnyAsync(x => x.Id == Guid.Parse(id) && x.Status == "COMPLETED")));
    }

    [Fact]
    public async Task Targeted_duel_decline_and_assist_disqualifies()
    {
        var a = await api.RegisterAsync("ta");
        var b = await api.RegisterAsync("tb");
        var c = await api.RegisterAsync("tc");

        var d1 = await a.Post("/api/v1/challenges", new { opponentId = b.Id, allowAssist = false }).Ok();
        Assert.Equal(HttpStatusCode.NotFound, (await c.Post($"/api/v1/challenges/{d1.Str("id")}/accept")).StatusCode);
        Assert.Equal("DECLINED", (await b.Post($"/api/v1/challenges/{d1.Str("id")}/decline").Ok()).Str("status"));
        Assert.Equal(HttpStatusCode.Conflict, (await b.Post($"/api/v1/challenges/{d1.Str("id")}/accept")).StatusCode);

        var d2 = await a.Post("/api/v1/challenges", new { opponentId = b.Id, allowAssist = false }).Ok();
        var id = d2.Str("id");
        // Người được mời chưa nhận thì chưa được nộp.
        var solution = Online.Inverse(d2.Str("scramble"));
        Assert.Equal(HttpStatusCode.Conflict,
            (await b.Post($"/api/v1/challenges/{id}/submit", new { clientId = "x", durationMs = 9000, moves = 20, solution, assisted = false })).StatusCode);
        await b.Post($"/api/v1/challenges/{id}/accept").Ok();
        await a.Post($"/api/v1/challenges/{id}/submit", new { clientId = "a", durationMs = 5000, moves = 20, solution, assisted = true }).Ok();
        var done = await b.Post($"/api/v1/challenges/{id}/submit", new { clientId = "b", durationMs = 50_000, moves = 20, solution, assisted = false }).Ok();
        Assert.Equal(b.Id.ToString(), done.Str("winnerId")); // A nhanh hơn nhưng dùng trợ giúp khi bị cấm
        Assert.Equal(HttpStatusCode.BadRequest, (await a.Post("/api/v1/challenges", new { opponentId = a.Id })).StatusCode);
    }

    [Fact]
    public async Task Direct_chat_between_friends_with_unread_dedupe_and_block()
    {
        var a = await api.RegisterAsync("ca");
        var b = await api.RegisterAsync("cb");
        var s = await api.RegisterAsync("cs");

        // Chưa là bạn → không nhắn được.
        Assert.Equal(HttpStatusCode.Forbidden, (await a.Post($"/api/v1/chat/conversations/{b.Id}/messages", new { text = "hi" })).StatusCode);
        await a.Post("/api/v1/friends/requests", new { userId = b.Id }).Ok();
        await b.Post("/api/v1/friends/requests", new { userId = a.Id }).Ok();

        var m1 = await a.Post($"/api/v1/chat/conversations/{b.Id}/messages", new { text = "  chào\u0007 bạn ", clientId = "m1" }).Ok();
        Assert.Equal("chào bạn", m1.Str("text"));
        var dup = await a.Post($"/api/v1/chat/conversations/{b.Id}/messages", new { text = "chào bạn", clientId = "m1" }).Ok();
        Assert.Equal(m1.GetProperty("id").GetInt64(), dup.GetProperty("id").GetInt64());

        var convs = await b.Client.GetAsync("/api/v1/chat/conversations").Ok();
        var conv = Assert.Single(convs.EnumerateArray());
        Assert.Equal(a.Id.ToString(), conv.Str("userId"));
        Assert.Equal(1, conv.GetProperty("unread").GetInt32());
        Assert.Equal("chào bạn", conv.Str("lastMessage"));

        var msgs = await b.Client.GetAsync($"/api/v1/chat/conversations/{a.Id}/messages").Ok();
        Assert.Single(msgs.EnumerateArray());
        Assert.Equal(0, (await b.Client.GetAsync("/api/v1/chat/conversations").Ok())[0].GetProperty("unread").GetInt32());
        var lastId = m1.GetProperty("id").GetInt64();
        Assert.Empty((await b.Client.GetAsync($"/api/v1/chat/conversations/{a.Id}/messages?afterId={lastId}").Ok()).EnumerateArray());

        // Báo cáo kèm tin nhắn; tin không gửi cho mình → 404.
        Assert.Equal(HttpStatusCode.NoContent,
            (await b.Post("/api/v1/reports", new { userId = a.Id, reason = "spam tin nhắn", messageId = lastId })).StatusCode);
        Assert.Equal(HttpStatusCode.NotFound,
            (await s.Post("/api/v1/reports", new { userId = a.Id, reason = "spam tin nhắn", messageId = lastId })).StatusCode);
        Assert.True(await api.WithDbAsync(db => db.UserReports.AnyAsync(r => r.ReporterId == b.Id && r.Reason.StartsWith("[Tin nhắn riêng"))));

        await b.Post($"/api/v1/users/{a.Id}/block");
        Assert.Equal(HttpStatusCode.Forbidden, (await a.Post($"/api/v1/chat/conversations/{b.Id}/messages", new { text = "còn đó không" })).StatusCode);
        Assert.True((await b.Client.GetAsync("/api/v1/chat/conversations").Ok())[0].GetProperty("blocked").GetBoolean());
    }

    [Fact]
    public async Task Presence_ready_toggle_shows_in_lobby_and_pushes_event()
    {
        var a = await api.RegisterAsync("pa");
        var b = await api.RegisterAsync("pb");
        await a.Post("/api/v1/friends/requests", new { userId = b.Id }).Ok();
        await b.Post("/api/v1/friends/requests", new { userId = a.Id }).Ok();

        var events = new Online.EventSink();
        await using var hub = Online.Hub(api, b, events);
        await hub.StartAsync();

        var on = await a.Client.PutAsJsonAsync("/api/v1/presence/me", new { ready = true }).Ok();
        Assert.Equal("READY", on.Str("status"));
        Assert.Equal("READY", (await a.Client.GetAsync("/api/v1/presence/me").Ok()).Str("status"));
        var ev = await events.WaitAsync("presence");
        Assert.Equal(a.Id.ToString(), ev.GetProperty("data").Str("userId"));
        Assert.Equal("READY", ev.GetProperty("data").Str("status"));
        Assert.Contains((await b.Client.GetAsync("/api/v1/lobby").Ok()).EnumerateArray(),
            p => p.GetProperty("user").Str("id") == a.Id.ToString());
        await events.WaitAsync("lobby.updated");

        var off = await a.Client.PutAsJsonAsync("/api/v1/presence/me", new { ready = false }).Ok();
        Assert.NotEqual("READY", off.Str("status"));
        Assert.DoesNotContain((await b.Client.GetAsync("/api/v1/lobby").Ok()).EnumerateArray(),
            p => p.GetProperty("user").Str("id") == a.Id.ToString());
    }
}
