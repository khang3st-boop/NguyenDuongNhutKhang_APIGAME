using Microsoft.Extensions.Options;
using NguyenDuongNhutKhang_APIGAME.Interfaces;
using NguyenDuongNhutKhang_APIGAME.Repositories;
using NguyenDuongNhutKhang_APIGAME.Services;
using NguyenDuongNhutKhang_APIGAME.Services.Email;

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
        services.AddSingleton<NearbyStore>();
        services.AddScoped<NearbyService>();
        services.AddHostedService<HousekeepingService>();

        services.AddSignalR(o =>
        {
            o.EnableDetailedErrors = false; // không lộ lỗi nội bộ qua hub
            o.MaximumReceiveMessageSize = 16 * 1024;
        });
        return services;
    }

    /// <summary>Đăng ký email OTP, quên mật khẩu, Google. Thiếu cấu hình → tính năng tự tắt (AUTH_NOT_READY), không giả lập.</summary>
    public static IServiceCollection AddAuthV2(this IServiceCollection services, IConfiguration config)
    {
        services.AddHttpClient<ResendEmailService>(c => c.Timeout = TimeSpan.FromSeconds(30));
        services.AddHttpClient<BrevoEmailService>(c => c.Timeout = TimeSpan.FromSeconds(30));
        services.AddHttpClient<HttpGoogleKeyProvider>(c => c.Timeout = TimeSpan.FromSeconds(10));

        services.AddSingleton<IEmailService>(sp =>
        {
            var o = sp.GetRequiredService<IOptions<EmailOptions>>().Value;
            if (!o.Configured) return new UnconfiguredEmailService();
            return o.Provider.ToLowerInvariant() switch
            {
                "smtp" => ActivatorUtilities.CreateInstance<SmtpEmailService>(sp),
                "resend" => sp.GetRequiredService<ResendEmailService>(),
                "brevo" => sp.GetRequiredService<BrevoEmailService>(),
                _ => new UnconfiguredEmailService(),
            };
        });
        services.AddSingleton<EmailOutbox>();
        services.AddSingleton<IEmailOutbox>(sp => sp.GetRequiredService<EmailOutbox>());
        services.AddHostedService<EmailOutboxWorker>();

        services.AddSingleton<IGoogleKeyProvider>(sp => sp.GetRequiredService<HttpGoogleKeyProvider>());
        services.AddSingleton<IGoogleTokenVerifier, GoogleTokenVerifier>();
        services.AddScoped<IAuthV2Service, AuthV2Service>();
        services.AddHostedService<AuthChallengeCleanupService>();
        return services;
    }
}
