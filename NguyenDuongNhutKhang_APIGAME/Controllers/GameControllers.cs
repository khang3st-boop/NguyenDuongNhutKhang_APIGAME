using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NguyenDuongNhutKhang_APIGAME.DTOs;
using NguyenDuongNhutKhang_APIGAME.Helpers;
using NguyenDuongNhutKhang_APIGAME.Interfaces;
using NguyenDuongNhutKhang_APIGAME.Services;

namespace NguyenDuongNhutKhang_APIGAME.Controllers;

/// <summary>
/// API chung cho từng game: kết quả, lịch sử, thống kê, bảng xếp hạng, phiên chơi.
/// Mỗi game kế thừa lớp này với route riêng (<c>/api/v1/rubik</c>, <c>/sudoku</c>, <c>/puzzle</c>, <c>/caro</c>).
/// </summary>
[Authorize]
public abstract class GameControllerBase(
    IGameResultService results, IGameSessionService sessions, ILeaderboardService boards, IUserService users) : ApiControllerBase
{
    protected abstract string Game { get; }

    protected ILeaderboardService Boards => boards;

    /// <summary>Gửi một kết quả ván. Server tự tính điểm và kiểm chứng lời giải nếu có trong <c>details</c>.</summary>
    /// <response code="201">Đã lưu kết quả mới.</response>
    /// <response code="200">clientId đã tồn tại — trả lại bản đã lưu (<c>duplicate = true</c>).</response>
    /// <response code="400">Dữ liệu sai hoặc lời giải không hợp lệ (<c>RESULT_REJECTED</c>).</response>
    [HttpPost("results")]
    [ProducesResponseType<SubmitResultResponse>(StatusCodes.Status201Created)]
    [ProducesResponseType<SubmitResultResponse>(StatusCodes.Status200OK)]
    public async Task<IActionResult> Submit(ResultInput input)
    {
        var res = await results.SubmitAsync(UserId, input with { Game = Game });
        return res.Duplicate ? Ok(res) : StatusCode(StatusCodes.Status201Created, res);
    }

    /// <summary>Lịch sử ván của tôi (mới nhất trước). Phân trang bằng <c>before</c> = playedAt của dòng cuối.</summary>
    [HttpGet("history")]
    [ProducesResponseType<List<ResultDto>>(StatusCodes.Status200OK)]
    public Task<List<ResultDto>> History([FromQuery, Range(1, 200)] int limit = 50, [FromQuery] DateTime? before = null) =>
        results.HistoryAsync(UserId, Game, limit, before);

    /// <summary>Thống kê của tôi cho game này.</summary>
    [HttpGet("stats")]
    [ProducesResponseType<GameStatsDto>(StatusCodes.Status200OK)]
    public async Task<GameStatsDto> MyStats() => (await results.StatsAsync(UserId, Game))[0];

    /// <summary>Thống kê của người chơi khác (nếu họ bật "hiện thống kê").</summary>
    /// <response code="403">Người chơi đã ẩn thống kê.</response>
    /// <response code="404">Không có người chơi này.</response>
    [HttpGet("stats/{userId:guid}")]
    [ProducesResponseType<GameStatsDto>(StatusCodes.Status200OK)]
    [ProducesResponseType<ErrorResponse>(StatusCodes.Status403Forbidden)]
    [ProducesResponseType<ErrorResponse>(StatusCodes.Status404NotFound)]
    public async Task<GameStatsDto> UserStats(Guid userId)
    {
        var profile = await users.GetMeAsync(userId);
        if (userId != UserId && !profile.ShowStats) throw AppException.Forbidden("Người chơi này đã ẩn thống kê.");
        return (await results.StatsAsync(userId, Game))[0];
    }

    /// <summary>Bảng xếp hạng của game: <c>period=all</c> (mọi lúc) hoặc <c>week</c> (7 ngày). Không cần đăng nhập.</summary>
    [HttpGet("leaderboard")]
    [AllowAnonymous]
    [ProducesResponseType<List<LeaderboardRow>>(StatusCodes.Status200OK)]
    public Task<List<LeaderboardRow>> Leaderboard(
        [FromQuery, RegularExpression("^(all|week)$", ErrorMessage = "period là all hoặc week.")] string period = "all",
        [FromQuery, Range(1, 100)] int limit = 50) =>
        boards.TopAsync(Game, period, limit);

    /// <summary>Bắt đầu phiên chơi trên server (phiên đang chơi trước đó của game này bị đóng).</summary>
    /// <remarks>Thời gian ván = lúc gọi <c>finish</c> − lúc bắt đầu, do server đo.</remarks>
    [HttpPost("sessions")]
    [ProducesResponseType<SessionDto>(StatusCodes.Status201Created)]
    public async Task<IActionResult> StartSession(StartSessionRequest req) =>
        StatusCode(StatusCodes.Status201Created, await sessions.StartAsync(UserId, Game, req));

    /// <summary>Phiên đang chơi dở (để tiếp tục trên máy khác).</summary>
    /// <response code="204">Không có phiên đang chơi.</response>
    [HttpGet("sessions/active")]
    [ProducesResponseType<SessionDto>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> ActiveSession() =>
        await sessions.ActiveAsync(UserId, Game) is { } s ? Ok(s) : NoContent();

    /// <summary>Xem một phiên của tôi.</summary>
    [HttpGet("sessions/{id:guid}")]
    [ProducesResponseType<SessionDto>(StatusCodes.Status200OK)]
    [ProducesResponseType<ErrorResponse>(StatusCodes.Status404NotFound)]
    public Task<SessionDto> GetSession(Guid id) => sessions.GetAsync(UserId, Game, id);

    /// <summary>Lưu trạng thái ván (khi tạm dừng / thoát app — không gọi cho từng nước đi).</summary>
    /// <response code="409">Phiên đã kết thúc.</response>
    [HttpPut("sessions/{id:guid}/state")]
    [ProducesResponseType<SessionDto>(StatusCodes.Status200OK)]
    [ProducesResponseType<ErrorResponse>(StatusCodes.Status404NotFound)]
    [ProducesResponseType<ErrorResponse>(StatusCodes.Status409Conflict)]
    public Task<SessionDto> SaveState(Guid id, SaveStateRequest req) => sessions.SaveStateAsync(UserId, Game, id, req);

    /// <summary>Kết thúc phiên → tạo kết quả với thời gian do server đo.</summary>
    [HttpPost("sessions/{id:guid}/finish")]
    [ProducesResponseType<FinishSessionResponse>(StatusCodes.Status200OK)]
    [ProducesResponseType<ErrorResponse>(StatusCodes.Status404NotFound)]
    [ProducesResponseType<ErrorResponse>(StatusCodes.Status409Conflict)]
    public Task<FinishSessionResponse> FinishSession(Guid id, FinishSessionRequest req) => sessions.FinishAsync(UserId, Game, id, req);

    /// <summary>Bỏ phiên đang chơi.</summary>
    [HttpDelete("sessions/{id:guid}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType<ErrorResponse>(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> AbandonSession(Guid id)
    {
        await sessions.AbandonAsync(UserId, Game, id);
        return NoContent();
    }
}

/// <summary>Rubik 3×3: kết quả, phiên, scramble, kiểm chứng lời giải, mã thử thách.</summary>
[Route("api/v1/rubik")]
[Tags("Rubik")]
public class RubikController(
    IGameResultService results, IGameSessionService sessions, ILeaderboardService boards, IUserService users,
    IRubikChallengeService challenges) : GameControllerBase(results, sessions, boards, users)
{
    protected override string Game => GameIds.Rubik;

    /// <summary>Sinh một scramble ngẫu nhiên 20 nước (không lặp mặt, không 3 nước cùng trục liên tiếp).</summary>
    [HttpGet("scramble")]
    [AllowAnonymous]
    [ProducesResponseType<ScrambleResponse>(StatusCodes.Status200OK)]
    public ScrambleResponse Scramble() => new(RubikVerifier.RandomScramble(20));

    /// <summary>Kiểm tra <c>scramble + solution</c> có đưa khối về trạng thái đã giải không (mô phỏng 54 sticker trên server).</summary>
    [HttpPost("verify")]
    [ProducesResponseType<RubikVerifyResponse>(StatusCodes.Status200OK)]
    public RubikVerifyResponse Verify(RubikVerifyRequest req)
    {
        var s = RubikVerifier.Parse(req.Scramble);
        var m = RubikVerifier.Parse(req.Solution);
        if (s == null || m == null) return new RubikVerifyResponse(false, false, 0);
        return new RubikVerifyResponse(true, RubikVerifier.Solves(req.Scramble, req.Solution), m.Count);
    }

    /// <summary>Tạo mã thử thách: server sinh scramble, chia sẻ mã để người khác giải cùng đề (hạn 30 ngày).</summary>
    /// <remarks>Khi gửi kết quả, thêm <c>details.challengeCode</c> và <c>details.scramble</c> đúng đề để vào bảng xếp hạng của mã.</remarks>
    [HttpPost("challenges")]
    [ProducesResponseType<RubikChallengeDto>(StatusCodes.Status201Created)]
    [ProducesResponseType<ErrorResponse>(StatusCodes.Status429TooManyRequests)]
    public async Task<IActionResult> CreateChallenge(CreateRubikChallengeRequest req) =>
        StatusCode(StatusCodes.Status201Created, await challenges.CreateAsync(UserId, req));

    /// <summary>Xem đề của một mã thử thách.</summary>
    [HttpGet("challenges/{code}")]
    [ProducesResponseType<RubikChallengeDto>(StatusCodes.Status200OK)]
    [ProducesResponseType<ErrorResponse>(StatusCodes.Status404NotFound)]
    public Task<RubikChallengeDto> GetChallenge([StringLength(12)] string code) => challenges.GetAsync(code);

    /// <summary>Bảng xếp hạng của một mã thử thách.</summary>
    [HttpGet("challenges/{code}/results")]
    [ProducesResponseType<List<LeaderboardRow>>(StatusCodes.Status200OK)]
    [ProducesResponseType<ErrorResponse>(StatusCodes.Status404NotFound)]
    public Task<List<LeaderboardRow>> ChallengeResults([StringLength(12)] string code, [FromQuery, Range(1, 100)] int limit = 50) =>
        challenges.ResultsAsync(code, limit);
}

/// <summary>API dùng chung cho game có thử thách ngày do server cấp seed (Sudoku, Xếp hình).</summary>
public abstract class DailyGameControllerBase(
    IGameResultService results, IGameSessionService sessions, ILeaderboardService boards, IUserService users, IDailyService daily)
    : GameControllerBase(results, sessions, boards, users)
{
    /// <summary>Thử thách ngày của game này (seed + độ khó). Bỏ trống <c>date</c> = hôm nay (giờ Việt Nam).</summary>
    [HttpGet("daily")]
    [AllowAnonymous]
    [ProducesResponseType<DailyGameDto>(StatusCodes.Status200OK)]
    public Task<DailyGameDto> Daily([FromQuery, RegularExpression(@"^\d{4}-\d{2}-\d{2}$")] string? date = null) =>
        daily.ForGameAsync(Game, date);

    /// <summary>Bảng xếp hạng thử thách ngày của game này.</summary>
    [HttpGet("daily/leaderboard")]
    [AllowAnonymous]
    [ProducesResponseType<List<LeaderboardRow>>(StatusCodes.Status200OK)]
    public Task<List<LeaderboardRow>> DailyLeaderboard(
        [FromQuery, RegularExpression(@"^\d{4}-\d{2}-\d{2}$")] string? date = null, [FromQuery, Range(1, 100)] int limit = 50) =>
        Boards.DailyAsync(date ?? GameClock.Today(DateTime.UtcNow), Game, limit);
}

/// <summary>Sudoku: kết quả (kiểm chứng lưới lời giải), lịch sử, thống kê, thử thách ngày.</summary>
[Route("api/v1/sudoku")]
[Tags("Sudoku")]
public class SudokuController(
    IGameResultService results, IGameSessionService sessions, ILeaderboardService boards, IUserService users, IDailyService daily)
    : DailyGameControllerBase(results, sessions, boards, users, daily)
{
    protected override string Game => GameIds.Sudoku;
}

/// <summary>Xếp hình: kết quả, lịch sử, thống kê, thử thách ngày. Ảnh cá nhân không bao giờ được tải lên.</summary>
[Route("api/v1/puzzle")]
[Tags("Puzzle")]
public class PuzzleController(
    IGameResultService results, IGameSessionService sessions, ILeaderboardService boards, IUserService users, IDailyService daily)
    : DailyGameControllerBase(results, sessions, boards, users, daily)
{
    protected override string Game => GameIds.Puzzle;
}

/// <summary>Caro 15×15: kết quả ván với máy, lịch sử, thống kê. Phòng online 2 người ở nhóm Rooms / Matches.</summary>
[Route("api/v1/caro")]
[Tags("Caro")]
public class CaroController(
    IGameResultService results, IGameSessionService sessions, ILeaderboardService boards, IUserService users)
    : GameControllerBase(results, sessions, boards, users)
{
    protected override string Game => GameIds.Caro;
}
