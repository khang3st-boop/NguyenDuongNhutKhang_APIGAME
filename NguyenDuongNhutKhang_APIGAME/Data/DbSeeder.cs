using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using NguyenDuongNhutKhang_APIGAME.Configuration;
using NguyenDuongNhutKhang_APIGAME.Helpers;
using NguyenDuongNhutKhang_APIGAME.Models;

namespace NguyenDuongNhutKhang_APIGAME.Data;

/// <summary>Khởi tạo database khi chạy: migration (nếu bật), role User/Admin, Admin tuỳ chọn từ cấu hình bí mật.</summary>
public static class DbSeeder
{
    public static async Task InitializeAsync(IServiceProvider services)
    {
        using var scope = services.CreateScope();
        var sp = scope.ServiceProvider;
        var config = sp.GetRequiredService<IConfiguration>();
        var logger = sp.GetRequiredService<ILoggerFactory>().CreateLogger("DbSeeder");
        var db = sp.GetRequiredService<AppDbContext>();

        if (config.GetValue<bool>("Database:MigrateOnStartup"))
        {
            // Migrate chỉ THÊM bảng/cột theo các migration chưa áp dụng — không xoá dữ liệu cũ.
            await db.Database.MigrateAsync();
            logger.LogInformation("Đã áp dụng migration cho database phát triển.");
        }

        var roles = sp.GetRequiredService<RoleManager<AppRole>>();
        foreach (var name in AppRoles.All)
            if (!await roles.RoleExistsAsync(name))
                await roles.CreateAsync(new AppRole(name));

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
                var r = await users.CreateAsync(admin, seed.AdminPassword);
                if (!r.Succeeded)
                {
                    logger.LogWarning("Không tạo được tài khoản Admin từ cấu hình Seed (mật khẩu chưa đủ mạnh?).");
                    return;
                }
                await users.AddToRoleAsync(admin, AppRoles.User);
            }
            if (!await users.IsInRoleAsync(admin, AppRoles.Admin))
                await users.AddToRoleAsync(admin, AppRoles.Admin);
        }
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
