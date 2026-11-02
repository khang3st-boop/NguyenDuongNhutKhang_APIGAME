using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Client;
using Microsoft.AspNetCore.Http.Connections;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using NguyenDuongNhutKhang_APIGAME.Services;
using NguyenDuongNhutKhang_APIGAME.Tests.Infrastructure;

namespace NguyenDuongNhutKhang_APIGAME.Tests.Integration;

internal static class Online
{
    public static async Task<JsonElement> Ok(this Task<HttpResponseMessage> call)
    {
        var res = await call;
        var body = await res.JsonAsync();
        Assert.True(res.IsSuccessStatusCode, $"{(int)res.StatusCode}: {body}");
        return body;
    }

    public static Task<HttpResponseMessage> Post(this TestUser u, string path, object? body = null) =>
        u.Client.PostAsJsonAsync(path, body ?? new { });

    public static string Inverse(string scramble) => string.Join(' ', scramble.Split(' ', StringSplitOptions.RemoveEmptyEntries)
        .Reverse().Select(m => m.EndsWith('\'') ? m[..1] : m.EndsWith('2') ? m : m + "'"));

    public static HubConnection Hub(ApiFactory api, TestUser user, EventSink sink)
    {
        var hub = new HubConnectionBuilder()
            .WithUrl(new Uri(api.Server.BaseAddress, "/hubs/game"), o =>
            {
                o.Transports = HttpTransportType.LongPolling;
                o.HttpMessageHandlerFactory = _ => api.Server.CreateHandler();
                o.AccessTokenProvider = () => Task.FromResult<string?>(user.AccessToken);
            })
            .Build();
        hub.On<JsonElement>("event", sink.Add);
        return hub;
    }

    /// <summary>Gom sự kiện <c>event</c> của hub; chờ theo <c>type</c>.</summary>
    public sealed class EventSink
    {
        private readonly List<JsonElement> _seen = [];
        private readonly List<(string Type, TaskCompletionSource<JsonElement> Tcs)> _waiters = [];

        public void Add(JsonElement e)
        {
            var type = e.GetProperty("type").GetString()!;
            lock (_seen)
            {
                // Đã có người chờ → giao luôn, không giữ lại (cùng ngữ nghĩa "lấy ra" như WaitAsync).
                var waiters = _waiters.Where(w => w.Type == type).ToList();
                if (waiters.Count == 0) _seen.Add(e.Clone());
                foreach (var w in waiters)
                {
                    _waiters.Remove(w);
                    w.Tcs.TrySetResult(e.Clone());
                }
            }
        }

        public bool Seen(string type)
        {
            lock (_seen) return _seen.Any(e => e.GetProperty("type").GetString() == type);
        }

        public Task<JsonElement> WaitAsync(string type, int seconds = 10)
        {
            var tcs = new TaskCompletionSource<JsonElement>(TaskCreationOptions.RunContinuationsAsynchronously);
            lock (_seen)
            {
                var hit = _seen.FindIndex(e => e.GetProperty("type").GetString() == type);
                if (hit >= 0)
                {
                    var e = _seen[hit];
                    _seen.RemoveAt(hit);
                    return Task.FromResult(e);
                }
                _waiters.Add((type, tcs));
            }
            return tcs.Task.WaitAsync(TimeSpan.FromSeconds(seconds));
        }
    }

    /// <summary>Tạo trận caro qua lời mời và đưa về PLAYING (tua đồng hồ giả qua 3 giây đếm ngược).</summary>
    public static async Task<(string Id, TestUser X, TestUser O)> StartCaroAsync(ApiFactory api, TestUser a, TestUser b)
    {
        var inv = await a.Post("/api/v1/challenges/invites", new { userId = b.Id, game = "caro", mode = "15x15" }).Ok();
        var acc = await b.Post($"/api/v1/challenges/invites/{inv.Str("id")}/accept").Ok();
        var id = acc.Str("matchId");
        await a.Post($"/api/v1/matches/{id}/ready").Ok();
        var m = await b.Post($"/api/v1/matches/{id}/ready").Ok();
        Assert.Equal("COUNTDOWN", m.Str("status"));
        api.Clock.Advance(TimeSpan.FromSeconds(3.5));
        var x = m.GetProperty("config").Str("x") == a.Id.ToString() ? a : b;
        return (id, x, x == a ? b : a);
    }
}

