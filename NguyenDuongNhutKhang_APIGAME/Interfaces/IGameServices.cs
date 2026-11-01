using NguyenDuongNhutKhang_APIGAME.DTOs;

namespace NguyenDuongNhutKhang_APIGAME.Interfaces;

/// <summary>Lưu kết quả ván, đồng bộ offline, lịch sử và thống kê.</summary>
public interface IGameResultService
{
    Task<SubmitResultResponse> SubmitAsync(Guid userId, ResultInput input, Guid? sessionId = null);
    Task<SyncResponse> SyncAsync(Guid userId, SyncRequest req);
    Task<List<ResultDto>> HistoryAsync(Guid userId, string? game, int limit, DateTime? before);
    Task<List<GameStatsDto>> StatsAsync(Guid userId, string? game);
}

/// <summary>Bảng xếp hạng (mọi lúc / 7 ngày / theo ngày thử thách).</summary>
public interface ILeaderboardService
{
    Task<List<LeaderboardRow>> TopAsync(string game, string period, int limit);
    Task<List<LeaderboardRow>> DailyAsync(string date, string game, int limit);
}

/// <summary>Phiên chơi trên server (bắt đầu, lưu trạng thái, kết thúc → kết quả có thời gian do server đo).</summary>
public interface IGameSessionService
{
    Task<SessionDto> StartAsync(Guid userId, string game, StartSessionRequest req);
    Task<SessionDto?> ActiveAsync(Guid userId, string game);
    Task<SessionDto> GetAsync(Guid userId, string game, Guid id);
    Task<SessionDto> SaveStateAsync(Guid userId, string game, Guid id, SaveStateRequest req);
    Task<FinishSessionResponse> FinishAsync(Guid userId, string game, Guid id, FinishSessionRequest req);
    Task AbandonAsync(Guid userId, string game, Guid id);
}

/// <summary>Thử thách hằng ngày.</summary>
public interface IDailyService
{
    Task<DailyTodayResponse> TodayAsync();
    Task<DailyGameDto> ForGameAsync(string game, string? date);
    Task<List<ResultDto>> MineAsync(Guid userId, int days);
}

/// <summary>Mã thử thách Rubik chia sẻ được.</summary>
public interface IRubikChallengeService
{
    Task<RubikChallengeDto> CreateAsync(Guid userId, CreateRubikChallengeRequest req);
    Task<RubikChallengeDto> GetAsync(string code);
    Task<List<LeaderboardRow>> ResultsAsync(string code, int limit);
}
