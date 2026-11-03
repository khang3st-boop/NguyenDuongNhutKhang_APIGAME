using Microsoft.AspNetCore.Identity;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Npgsql;
using NguyenDuongNhutKhang_APIGAME.Configuration;
using NguyenDuongNhutKhang_APIGAME.Helpers;
using NguyenDuongNhutKhang_APIGAME.Models;

namespace NguyenDuongNhutKhang_APIGAME.Data;

/// <summary>Khởi tạo database khi chạy: migration (nếu bật), role User/Admin, Admin tuỳ chọn từ cấu hình bí mật.</summary>
public static class DbSeeder
{
    private static readonly SemaphoreSlim InitializationLock = new(1, 1);

    public static async Task InitializeAsync(IServiceProvider services)
    {
        // Không bỏ qua các lần gọi sau: vẫn kiểm tra migration/role, nhưng không chạy seed song song trong tiến trình.
        await InitializationLock.WaitAsync();
        try
        {
            await InitializeCoreAsync(services);
        }
        finally
        {
            InitializationLock.Release();
        }
    }

    private static async Task InitializeCoreAsync(IServiceProvider services)
    {
        using var scope = services.CreateScope();
        var sp = scope.ServiceProvider;
        var config = sp.GetRequiredService<IConfiguration>();
        var logger = sp.GetRequiredService<ILoggerFactory>().CreateLogger("DbSeeder");
        var server = "(chưa xác định)";
        var database = "(chưa xác định)";

        try
        {
            var db = sp.GetRequiredService<AppDbContext>();
            var connection = db.Database.GetDbConnection();
            server = connection.DataSource;
            database = connection.Database;
            logger.LogInformation("Khởi tạo database {Database} trên {Server}.", database, server);

            if (config.GetValue<bool>("Database:RequireExisting"))
            {
                // Mở đúng database TRƯỚC Migrate: nếu mất metadata/thiếu quyền thì dừng, không thử CREATE DATABASE.
                // Không tự attach, đổi đường dẫn hay tạo database thay thế trong mỗi lần F5.
                await db.Database.OpenConnectionAsync();
                await db.Database.CloseConnectionAsync();
            }

            if (config.GetValue<bool>("Database:MigrateOnStartup"))
            {
                // EF chỉ áp dụng migration chưa có trong __EFMigrationsHistory; cần review Up() trước khi thêm migration.
                await db.Database.MigrateAsync();
                logger.LogInformation("Database {Database} đã cập nhật migration.", database);
            }

            var roles = sp.GetRequiredService<RoleManager<AppRole>>();
            foreach (var name in AppRoles.All)
            {
                if (await roles.RoleExistsAsync(name)) continue;
                var created = await roles.CreateAsync(new AppRole(name));
                // Tiến trình khác có thể vừa tạo role; ràng buộc tên duy nhất trong database vẫn được giữ nguyên.
                if (!created.Succeeded && !await roles.RoleExistsAsync(name))
                    RequireSuccess(created, "tạo role");
            }

            var seed = sp.GetRequiredService<IOptions<SeedOptions>>().Value;
            if (!string.IsNullOrWhiteSpace(seed.AdminUsername) && !string.IsNullOrWhiteSpace(seed.AdminPassword))
            {
                var users = sp.GetRequiredService<UserManager<AppUser>>();
                var admin = await users.FindByNameAsync(seed.AdminUsername);
                if (admin == null)
                {
                    admin = new AppUser
                    {
                        UserName = seed.AdminUsername,
                        Profile = new UserProfile { DisplayName = "Quản trị viên", AvatarColor = 0 },
                    };
                    RequireSuccess(await users.CreateAsync(admin, seed.AdminPassword), "tạo Admin từ cấu hình Seed");
                    RequireSuccess(await users.AddToRoleAsync(admin, AppRoles.User), "gán role User");
                }
                // Tài khoản đã có: không đổi mật khẩu, token, hồ sơ hay lịch sử.
                if (!await users.IsInRoleAsync(admin, AppRoles.Admin))
                    RequireSuccess(await users.AddToRoleAsync(admin, AppRoles.Admin), "gán role Admin");
            }

            logger.LogInformation("Khởi tạo database {Database} hoàn tất.", database);
        }
        catch (Exception error) when (error.GetBaseException() is SqlException)
        {
            // EF có thể bọc SqlException trong InvalidOperationException (execution strategy).
            var ex = (SqlException)error.GetBaseException();
            var reason = ex.Number switch
            {
                5170 or 1801 => "Tên database hoặc MDF/LDF đã tồn tại. Kiểm tra sys.databases/sys.master_files; sao lưu và attach đúng file hiện có.",
                4060 or 18456 => "Không mở được database: kiểm tra tên, quyền truy cập và metadata trong LocalDB. Nếu MDF/LDF còn nhưng chưa attach, sao lưu rồi attach thủ công.",
                -2 => "Kết nối hoặc câu lệnh SQL hết thời gian chờ. Kiểm tra instance và các khoá đang chặn.",
                _ => "Kiểm tra SQL Server/LocalDB, trạng thái database và quyền truy cập; tra mã lỗi SQL đi kèm.",
            };
            // Chỉ log đích kết nối và mã lỗi; không log connection string, mật khẩu hoặc JWT.
            logger.LogCritical("Không khởi tạo được database {Database} trên {Server}. SQL {SqlNumber}, state {SqlState}. {Reason}",
                database, server, ex.Number, ex.State, reason);
            throw;
        }
        catch (Exception error) when (error.GetBaseException() is NpgsqlException)
        {
            var root = error.GetBaseException();
            logger.LogCritical("Không khởi tạo được PostgreSQL {Database} trên {Server}. SQLSTATE {SqlState}; loại lỗi {ErrorType}. Kiểm tra kết nối, TLS, quyền và bộ migration PostgreSQL.",
                database, server, (root as PostgresException)?.SqlState ?? "connection", root.GetType().Name);
            throw;
        }
        catch (Exception ex)
        {
            logger.LogCritical("Không khởi tạo được database {Database} trên {Server}. Loại lỗi: {ErrorType}. Kiểm tra cấu hình và migration/seed; ứng dụng dừng khởi động.",
                database, server, ex.GetType().Name);
            throw;
        }
    }

    private static void RequireSuccess(IdentityResult result, string operation)
    {
        if (!result.Succeeded)
            throw new InvalidOperationException($"Không thể {operation}: {string.Join(", ", result.Errors.Select(e => e.Code))}.");
    }

    /// <summary>
    /// Lệnh quản trị cục bộ: <c>dotnet run -- grant-admin &lt;username&gt;</c>.
    /// Chỉ người có quyền truy cập máy chủ + database mới chạy được — không mở qua HTTP.
    /// </summary>
    public static async Task<int> GrantAdminAsync(IServiceProvider services, string username)
    {
        using var scope = services.CreateScope();
        var users = scope.ServiceProvider.GetRequiredService<UserManager<AppUser>>();
        var user = await users.FindByNameAsync(username);
        if (user == null)
        {
            Console.Error.WriteLine($"Không tìm thấy tài khoản '{username}'.");
            return 1;
        }
        if (!await users.IsInRoleAsync(user, AppRoles.Admin))
        {
            await users.AddToRoleAsync(user, AppRoles.Admin);
            user.TokenVersion++;
            await users.UpdateAsync(user);
        }
        Console.WriteLine($"Đã cấp quyền Admin cho '{username}'. Người này cần đăng nhập lại để nhận token mới.");
        return 0;
    }
}