[Collection(ApiCollection.Name)]
public class OnlineTests(ApiFactory api)
{
    [Fact]
    public async Task Friend_request_accept_then_block_removes_friendship()
    {
        var a = await api.RegisterAsync("fa");
        var b = await api.RegisterAsync("fb");
        Assert.Equal("PENDING", (await a.Post("/api/v1/friends/requests", new { userId = b.Id }).Ok()).Str("status"));
        // B gửi ngược lại → tự thành bạn.
        Assert.Equal("ACCEPTED", (await b.Post("/api/v1/friends/requests", new { userId = a.Id }).Ok()).Str("status"));
        Assert.Equal(1, (await a.Client.GetAsync("/api/v1/friends").Ok()).GetArrayLength());

        Assert.Equal(HttpStatusCode.NoContent, (await b.Post($"/api/v1/users/{a.Id}/block")).StatusCode);
        Assert.Equal(0, (await a.Client.GetAsync("/api/v1/friends").Ok()).GetArrayLength());
        Assert.Equal(HttpStatusCode.NotFound, (await a.Post("/api/v1/friends/requests", new { userId = b.Id })).StatusCode);
        Assert.True(await api.WithDbAsync(db => db.UserBlocks.AnyAsync(x => x.BlockerId == b.Id && x.BlockedId == a.Id)));
    }

    [Fact]
    public async Task Invite_caro_match_is_played_to_a_win_and_rated()
    {
        var a = await api.RegisterAsync("ca");
        var b = await api.RegisterAsync("cb");
        var (id, x, o) = await Online.StartCaroAsync(api, a, b);

        Assert.Equal(HttpStatusCode.Conflict, (await o.Post($"/api/v1/matches/{id}/caro/move", new { cell = 100, index = 0 })).StatusCode);
        JsonElement m = default;
        for (var i = 0; i < 9; i++)
            m = await (i % 2 == 0 ? x : o).Post($"/api/v1/matches/{id}/caro/move", new { cell = i % 2 == 0 ? i / 2 : 30 + i / 2, index = i }).Ok();
        // Gửi lại đúng nước cuối (mạng chập chờn) → không lỗi, không nhân đôi.
        var retry = await x.Post($"/api/v1/matches/{id}/caro/move", new { cell = 4, index = 8 });
        Assert.NotEqual(HttpStatusCode.InternalServerError, retry.StatusCode);

        Assert.Equal("FINISHED", m.Str("status"));
        Assert.Equal("CARO_WIN", m.Str("endReason"));
        Assert.Equal(x.Id.ToString(), m.Str("winnerId"));
        Assert.True(m.GetProperty("rated").GetBoolean());

        var stored = await api.WithDbAsync(db => db.MatchResults.AsNoTracking().Where(r => r.MatchRoomId == Guid.Parse(id)).ToListAsync());
        Assert.Equal(2, stored.Count);
        var board = await (await api.CreateClient().GetAsync("/api/v1/leaderboards/online?game=caro")).JsonAsync();
        Assert.Contains(board.EnumerateArray(), e => e.GetProperty("user").Str("id") == x.Id.ToString() && e.GetProperty("rating").GetInt32() > 1200);
        // Trận online không ghi vào GameResults (kết quả offline giữ nguyên).
        Assert.Equal(0, await api.WithDbAsync(db => db.GameResults.CountAsync(r => r.UserId == x.Id)));
    }

