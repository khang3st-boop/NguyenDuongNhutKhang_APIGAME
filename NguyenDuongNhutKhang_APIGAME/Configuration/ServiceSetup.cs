using NguyenDuongNhutKhang_APIGAME.Interfaces;
using NguyenDuongNhutKhang_APIGAME.Repositories;
using NguyenDuongNhutKhang_APIGAME.Services;

namespace NguyenDuongNhutKhang_APIGAME.Configuration;

/// <summary>Đăng ký các dịch vụ game / online / realtime.</summary>
public static class ServiceSetup
{
    public static IServiceCollection AddGameHubServices(this IServiceCollection services, IConfiguration config)
    {
        // Phase 3 — dữ liệu game
        services.AddScoped<GameResultRepository>();
        services.AddScoped<GameResultService>();
        services.AddScoped<IGameResultService>(sp => sp.GetRequiredService<GameResultService>());
        services.AddScoped<IGameSessionService, GameSessionService>();
        services.AddScoped<IDailyService, DailyService>();
        services.AddScoped<ILeaderboardService, LeaderboardService>();
        services.AddScoped<IRubikChallengeService, RubikChallengeService>();

        // Phase 4 — bạn bè, sảnh, lời mời, phòng, ghép trận, chat
        services.AddSingleton<PresenceTracker>();
        services.AddSingleton<RealtimeNotifier>();
        services.AddScoped<OnlineRepository>();
        services.AddScoped<IFriendService, FriendService>();
        services.AddScoped<ILobbyService, LobbyService>();
        services.AddSingleton<MatchTickState>();
        services.AddScoped<MatchService>();
        services.AddScoped<IMatchService>(sp => sp.GetRequiredService<MatchService>());
        services.AddScoped<InviteService>();
        services.AddScoped<IInviteService>(sp => sp.GetRequiredService<InviteService>());
        services.AddScoped<MatchmakingService>();
        services.AddScoped<IMatchmakingService>(sp => sp.GetRequiredService<MatchmakingService>());
        services.AddScoped<IChatService, ChatService>();

        // Tương thích app Flutter (giống backend Java): /challenges, /chat/conversations, /presence/me, /reports
        services.AddScoped<PresenceService>();
        services.AddScoped<DuelService>();
        services.AddScoped<DirectChatService>();
        services.AddHostedService<HousekeepingService>();

        services.AddSignalR(o =>
        {
            o.EnableDetailedErrors = false; // không lộ lỗi nội bộ qua hub
            o.MaximumReceiveMessageSize = 16 * 1024;
        });
        return services;
    }
}
