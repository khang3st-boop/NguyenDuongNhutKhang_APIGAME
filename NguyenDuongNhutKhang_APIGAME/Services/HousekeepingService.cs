namespace NguyenDuongNhutKhang_APIGAME.Services;

/// <summary>
/// Dịch vụ nền (mỗi ~2 giây): hết hạn lời mời, hết hạn sẵn sàng, hết giờ lượt Caro / giới hạn thời gian trận,
/// xoá vé ghép quá hạn và ghép các vé đang chờ. Lỗi chỉ ghi log, không làm dừng ứng dụng.
/// Tắt bằng cấu hình <c>Online:Housekeeping=false</c> (ví dụ khi chạy nhiều instance mà chưa có khoá phân tán).
/// </summary>
public class HousekeepingService(IServiceScopeFactory scopes, IConfiguration config, ILogger<HousekeepingService> logger) : BackgroundService
{
    private static readonly TimeSpan Interval = TimeSpan.FromSeconds(2);

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        if (!config.GetValue("Online:Housekeeping", true)) return;
        using var timer = new PeriodicTimer(Interval);
        var failures = 0;
        while (await timer.WaitForNextTickAsync(stoppingToken))
        {
            try
            {
                using var scope = scopes.CreateScope();
                var sp = scope.ServiceProvider;
                await sp.GetRequiredService<InviteService>().ExpireAsync(stoppingToken);
                await sp.GetRequiredService<MatchService>().TickAsync(stoppingToken);
                await sp.GetRequiredService<MatchmakingService>().PairAsync();
                failures = 0;
            }
            catch (OperationCanceledException) when (stoppingToken.IsCancellationRequested)
            {
                break;
            }
            catch (Exception ex)
            {
                // Database tạm không truy cập được → ghi log thưa dần, thử lại ở nhịp sau.
                if (failures++ % 30 == 0) logger.LogWarning(ex, "Dọn dẹp trận online thất bại (lần {Count})", failures);
            }
        }
    }
}