    [Fact]
    public async Task Four_player_room_with_code_and_server_verified_finish()
    {
        var p = new[] { await api.RegisterAsync("r1"), await api.RegisterAsync("r2"), await api.RegisterAsync("r3"), await api.RegisterAsync("r4") };
        var room = await p[0].Post("/api/v1/rooms", new { game = "rubik", mode = "3x3", capacity = 4 }).Ok();
        var code = room.Str("roomCode");
        for (var i = 1; i < 4; i++) room = await p[i].Post("/api/v1/rooms/join", new { code }).Ok();
        Assert.Equal(4, room.GetProperty("players").GetArrayLength());
        Assert.Equal(HttpStatusCode.Conflict, (await (await api.RegisterAsync("r5")).Post("/api/v1/rooms/join", new { code })).StatusCode);

        var id = room.Str("id");
        foreach (var u in p) room = await u.Post($"/api/v1/matches/{id}/ready").Ok();
        api.Clock.Advance(TimeSpan.FromSeconds(3.5));
        var scramble = room.GetProperty("config").Str("scramble");

        var wrong = await p[1].Post($"/api/v1/matches/{id}/finish", new { solution = "R U R'" });
        Assert.Equal("RESULT_REJECTED", (await wrong.JsonAsync()).Str("code"));

        api.Clock.Advance(TimeSpan.FromSeconds(30));
        await p[1].Post($"/api/v1/matches/{id}/finish", new { solution = Online.Inverse(scramble) }).Ok();
        await p[2].Post($"/api/v1/matches/{id}/forfeit").Ok();
        await p[3].Post($"/api/v1/matches/{id}/assist").Ok();
        var end = await p[0].Client.GetAsync($"/api/v1/matches/{id}").Ok();

        Assert.Equal("FINISHED", end.Str("status"));
        Assert.Equal(p[1].Id.ToString(), end.Str("winnerId"));
        Assert.False(end.GetProperty("rated").GetBoolean()); // phòng tự tạo / 4 người không tính điểm online
        var ranks = end.GetProperty("players").EnumerateArray().ToDictionary(x => x.GetProperty("user").Str("id"), x => x.GetProperty("rank").GetInt32());
        Assert.Equal(1, ranks[p[1].Id.ToString()]);
    }

    [Fact]
    public async Task Concurrent_joins_for_last_seat_admit_exactly_one_player()
    {
        var host = await api.RegisterAsync("host");
        var room = await host.Post("/api/v1/rooms", new { game = "puzzle", mode = "3x3", capacity = 2 }).Ok();
        var racers = await Task.WhenAll(Enumerable.Range(0, 5).Select(i => api.RegisterAsync("race" + i)));
        var responses = await Task.WhenAll(racers.Select(r => r.Post("/api/v1/rooms/join", new { code = room.Str("roomCode") })));

        Assert.Equal(1, responses.Count(r => r.StatusCode == HttpStatusCode.OK));
        Assert.All(responses.Where(r => r.StatusCode != HttpStatusCode.OK), r => Assert.Equal(HttpStatusCode.Conflict, r.StatusCode));
        Assert.Equal(2, await api.WithDbAsync(db => db.MatchParticipants.CountAsync(x => x.MatchRoomId == Guid.Parse(room.Str("id")))));
    }

    [Fact]
    public async Task Invite_lifecycle_decline_cancel_and_busy_target()
    {
        var a = await api.RegisterAsync("ia");
        var b = await api.RegisterAsync("ib");
        var c = await api.RegisterAsync("ic");
        var inv = await a.Post("/api/v1/challenges/invites", new { userId = b.Id, game = "sudoku", mode = "easy" }).Ok();
        Assert.Equal("DECLINED", (await b.Post($"/api/v1/challenges/invites/{inv.Str("id")}/decline").Ok()).Str("status"));
        Assert.Equal(HttpStatusCode.Conflict, (await b.Post($"/api/v1/challenges/invites/{inv.Str("id")}/accept")).StatusCode);

        var inv2 = await a.Post("/api/v1/challenges/invites", new { userId = b.Id, game = "sudoku", mode = "easy" }).Ok();
        Assert.Equal("CANCELLED", (await a.Post($"/api/v1/challenges/invites/{inv2.Str("id")}/cancel").Ok()).Str("status"));

        // B đang trong trận → C mời B bị từ chối TARGET_BUSY.
        var inv3 = await a.Post("/api/v1/challenges/invites", new { userId = b.Id, game = "sudoku", mode = "easy" }).Ok();
        await b.Post($"/api/v1/challenges/invites/{inv3.Str("id")}/accept").Ok();
        var busy = await c.Post("/api/v1/challenges/invites", new { userId = b.Id, game = "caro", mode = "15x15" });
        Assert.Equal(HttpStatusCode.Conflict, busy.StatusCode);
        Assert.Equal("TARGET_BUSY", (await busy.JsonAsync()).Str("code"));

        var bad = await c.Post("/api/v1/challenges/invites", new { userId = a.Id, game = "chess", mode = "x" });
        Assert.Equal(HttpStatusCode.BadRequest, bad.StatusCode);
    }

