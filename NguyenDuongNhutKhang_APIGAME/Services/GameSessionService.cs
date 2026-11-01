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
/// Phiên chơi: server ghi thời điểm bắt đầu nên thời gian ván do server đo, không tin đồng hồ client.
/// App chỉ lưu trạng thái khi tạm dừng / thoát (không gọi API cho từng nước xoay Rubik).
/// </summary>
public class GameSessionService(AppDbContext db, GameResultService results, TimeProvider clock) : IGameSessionService
{
    private const int MaxStateLength = 16_000;
    private static readonly TimeSpan MaxSessionLength = TimeSpan.FromHours(24);

    public async Task<SessionDto> StartAsync(Guid userId, string game, StartSessionRequest req)
    {
        var now = clock.GetUtcNow().UtcDateTime;
        // Mỗi người chỉ có một phiên đang chơi cho mỗi game: phiên cũ chuyển thành ABANDONED.
        await db.GameSessions.Where(s => s.UserId == userId && s.Game == game && s.Status == SessionStatus.Active)
            .ExecuteUpdateAsync(u => u.SetProperty(s => s.Status, SessionStatus.Abandoned).SetProperty(s => s.EndedAt, now));
        var session = new GameSession
        {
            UserId = userId, Game = game, Mode = req.Mode.Trim(), DailyDate = req.DailyDate,
            StateJson = StateJson(req.State), StartedAt = now, UpdatedAt = now,
        };
        db.GameSessions.Add(session);
        await db.SaveChangesAsync();
        return ToDto(session);
    }

    public async Task<SessionDto?> ActiveAsync(Guid userId, string game)
    {
        var s = await db.GameSessions.AsNoTracking()
            .Where(s => s.UserId == userId && s.Game == game && s.Status == SessionStatus.Active)
            .OrderByDescending(s => s.StartedAt).FirstOrDefaultAsync();
        return s == null ? null : ToDto(s);
    }

    public async Task<SessionDto> GetAsync(Guid userId, string game, Guid id) => ToDto(await FindAsync(userId, game, id, tracking: false));

    public async Task<SessionDto> SaveStateAsync(Guid userId, string game, Guid id, SaveStateRequest req)
    {
        var s = await FindActiveAsync(userId, game, id);
        s.StateJson = StateJson(req.State);
        s.UpdatedAt = clock.GetUtcNow().UtcDateTime;
        await db.SaveChangesAsync();
        return ToDto(s);
    }

    public async Task<FinishSessionResponse> FinishAsync(Guid userId, string game, Guid id, FinishSessionRequest req)
    {
        var s = await FindActiveAsync(userId, game, id);
        var now = clock.GetUtcNow().UtcDateTime;
        var elapsed = now - s.StartedAt;
        if (elapsed > MaxSessionLength) throw AppException.BadRequest("Phiên chơi đã quá 24 giờ, không thể kết thúc.", "SESSION_EXPIRED");

        var details = req.Details is { ValueKind: JsonValueKind.Object } d ? JsonNode.Parse(d.GetRawText())!.AsObject() : [];
        if (s.DailyDate != null) details["daily"] = s.DailyDate;
        details["sessionId"] = s.Id.ToString();

        var input = new ResultInput
        {
            ClientId = req.ClientId ?? s.Id.ToString("N"), Game = game, Mode = s.Mode, Outcome = req.Outcome,
            DurationMs = (long)elapsed.TotalMilliseconds, Moves = req.Moves, Errors = req.Errors, Hints = req.Hints,
            Assisted = req.Assisted, PlayedAt = now, Details = JsonSerializer.SerializeToElement(details),
        };
        var p = await results.PrepareForSessionAsync(userId, game, input, now);
        if (p.Entity == null) throw AppException.BadRequest(p.Reason!, "RESULT_REJECTED");
        p.Entity.SessionId = s.Id;

        s.Status = SessionStatus.Finished;
        s.EndedAt = now;
        s.UpdatedAt = now;
        s.ResultId = p.Entity.Id;
        var dto = await results.SavePreparedAsync(userId, p.Entity); // lưu cả phiên lẫn kết quả trong cùng SaveChanges
        return new FinishSessionResponse(ToDto(s), dto);
    }

    public async Task AbandonAsync(Guid userId, string game, Guid id)
    {
        var s = await FindActiveAsync(userId, game, id);
        s.Status = SessionStatus.Abandoned;
        s.EndedAt = s.UpdatedAt = clock.GetUtcNow().UtcDateTime;
        await db.SaveChangesAsync();
    }

    private async Task<GameSession> FindAsync(Guid userId, string game, Guid id, bool tracking = true)
    {
        var q = tracking ? db.GameSessions : db.GameSessions.AsNoTracking();
        // Phiên của người khác cũng trả 404 (không lộ là phiên có tồn tại).
        return await q.FirstOrDefaultAsync(s => s.Id == id && s.UserId == userId && s.Game == game)
               ?? throw AppException.NotFound("Không tìm thấy phiên chơi.");
    }

    private async Task<GameSession> FindActiveAsync(Guid userId, string game, Guid id)
    {
        var s = await FindAsync(userId, game, id);
        if (s.Status != SessionStatus.Active) throw AppException.Conflict("Phiên chơi đã kết thúc.", "SESSION_CLOSED");
        return s;
    }

    private static string? StateJson(JsonElement? state)
    {
        if (state is not { } st || st.ValueKind == JsonValueKind.Null) return null;
        var json = st.GetRawText();
        if (json.Length > MaxStateLength) throw AppException.BadRequest("Trạng thái ván quá lớn (tối đa 16 KB).", "STATE_TOO_LARGE");
        return json;
    }

    private static SessionDto ToDto(GameSession s) => new(
        s.Id, s.Game, s.Mode, s.Status, s.DailyDate, GameResultRepository.ParseJson(s.StateJson),
        s.StartedAt, s.UpdatedAt, s.EndedAt, s.ResultId);
}
