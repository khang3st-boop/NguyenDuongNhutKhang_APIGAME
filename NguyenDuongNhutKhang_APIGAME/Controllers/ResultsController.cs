using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NguyenDuongNhutKhang_APIGAME.DTOs;
using NguyenDuongNhutKhang_APIGAME.Helpers;
using NguyenDuongNhutKhang_APIGAME.Interfaces;

namespace NguyenDuongNhutKhang_APIGAME.Controllers;

/// <summary>Kết quả mọi game, đồng bộ offline, bảng xếp hạng chung (đúng đường dẫn app Flutter đang gọi).</summary>
[Route("api/v1")]
[Tags("Results & Sync")]
[Authorize]
public class ResultsController(IGameResultService results, ILeaderboardService boards) : ApiControllerBase
{
    /// <summary>Gửi một kết quả (trường <c>game</c> bắt buộc).</summary>
    /// <response code="201">Đã lưu.</response>
    /// <response code="200">Đã có (trùng clientId).</response>
    [HttpPost("results")]
    [ProducesResponseType<SubmitResultResponse>(StatusCodes.Status201Created)]
    [ProducesResponseType<SubmitResultResponse>(StatusCodes.Status200OK)]
    public async Task<IActionResult> Submit(ResultInput input)
    {
        var res = await results.SubmitAsync(UserId, input);
        return res.Duplicate ? Ok(res) : StatusCode(StatusCodes.Status201Created, res);
    }

    /// <summary>Đồng bộ kết quả chơi offline (tối đa 100 / lần) và lấy kết quả mới từ thiết bị khác.</summary>
    /// <remarks>
    /// Mỗi phần tử được kiểm tra riêng: <c>accepted</c> (đã lưu), <c>duplicates</c> (đã có từ trước),
    /// <c>rejected</c> (kèm lý do). <c>results</c> = kết quả server nhận sau mốc <c>since</c>; lần sau gửi lại <c>serverTime</c>.
    /// </remarks>
    [HttpPost("sync")]
    [ProducesResponseType<SyncResponse>(StatusCodes.Status200OK)]
    public Task<SyncResponse> Sync(SyncRequest req) => results.SyncAsync(UserId, req);

    /// <summary>Lịch sử ván của tôi (mọi game hoặc lọc theo <c>game</c>).</summary>
    [HttpGet("results/me")]
    [ProducesResponseType<List<ResultDto>>(StatusCodes.Status200OK)]
    public Task<List<ResultDto>> Mine([FromQuery] string? game = null, [FromQuery, Range(1, 200)] int limit = 50, [FromQuery] DateTime? before = null)
    {
        if (game != null && !GameIds.IsValid(game)) throw AppException.BadRequest("Game không hợp lệ.", "INVALID_GAME");
        return results.HistoryAsync(UserId, game, limit, before);
    }

    /// <summary>Thống kê của tôi cho cả 4 game.</summary>
    [HttpGet("stats/me")]
    [ProducesResponseType<List<GameStatsDto>>(StatusCodes.Status200OK)]
    public Task<List<GameStatsDto>> MyStats() => results.StatsAsync(UserId, null);

    /// <summary>Bảng xếp hạng chung: <c>game</c> bắt buộc, <c>period</c> = all | week.</summary>
    [HttpGet("leaderboard")]
    [AllowAnonymous]
    [ProducesResponseType<List<LeaderboardRow>>(StatusCodes.Status200OK)]
    public Task<List<LeaderboardRow>> Leaderboard(
        [FromQuery, Required(ErrorMessage = "Thiếu game."), RegularExpression("^(rubik|sudoku|puzzle|caro)$", ErrorMessage = "Game không hợp lệ.")] string game,
        [FromQuery, RegularExpression("^(all|week)$", ErrorMessage = "period là all hoặc week.")] string period = "all",
        [FromQuery, Range(1, 100)] int limit = 50) =>
        boards.TopAsync(game, period, limit);
}

/// <summary>Thử thách hằng ngày (giờ Việt Nam, đổi đề lúc 00:00 UTC+7).</summary>
[Route("api/v1/daily")]
[Tags("Daily")]
[Authorize]
public class DailyController(IDailyService daily, ILeaderboardService boards) : ApiControllerBase
{
    /// <summary>Ngày hiện tại, giờ server, mốc đổi đề và seed của Sudoku / Xếp hình. Không cần đăng nhập.</summary>
    /// <remarks><c>challenge</c> = null: app Flutter dùng đề tự sinh theo ngày (xem README phần khác biệt).</remarks>
    [HttpGet("today")]
    [AllowAnonymous]
    [ProducesResponseType<DailyTodayResponse>(StatusCodes.Status200OK)]
    public Task<DailyTodayResponse> Today() => daily.TodayAsync();

    /// <summary>Kết quả thử thách ngày của tôi đã được server ghi nhận (<c>days</c> ngày gần nhất).</summary>
    [HttpGet("me")]
    [ProducesResponseType<List<ResultDto>>(StatusCodes.Status200OK)]
    public Task<List<ResultDto>> Mine([FromQuery, Range(1, 366)] int days = 60) => daily.MineAsync(UserId, days);

    /// <summary>Bảng xếp hạng một ngày cho một game. Không cần đăng nhập.</summary>
    [HttpGet("{date}/leaderboard")]
    [AllowAnonymous]
    [ProducesResponseType<List<LeaderboardRow>>(StatusCodes.Status200OK)]
    public Task<List<LeaderboardRow>> Leaderboard(
        [RegularExpression(@"^\d{4}-\d{2}-\d{2}$", ErrorMessage = "Ngày dạng yyyy-MM-dd.")] string date,
        [FromQuery, Required(ErrorMessage = "Thiếu game."), RegularExpression("^(rubik|sudoku|puzzle|caro)$", ErrorMessage = "Game không hợp lệ.")] string game,
        [FromQuery, Range(1, 100)] int limit = 50) =>
        boards.DailyAsync(date, game, limit);
}