    [Fact]
    public async Task Chat_rate_limit_dedupe_and_blocked_sender_hidden()
    {
        var a = await api.RegisterAsync("cha");
        var b = await api.RegisterAsync("chb");
        var inv = await a.Post("/api/v1/challenges/invites", new { userId = b.Id, game = "puzzle", mode = "4x4" }).Ok();
        var id = (await b.Post($"/api/v1/challenges/invites/{inv.Str("id")}/accept").Ok()).Str("matchId");

        var m1 = await a.Post($"/api/v1/matches/{id}/messages", new { text = "chào\u0007 bạn", clientId = "k1" }).Ok();
        Assert.Equal("chào bạn", m1.Str("text").Replace("  ", " ")); // ký tự điều khiển bị lọc
        var dup = await a.Post($"/api/v1/matches/{id}/messages", new { text = "chào bạn", clientId = "k1" }).Ok();
        Assert.Equal(m1.GetProperty("id").GetInt64(), dup.GetProperty("id").GetInt64());

        var codes = new List<HttpStatusCode>();
        for (var i = 0; i < 6; i++) codes.Add((await a.Post($"/api/v1/matches/{id}/messages", new { text = "spam " + i })).StatusCode);
        Assert.Contains((HttpStatusCode)429, codes);

        Assert.True((await b.Client.GetAsync($"/api/v1/matches/{id}/messages").Ok()).GetArrayLength() >= 1);
        await b.Post($"/api/v1/users/{a.Id}/block");
        Assert.Equal(0, (await b.Client.GetAsync($"/api/v1/matches/{id}/messages").Ok()).GetArrayLength());

        var outsider = await api.RegisterAsync("cho");
        Assert.Equal(HttpStatusCode.NotFound, (await outsider.Client.GetAsync($"/api/v1/matches/{id}/messages")).StatusCode);
    }

    [Fact]
    public async Task Matchmaking_pairs_same_game_mode_and_region_only()
    {
        var a = await api.RegisterAsync("ma");
        var b = await api.RegisterAsync("mb");
        var c = await api.RegisterAsync("mc");
        await a.Post("/api/v1/matchmaking/queue", new { game = "sudoku", mode = "hard", region = "VN-N" }).Ok();
        await c.Post("/api/v1/matchmaking/queue", new { game = "sudoku", mode = "easy", region = "VN-N" }).Ok();
        await b.Post("/api/v1/matchmaking/queue", new { game = "sudoku", mode = "hard", region = "VN-N" }).Ok();

        await api.WithScopeAsync(sp => sp.GetRequiredService<MatchmakingService>().PairAsync());

        var match = await a.Client.GetAsync("/api/v1/matches/active").Ok();
        Assert.Equal("QUEUE", match.Str("source"));
        var ids = match.GetProperty("players").EnumerateArray().Select(p => p.GetProperty("user").Str("id")).ToHashSet();
        Assert.Equal(new HashSet<string> { a.Id.ToString(), b.Id.ToString() }, ids);
        Assert.Equal(HttpStatusCode.NoContent, (await c.Client.GetAsync("/api/v1/matches/active")).StatusCode);
        Assert.Equal(HttpStatusCode.OK, (await c.Client.GetAsync("/api/v1/matchmaking/queue")).StatusCode);
        await c.Client.DeleteAsync("/api/v1/matchmaking/queue");
    }

