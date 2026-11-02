using System.Security.Cryptography;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using NguyenDuongNhutKhang_APIGAME.Data;
using NguyenDuongNhutKhang_APIGAME.DTOs;
using NguyenDuongNhutKhang_APIGAME.Helpers;
using NguyenDuongNhutKhang_APIGAME.Interfaces;
using NguyenDuongNhutKhang_APIGAME.Models;
using NguyenDuongNhutKhang_APIGAME.Repositories;

namespace NguyenDuongNhutKhang_APIGAME.Services;

/// <summary>
/// Trận online 2/4 người. Server là nguồn trạng thái: sinh đề, đo thời gian, kiểm tra lời giải, xếp hạng.
/// Luồng: WAITING_READY → (đủ người + mọi người sẵn sàng) → COUNTDOWN 3 giây → PLAYING → FINISHED | CANCELLED.
/// Mọi thay đổi phòng dùng khoá lạc quan (RowVersion) + thử lại để hai yêu cầu đồng thời không ghi đè nhau.
/// Trận online không ghi vào GameResults (app Flutter tự lưu kết quả cá nhân) — tránh nhân đôi thống kê.
/// </summary>
public class MatchService(
    AppDbContext db, OnlineRepository repo, IUserService users, PresenceTracker presence,
    RealtimeNotifier notifier, MatchTickState tickState, TimeProvider clock, ILogger<MatchService> logger) : IMatchService
{
    public static readonly TimeSpan ReadyWindow = TimeSpan.FromSeconds(60);
    public static readonly TimeSpan Countdown = TimeSpan.FromSeconds(3);
    public static readonly TimeSpan CaroTurn = TimeSpan.FromSeconds(30);
    public static readonly TimeSpan StaleRoom = TimeSpan.FromMinutes(30);
    public static readonly TimeSpan ChatAfterEnd = TimeSpan.FromMinutes(10);

    private static readonly Dictionary<string, long> MinFinishMs = new()
    {
        [GameIds.Rubik] = 3_000, [GameIds.Sudoku] = 15_000, [GameIds.Puzzle] = 2_000, [GameIds.Caro] = 0,
    };

    private DateTime Now => clock.GetUtcNow().UtcDateTime;

    // ================================================================== phòng chờ

    public async Task<OnlineMatchDto> CreateRoomAsync(Guid me, CreateRoomRequest req)
    {
        Validate(req.Game, req.Mode, req.Capacity);
        await EnsureFreeAsync(me);
        var room = await NewMatchAsync(req.Game, req.Mode, req.Capacity, MatchSource.Room, [me]);
        return await PublishAsync(room);
    }

    public async Task<OnlineMatchDto> JoinRoomAsync(Guid me, string code)
    {
        code = code.Trim().ToUpperInvariant();
        var id = await db.MatchRooms.Where(r => r.Code == code && r.Source == MatchSource.Room && r.Status == MatchStatus.Waiting)
                     .OrderByDescending(r => r.CreatedAt).Select(r => (Guid?)r.Id).FirstOrDefaultAsync()
                 ?? throw AppException.NotFound("Không tìm thấy phòng (mã sai hoặc phòng đã bắt đầu).");
        var room = await JoinAsync(me, id);
        return await PublishAsync(room);
    }

    /// <summary>Thêm người vào phòng chờ (dùng cho nhập mã và chấp nhận lời mời vào phòng).</summary>
    internal async Task<MatchRoom> JoinAsync(Guid me, Guid roomId)
    {
        var current = await repo.ActiveMatchIdAsync(me);
        if (current == roomId) return await LoadAsync(roomId) ?? throw AppException.NotFound("Không tìm thấy phòng.");
        if (current != null) throw AppException.Conflict("Bạn đang ở trong một trận khác.", "ALREADY_IN_MATCH");

        return await MutateAsync(roomId, (room, now) =>
        {
            if (room.Status != MatchStatus.Waiting) throw AppException.Conflict("Phòng đã bắt đầu hoặc đã đóng.", "ROOM_CLOSED");
            if (room.Participants.Count >= room.Capacity) throw AppException.Conflict("Phòng đã đủ người.", "ROOM_FULL");
            var seat = Enumerable.Range(0, room.Capacity).First(s => room.Participants.All(p => p.Seat != s));
            // Id Guid đã có sẵn → phải Add qua DbSet, nếu không EF coi là hàng cũ và sinh UPDATE (0 dòng → lỗi concurrency).
            var joined = new MatchParticipant { MatchRoomId = room.Id, UserId = me, Seat = seat, JoinedAt = now };
            db.MatchParticipants.Add(joined); // fixup của EF tự gắn vào room.Participants
            if (!room.Participants.Contains(joined)) room.Participants.Add(joined);
            if (room.Participants.Count == room.Capacity) room.ReadyDeadline = now + ReadyWindow;
            return true;
        }, checkBlocked: me);
    }

    /// <summary>Tạo trận mới với đề do server sinh. Đủ người ngay (lời mời / ghép nhanh) → bắt đầu đếm hạn sẵn sàng.</summary>
    internal async Task<MatchRoom> NewMatchAsync(string game, string mode, int capacity, string source, IReadOnlyList<Guid> players)
    {
        var now = Now;
        var room = new MatchRoom
        {
            Code = await NewCodeAsync(), Game = game, Mode = mode, Capacity = capacity, Source = source,
            HostId = players[0], ConfigJson = JsonSerializer.Serialize(NewConfig(game, mode, players[0])),
            AssistLocked = true, CreatedAt = now,
            ReadyDeadline = players.Count == capacity ? now + ReadyWindow : null,
        };
        for (var i = 0; i < players.Count; i++)
            room.Participants.Add(new MatchParticipant { UserId = players[i], Seat = i, JoinedAt = now });
        db.MatchRooms.Add(room);
        await db.SaveChangesAsync();
        return room;
    }

    private static Dictionary<string, object> NewConfig(string game, string mode, Guid seat0) => game switch
    {
        GameIds.Rubik => new() { ["scramble"] = RubikVerifier.RandomScramble(20) },
        GameIds.Sudoku => new() { ["puzzle"] = SudokuGenerator.Generate(mode).Puzzle, ["difficulty"] = mode },
        GameIds.Puzzle => new()
        {
            ["image"] = OnlineModes.PuzzleArts[RandomNumberGenerator.GetInt32(OnlineModes.PuzzleArts.Length)],
            ["level"] = mode, ["seed"] = RandomNumberGenerator.GetInt32(1, int.MaxValue),
        },
        _ => new() { ["x"] = seat0.ToString() },
    };

    private async Task<string> NewCodeAsync()
    {
        for (var i = 0; i < 10; i++)
        {
            var code = CodeGenerator.New(6);
            if (!await db.MatchRooms.AnyAsync(r => r.Code == code && (r.Status == MatchStatus.Waiting || r.Status == MatchStatus.Playing)))
                return code;
        }
        throw AppException.Conflict("Không tạo được mã phòng, vui lòng thử lại.", "CODE_EXHAUSTED");
    }

    internal static void Validate(string game, string mode, int capacity)
    {
        if (!OnlineModes.IsValid(game, mode)) throw AppException.BadRequest("Game hoặc chế độ chơi online không hợp lệ.", "INVALID_MODE");
        if (!OnlineModes.CapacityAllowed(game, capacity)) throw AppException.BadRequest("Số người chơi không hợp lệ (Caro chỉ 2 người; game khác 2 hoặc 4).", "INVALID_CAPACITY");
    }

    internal async Task EnsureFreeAsync(Guid user)
    {
        if (await repo.ActiveMatchIdAsync(user) != null) throw AppException.Conflict("Bạn đang ở trong một trận khác.", "ALREADY_IN_MATCH");
    }

    // ================================================================== đọc

    public async Task<OnlineMatchDto?> ActiveAsync(Guid me)
    {
        var id = await repo.ActiveMatchIdAsync(me);
        return id == null ? null : await ToDtoAsync(await LoadAsync(id.Value, noTracking: true) ?? throw AppException.NotFound());
    }

    public async Task<OnlineMatchDto> GetAsync(Guid me, Guid id)
    {
        var room = await LoadAsync(id, noTracking: true);
        if (room == null || room.Participants.All(p => p.UserId != me)) throw AppException.NotFound("Không tìm thấy trận đấu.");
        return await ToDtoAsync(room);
    }

    public async Task<List<OnlineMatchDto>> MineAsync(Guid me, int limit)
    {
        var rooms = await db.MatchRooms.AsNoTracking().Include(r => r.Participants)
            .Where(r => r.Participants.Any(p => p.UserId == me))
            .OrderByDescending(r => r.CreatedAt).Take(limit).AsSplitQuery().ToListAsync();
        return await ToDtosAsync(rooms);
    }

    // ================================================================== trong trận

    public async Task<OnlineMatchDto> ReadyAsync(Guid me, Guid id, bool ready) =>
        await PublishAsync(await MutateAsync(id, me, (room, p, now) =>
        {
            if (room.Status != MatchStatus.Waiting) throw AppException.Conflict("Trận đã bắt đầu hoặc đã kết thúc.", "NOT_WAITING");
            if (p.Ready == ready) return false;
            p.Ready = ready;
            if (room.Participants.Count == room.Capacity && room.Participants.All(x => x.Ready))
            {
                room.Status = MatchStatus.Playing;
                room.StartedAt = now + Countdown;
                room.ReadyDeadline = null;
                if (room.Game == GameIds.Caro) room.TurnDeadline = room.StartedAt + CaroTurn;
            }
            return true;
        }));

    public async Task ProgressAsync(Guid me, Guid id, int progress)
    {
        var room = await MutateAsync(id, me, (room, p, now) =>
        {
            EnsurePlaying(room, now);
            if (p.Forfeited || p.FinishedAt != null) return false;
            var value = Math.Clamp(progress, 0, 99); // 100% chỉ khi server xác nhận lời giải
            if (value == p.Progress) return false;
            p.Progress = value;
            return true;
        });
        await PublishAsync(room);
    }

    /// <summary>Báo đã dùng trợ giúp. Trận online khoá trợ giúp → bị loại (DISQUALIFIED).</summary>
    public async Task<OnlineMatchDto> AssistAsync(Guid me, Guid id) =>
        await PublishAsync(await MutateAsync(id, me, (room, p, now) =>
        {
            EnsurePlaying(room, now);
            if (p.Forfeited || p.FinishedAt != null) return false;
            Disqualify(room, p, now);
            return true;
        }));

    public async Task<OnlineMatchDto> FinishAsync(Guid me, Guid id, FinishMatchRequest req) =>
        await PublishAsync(await MutateAsync(id, me, (room, p, now) =>
        {
            if (room.Game == GameIds.Caro) throw AppException.BadRequest("Caro kết thúc theo nước đi, không dùng /finish.", "WRONG_GAME");
            EnsurePlaying(room, now);
            if (p.Forfeited) throw AppException.Conflict("Bạn đã bị loại / bỏ cuộc trong trận này.", "OUT");
            if (p.FinishedAt != null) return false; // gửi lại → trả trạng thái hiện tại
            if (req.Assisted)
            {
                Disqualify(room, p, now);
                return true;
            }

            var config = Config(room);
            var (ok, moves) = room.Game switch
            {
                GameIds.Rubik => (req.Solution != null && RubikVerifier.Solves(Str(config, "scramble"), req.Solution),
                                  RubikVerifier.Parse(req.Solution)?.Count ?? 0),
                GameIds.Sudoku => (req.Grid != null && SudokuVerifier.IsValidSolution(req.Grid) && SudokuVerifier.MatchesGivens(Str(config, "puzzle"), req.Grid), 0),
                _ => (PuzzleOk(room.Mode, req.Drops, (long)(now - room.StartedAt!.Value).TotalMilliseconds), req.Drops?.Count ?? 0),
            };
            if (!ok) throw AppException.BadRequest("Lời giải không hợp lệ — server kiểm tra không khớp với đề.", "RESULT_REJECTED");

            var elapsed = (long)(now - room.StartedAt!.Value).TotalMilliseconds;
            p.FinishedAt = now;
            p.FinishTimeMs = elapsed;
            p.Moves = moves;
            p.Progress = 100;
            p.Verified = elapsed >= MinFinishMs[room.Game]; // nhanh bất thường → không tính xếp hạng
            room.WinnerId ??= me;
            EndIfDecided(room, now, EndReasons.Solved);
            return true;
        }));

    public async Task<OnlineMatchDto> CaroMoveAsync(Guid me, Guid id, int cell, int index) =>
        await PublishAsync(await MutateAsync(id, me, (room, p, now) =>
        {
            if (room.Game != GameIds.Caro) throw AppException.BadRequest("Chỉ trận Caro mới có nước đi.", "WRONG_GAME");
            EnsurePlaying(room, now);
            var moves = JsonSerializer.Deserialize<List<int>>(room.CaroMovesJson) ?? [];
            if (index < moves.Count && moves[index] == cell) return false; // gửi trùng
            if (index != moves.Count) throw AppException.Conflict("Bàn cờ đã thay đổi, hãy tải lại trạng thái.", "STALE_MOVE");
            if (p.Seat != moves.Count % 2) throw AppException.Conflict("Chưa tới lượt của bạn.", "NOT_YOUR_TURN");
            var board = CaroRules.Board(moves);
            if (cell is < 0 or >= CaroRules.Cells || board[cell] != 0) throw AppException.BadRequest("Ô này đã có quân.", "CELL_TAKEN");

            moves.Add(cell);
            board[cell] = p.Seat == 0 ? 1 : 2;
            room.CaroMovesJson = JsonSerializer.Serialize(moves);
            p.Moves = (p.Moves ?? 0) + 1;
            if (CaroRules.IsWin(board, cell))
            {
                room.WinnerId = me;
                Finalize(room, now, EndReasons.CaroWin);
            }
            else if (moves.Count == CaroRules.Cells) Finalize(room, now, EndReasons.Draw);
            else room.TurnDeadline = now + CaroTurn;
            return true;
        }));

    /// <summary>Bỏ cuộc khi đang chơi; khi còn chờ thì rời phòng (chủ phòng rời / trận mời → huỷ).</summary>
    public async Task<OnlineMatchDto> ForfeitAsync(Guid me, Guid id)
    {
        var left = false;
        var dto = await PublishAsync(await MutateAsync(id, me, (room, p, now) =>
        {
            left = false;
            if (!MatchStatus.IsActive(room.Status)) return false;
            if (room.Status == MatchStatus.Waiting)
            {
                if (room.Source != MatchSource.Room || room.HostId == me)
                {
                    Cancel(room, now, EndReasons.Cancelled);
                    p.Forfeited = true;
                }
                else
                {
                    room.Participants.Remove(p);
                    db.MatchParticipants.Remove(p);
                    room.ReadyDeadline = null;
                    left = true;
                }
                return true;
            }
            if (p.Forfeited || p.FinishedAt != null) return false;
            p.Forfeited = true;
            if (room.Game == GameIds.Caro)
            {
                room.WinnerId = room.Participants.First(x => x.UserId != me).UserId;
                Finalize(room, now, EndReasons.Forfeit);
            }
            else EndIfDecided(room, now, EndReasons.Forfeit);
            return true;
        }));
        // Người rời phòng chờ không còn trong danh sách người chơi → báo riêng cho họ.
        if (left) await notifier.MatchLeftAsync(me, dto);
        return dto;
    }

    // ================================================================== kết thúc / xếp hạng

    private static void EnsurePlaying(MatchRoom room, DateTime now)
    {
        if (room.Status != MatchStatus.Playing) throw AppException.Conflict("Trận chưa bắt đầu hoặc đã kết thúc.", "NOT_PLAYING");
        if (now < room.StartedAt) throw AppException.Conflict("Đang đếm ngược, chưa được chơi.", "COUNTDOWN");
    }

    private void Disqualify(MatchRoom room, MatchParticipant p, DateTime now)
    {
        p.Assisted = true;
        if (!room.AssistLocked) return;
        p.Forfeited = true;
        if (room.Game == GameIds.Caro)
        {
            room.WinnerId = room.Participants.First(x => x.UserId != p.UserId).UserId;
            Finalize(room, now, EndReasons.Disqualified);
        }
        else EndIfDecided(room, now, EndReasons.Disqualified);
    }

    /// <summary>Trận đua giải: kết thúc khi còn tối đa 1 người chưa xong mà chưa bị loại.</summary>
    private void EndIfDecided(MatchRoom room, DateTime now, string reason)
    {
        var playing = room.Participants.Count(p => !p.Forfeited && p.FinishedAt == null);
        if (playing > 1) return;
        var anyFinished = room.Participants.Any(p => p.FinishedAt != null && !p.Forfeited);
        Finalize(room, now, anyFinished ? EndReasons.Solved : reason);
    }

    internal void Finalize(MatchRoom room, DateTime now, string reason)
    {
        var finished = room.Participants.Where(p => p.FinishedAt != null && !p.Forfeited).OrderBy(p => p.FinishTimeMs).ToList();
        var remaining = room.Participants.Where(p => p.FinishedAt == null && !p.Forfeited).OrderByDescending(p => p.Progress).ToList();
        var outs = room.Participants.Where(p => p.Forfeited).ToList();

        // Không ai giải xong: người duy nhất còn lại thắng khi các đối thủ bỏ cuộc / bị loại.
        if (room.WinnerId == null && finished.Count == 0 && remaining.Count == 1 && reason is EndReasons.Forfeit or EndReasons.Disqualified)
            room.WinnerId = remaining[0].UserId;
        room.WinnerId ??= finished.FirstOrDefault()?.UserId;

        var order = finished.Concat(remaining).Concat(outs).ToList();
        if (room.WinnerId is { } w && order.FindIndex(p => p.UserId == w) is > 0 and var i)
        {
            var winner = order[i];
            order.RemoveAt(i);
            order.Insert(0, winner);
        }

        for (var rank = 0; rank < order.Count; rank++)
        {
            var p = order[rank];
            var outcome = p.UserId == room.WinnerId ? Outcomes.Win
                : room.WinnerId == null && !p.Forfeited ? Outcomes.Draw
                : Outcomes.Loss;
            db.MatchResults.Add(new MatchResult
            {
                MatchRoomId = room.Id, UserId = p.UserId, Rank = outcome == Outcomes.Draw ? 1 : rank + 1, Outcome = outcome,
                TimeMs = p.FinishTimeMs, Valid = !p.Assisted && p.Verified != false, CreatedAt = now,
            });
        }
        room.Status = MatchStatus.Finished;
        room.EndReason = reason;
        room.EndedAt = now;
        room.TurnDeadline = null;
    }

    private static void Cancel(MatchRoom room, DateTime now, string reason)
    {
        room.Status = MatchStatus.Cancelled;
        room.EndReason = reason;
        room.EndedAt = now;
        room.ReadyDeadline = null;
    }

    private static bool PuzzleOk(string mode, List<PuzzleDrop>? drops, long elapsedMs)
    {
        if (drops == null || !int.TryParse(mode.Split('x')[0], out var n)) return false;
        var pieces = n * n;
        if (drops.Count != pieces || drops.Any(d => d.Hint || d.Piece < 0 || d.Piece >= pieces || d.AtMs > elapsedMs + 1000)) return false;
        return drops.Select(d => d.Piece).Distinct().Count() == pieces;
    }

    // ================================================================== dọn dẹp định kỳ

    /// <summary>Hết hạn sẵn sàng, phòng bỏ trống, Caro hết giờ lượt, trận quá giới hạn thời gian.</summary>
    internal async Task TickAsync(CancellationToken ct)
    {
        var now = Now;
        var waiting = await db.MatchRooms.AsNoTracking()
            .Where(r => r.Status == MatchStatus.Waiting && ((r.ReadyDeadline != null && r.ReadyDeadline < now) || r.CreatedAt < now - StaleRoom))
            .OrderBy(r => r.CreatedAt).Select(r => r.Id).Take(50).ToListAsync(ct);
        var playing = await db.MatchRooms.AsNoTracking().Where(r => r.Status == MatchStatus.Playing).OrderBy(r => r.StartedAt)
            .Select(r => new { r.Id, r.Game, r.Mode, r.StartedAt, r.TurnDeadline }).Take(500).ToListAsync(ct);
        var due = playing.Where(r => (r.TurnDeadline != null && r.TurnDeadline < now) || r.StartedAt + OnlineModes.TimeLimit(r.Game, r.Mode) < now)
            .Select(r => r.Id).Take(50);

        // Hết đếm ngược → báo PLAYING cho client (app chỉ đổi màn hình khi nhận match.state).
        var since = new DateTime(Interlocked.Exchange(ref tickState.LastTickTicks, now.Ticks), DateTimeKind.Utc);
        if (since == DateTime.MinValue || since > now) since = now - Countdown - TimeSpan.FromSeconds(2);
        foreach (var r in playing.Where(r => r.StartedAt > since && r.StartedAt <= now))
        {
            try
            {
                var room = await LoadAsync(r.Id, noTracking: true);
                if (room?.Status == MatchStatus.Playing) await PublishAsync(room);
            }
            catch (Exception ex) when (ex is not OperationCanceledException)
            {
                logger.LogWarning(ex, "Không báo được bắt đầu trận {MatchId}", r.Id);
            }
        }

        foreach (var id in waiting.Concat(due))
        {
            ct.ThrowIfCancellationRequested();
            try
            {
                db.ChangeTracker.Clear();
                var room = await MutateAsync(id, (room, t) => Expire(room, t));
                await PublishAsync(room);
            }
            catch (AppException) { /* trận đã thay đổi, bỏ qua */ }
            catch (Exception ex) when (ex is not OperationCanceledException)
            {
                logger.LogWarning(ex, "Không xử lý được hết hạn trận {MatchId}", id);
            }
        }
    }

    private bool Expire(MatchRoom room, DateTime now)
    {
        if (room.Status == MatchStatus.Waiting)
        {
            if (room.ReadyDeadline < now) Cancel(room, now, EndReasons.ReadyTimeout);
            else if (room.CreatedAt < now - StaleRoom) Cancel(room, now, EndReasons.Cancelled);
            else return false;
            return true;
        }
        if (room.Status != MatchStatus.Playing) return false;
        if (room.Game == GameIds.Caro && room.TurnDeadline < now)
        {
            // Hết 30 giây mà không đi → người tới lượt thua.
            var moves = JsonSerializer.Deserialize<List<int>>(room.CaroMovesJson) ?? [];
            room.WinnerId = room.Participants.FirstOrDefault(p => p.Seat != moves.Count % 2)?.UserId;
            Finalize(room, now, EndReasons.Timeout);
            return true;
        }
        if (room.StartedAt + OnlineModes.TimeLimit(room.Game, room.Mode) < now)
        {
            Finalize(room, now, EndReasons.Timeout);
            return true;
        }
        return false;
    }

    // ================================================================== hạ tầng

    internal async Task<MatchRoom?> LoadAsync(Guid id, bool noTracking = false)
    {
        var q = db.MatchRooms.Include(r => r.Participants).AsQueryable();
        if (noTracking) q = q.AsNoTracking();
        return await q.FirstOrDefaultAsync(r => r.Id == id);
    }

    private Task<MatchRoom> MutateAsync(Guid id, Guid me, Func<MatchRoom, MatchParticipant, DateTime, bool> action) =>
        MutateAsync(id, (room, now) =>
        {
            var p = room.Participants.FirstOrDefault(x => x.UserId == me) ?? throw AppException.NotFound("Không tìm thấy trận đấu.");
            return action(room, p, now);
        });

    /// <summary>Tải phòng, áp thay đổi, lưu với kiểm tra RowVersion; xung đột → tải lại và thử tối đa 4 lần.</summary>
    private async Task<MatchRoom> MutateAsync(Guid id, Func<MatchRoom, DateTime, bool> action, Guid? checkBlocked = null)
    {
        for (var attempt = 0; ; attempt++)
        {
            var room = await LoadAsync(id) ?? throw AppException.NotFound("Không tìm thấy trận đấu.");
            if (checkBlocked is { } joiner)
                foreach (var other in room.Participants.Select(p => p.UserId))
                    if (await repo.BlockedEitherAsync(joiner, other)) throw AppException.NotFound("Không tìm thấy phòng.");
            if (!action(room, Now)) return room;
            // Đánh dấu cả hàng phòng là đã sửa → UPDATE kèm điều kiện RowVersion, kể cả khi chỉ đổi người chơi.
            if (db.Entry(room).State == EntityState.Unchanged) db.Entry(room).State = EntityState.Modified;
            try
            {
                await db.SaveChangesAsync();
                return room;
            }
            catch (DbUpdateException ex) when (attempt < 3 && (ex is DbUpdateConcurrencyException || GameResultService.IsUniqueViolation(ex)))
            {
                db.ChangeTracker.Clear();
            }
        }
    }

    internal async Task<OnlineMatchDto> PublishAsync(MatchRoom room, string? type = null)
    {
        var dto = await ToDtoAsync(room);
        await notifier.MatchAsync(dto, type);
        return dto;
    }

    internal async Task<OnlineMatchDto> ToDtoAsync(MatchRoom room) => (await ToDtosAsync([room]))[0];

    internal async Task<List<OnlineMatchDto>> ToDtosAsync(List<MatchRoom> rooms)
    {
        var now = Now;
        var summaries = await users.SummariesAsync(rooms.SelectMany(r => r.Participants.Select(p => p.UserId)).Distinct());
        var ended = rooms.Where(r => r.Status == MatchStatus.Finished).Select(r => r.Id).ToList();
        var ranks = ended.Count == 0 ? [] : await db.MatchResults.AsNoTracking().Where(x => ended.Contains(x.MatchRoomId))
            .Select(x => new { x.MatchRoomId, x.UserId, x.Rank }).ToDictionaryAsync(x => (x.MatchRoomId, x.UserId), x => x.Rank);

        return rooms.Select(r =>
        {
            var players = r.Participants.OrderBy(p => p.Seat).Select(p => new MatchPlayerDto(
                summaries.GetValueOrDefault(p.UserId) ?? new UserSummaryDto(p.UserId, "unknown", "Người chơi", 0),
                ((char)('A' + p.Seat)).ToString(), p.Ready, p.Progress, p.Assisted, p.FinishTimeMs,
                presence.IsConnected(p.UserId), ranks.TryGetValue((r.Id, p.UserId), out var rk) ? rk : null, p.Forfeited)).ToList();
            var status = r.Status == MatchStatus.Playing && now < r.StartedAt ? "COUNTDOWN" : r.Status;
            var rated = r.Source != MatchSource.Room && r.Capacity == 2 && r.Participants.All(p => !p.Assisted);
            return new OnlineMatchDto(
                r.Id, r.Game, r.Mode, r.Source, status, ConfigObject(r), players, r.ReadyDeadline, r.StartedAt, r.EndedAt,
                r.WinnerId, r.EndReason, rated, JsonSerializer.Deserialize<List<int>>(r.CaroMovesJson) ?? [], r.TurnDeadline,
                now, r.Capacity, r.Source == MatchSource.Room ? r.Code : null, null, null, [], r.AssistLocked);
        }).ToList();
    }

    private static Dictionary<string, JsonElement> Config(MatchRoom r) =>
        JsonSerializer.Deserialize<Dictionary<string, JsonElement>>(r.ConfigJson) ?? [];

    private static Dictionary<string, object?> ConfigObject(MatchRoom r) => Config(r).ToDictionary(kv => kv.Key, kv => (object?)kv.Value);

    private static string Str(Dictionary<string, JsonElement> c, string key) =>
        c.TryGetValue(key, out var v) && v.ValueKind == JsonValueKind.String ? v.GetString()! : "";

    // ================================================================== xếp hạng online

    public async Task<List<OnlineRankEntryDto>> LeaderboardAsync(string game, int limit)
    {
        var rows = (await repo.RatingsAsync(game)).Values
            .OrderByDescending(r => r.Rating).ThenByDescending(r => r.Wins).ThenBy(r => r.Played).Take(limit).ToList();
        var summaries = await users.SummariesAsync(rows.Select(r => r.UserId));
        return rows.Where(r => summaries.ContainsKey(r.UserId))
            .Select((r, i) => new OnlineRankEntryDto(i + 1, summaries[r.UserId], r.Rating, r.Played, r.Wins)).ToList();
    }
}

/// <summary>Thời điểm nhịp dọn dẹp trước (ticks) — singleton theo ứng dụng để báo bắt đầu trận đúng một lần.</summary>
public sealed class MatchTickState
{
    public long LastTickTicks;
}