    [Fact]
    public async Task Hub_requires_token_and_pushes_invite_and_match_events()
    {
        var a = await api.RegisterAsync("ha");
        var b = await api.RegisterAsync("hb");

        var anon = await api.CreateClient().PostAsync("/hubs/game/negotiate?negotiateVersion=1", null);
        Assert.Equal(HttpStatusCode.Unauthorized, anon.StatusCode);

        var events = new Online.EventSink();
        await using var hub = Online.Hub(api, b, events);
        await hub.StartAsync();
        Assert.True((await hub.InvokeAsync<DateTime>("Ping")) > DateTime.MinValue);

        var inv = await a.Post("/api/v1/challenges/invites", new { userId = b.Id, game = "rubik", mode = "3x3" }).Ok();
        // Phong bì giống server Java: {type, data, matchId, ts}.
        var got = await events.WaitAsync("invite.received");
        Assert.Equal(inv.Str("id"), got.GetProperty("data").GetProperty("id").GetString());
        Assert.True(got.GetProperty("ts").GetDateTime() > DateTime.MinValue);

        await b.Post($"/api/v1/challenges/invites/{inv.Str("id")}/accept").Ok();
        var created = await events.WaitAsync("match.created");
        var ms = created.GetProperty("data");
        Assert.Equal("WAITING_READY", ms.GetProperty("status").GetString());
        Assert.Equal(ms.GetProperty("id").GetString(), created.GetProperty("matchId").GetString());
        Assert.Equal("ACCEPTED", (await events.WaitAsync("invite.accepted")).GetProperty("data").Str("status"));

        // Sẵn sàng qua hub (app Flutter gửi match.ready) → match.state.
        var matchId = Guid.Parse(ms.GetProperty("id").GetString()!);
        var ready = await hub.InvokeAsync<JsonElement>("Ready", matchId, true);
        Assert.Contains(ready.GetProperty("players").EnumerateArray(), p => p.GetProperty("ready").GetBoolean());
        await events.WaitAsync("match.state");

        // Gửi chat qua hub; lỗi nghiệp vụ trả HubException có mã.
        var msg = await hub.InvokeAsync<JsonElement>("SendChat", Guid.Parse(ms.GetProperty("id").GetString()!), "xin chào", "hub-1");
        Assert.Equal("xin chào", msg.GetProperty("text").GetString());
        var err = await Assert.ThrowsAsync<HubException>(() => hub.InvokeAsync<JsonElement>("SendChat", Guid.NewGuid(), "x", null));
        Assert.StartsWith("NOT_FOUND", err.Message.Split(':')[^2].Trim().Split(' ')[^1]);
    }
}

/// <summary>Các trường hợp phụ thuộc thời gian dùng database và đồng hồ giả riêng (không ảnh hưởng test khác).</summary>
public class TimeoutTests : IAsyncLifetime
{
    private readonly ApiFactory api = new();

    public Task InitializeAsync() => api.InitializeAsync();
    public Task DisposeAsync() => ((IAsyncLifetime)api).DisposeAsync();

    private Task TickAsync() => api.WithScopeAsync(async sp =>
    {
        await sp.GetRequiredService<InviteService>().ExpireAsync(CancellationToken.None);
        await sp.GetRequiredService<MatchService>().TickAsync(CancellationToken.None);
    });

    [Fact]
    public async Task Ready_invite_and_caro_turn_timeouts_are_enforced_by_server()
    {
        // Đăng ký mọi tài khoản trước khi tua đồng hồ (token JWT được ký theo đồng hồ của server).
        var u = new List<TestUser>();
        for (var i = 0; i < 6; i++) u.Add(await api.RegisterAsync("t" + i));

        // 1) Lời mời hết hạn sau 60 giây.
        var inv = await u[0].Post("/api/v1/challenges/invites", new { userId = u[1].Id, game = "caro", mode = "15x15" }).Ok();
        // 2) Trận đủ người nhưng không ai bấm Sẵn sàng.
        var inv2 = await u[2].Post("/api/v1/challenges/invites", new { userId = u[3].Id, game = "rubik", mode = "3x3" }).Ok();
        var idle = (await u[3].Post($"/api/v1/challenges/invites/{inv2.Str("id")}/accept").Ok()).Str("matchId");
        // 3) Caro: X đi một nước rồi O không đi trong 30 giây.
        var (caro, x, o) = await Online.StartCaroAsync(api, u[4], u[5]);
        await x.Post($"/api/v1/matches/{caro}/caro/move", new { cell = 112, index = 0 }).Ok();

        api.Clock.Advance(TimeSpan.FromSeconds(31));
        await TickAsync();
        var caroEnd = await o.Client.GetAsync($"/api/v1/matches/{caro}").Ok();
        Assert.Equal("FINISHED", caroEnd.Str("status"));
        Assert.Equal("TIMEOUT", caroEnd.Str("endReason"));
        Assert.Equal(x.Id.ToString(), caroEnd.Str("winnerId"));

        api.Clock.Advance(TimeSpan.FromSeconds(31));
        await TickAsync();
        Assert.Equal("EXPIRED", (await u[0].Client.GetAsync("/api/v1/challenges/invites").Ok()).EnumerateArray()
            .Select(e => e.Str("status")).DefaultIfEmpty("EXPIRED").First());
        Assert.Equal(HttpStatusCode.Conflict, (await u[1].Post($"/api/v1/challenges/invites/{inv.Str("id")}/accept")).StatusCode);
        var idleEnd = await u[2].Client.GetAsync($"/api/v1/matches/{idle}").Ok();
        Assert.Equal("CANCELLED", idleEnd.Str("status"));
        Assert.Equal("READY_TIMEOUT", idleEnd.Str("endReason"));

        // 4) Chat đóng 10 phút sau khi trận kết thúc.
        api.Clock.Advance(TimeSpan.FromMinutes(11));
        var closed = await x.Post($"/api/v1/matches/{caro}/messages", new { text = "gg" });
        Assert.Equal(HttpStatusCode.Conflict, closed.StatusCode);
        Assert.Equal("CHAT_CLOSED", (await closed.JsonAsync()).Str("code"));
    }

    [Fact]
    public async Task Countdown_end_pushes_playing_and_decline_only_notifies_inviter()
    {
        var a = await api.RegisterAsync("cd_a");
        var b = await api.RegisterAsync("cd_b");
        var ea = new Online.EventSink();
        var eb = new Online.EventSink();
        await using var ha = Online.Hub(api, a, ea);
        await using var hb = Online.Hub(api, b, eb);
        await ha.StartAsync();
        await hb.StartAsync();

        // Từ chối: chỉ người mời nhận invite.declined.
        var inv = await a.Post("/api/v1/challenges/invites", new { userId = b.Id, game = "rubik", mode = "3x3" }).Ok();
        await eb.WaitAsync("invite.received");
        await b.Post($"/api/v1/challenges/invites/{inv.Str("id")}/decline").Ok();
        await ea.WaitAsync("invite.declined");

        // Mời lại → chấp nhận → cả hai sẵn sàng → COUNTDOWN.
        var inv2 = await a.Post("/api/v1/challenges/invites", new { userId = b.Id, game = "rubik", mode = "3x3" }).Ok();
        await eb.WaitAsync("invite.received");
        Assert.False(eb.Seen("invite.declined"));
        var id = (await b.Post($"/api/v1/challenges/invites/{inv2.Str("id")}/accept").Ok()).Str("matchId");
        await a.Post($"/api/v1/matches/{id}/ready").Ok();
        Assert.Equal("COUNTDOWN", (await b.Post($"/api/v1/matches/{id}/ready").Ok()).Str("status"));
        await TickAsync(); // nhịp trong lúc đếm ngược: chưa báo PLAYING

        // Hết đếm ngược → nhịp dọn dẹp đẩy match.state PLAYING cho cả hai.
        api.Clock.Advance(TimeSpan.FromSeconds(3.5));
        await TickAsync();
        foreach (var sink in new[] { ea, eb })
        {
            JsonElement ev;
            do ev = await sink.WaitAsync("match.state");
            while (ev.GetProperty("data").Str("status") != "PLAYING");
            Assert.Equal(id, ev.GetProperty("matchId").GetString());
        }

        // Nhịp sau không báo lại.
        await TickAsync();
        await Task.Delay(300);
        Assert.False(ea.Seen("match.state"));
    }
}
