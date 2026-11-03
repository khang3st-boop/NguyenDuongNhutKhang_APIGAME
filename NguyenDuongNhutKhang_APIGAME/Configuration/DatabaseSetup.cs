using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Npgsql;
using NguyenDuongNhutKhang_APIGAME.Data;

namespace NguyenDuongNhutKhang_APIGAME.Configuration;

public static class DatabaseSetup
{
    public static IServiceCollection AddGameHubDatabase(this IServiceCollection services, IConfiguration config)
    {
        // Đọc chuỗi kết nối khi resolve context để WebApplicationFactory có thể ghi đè bằng database test riêng.
        if (string.Equals(config["Database:Provider"], "PostgreSql", StringComparison.OrdinalIgnoreCase))
        {
            services.AddDbContext<PostgresAppDbContext>((sp, o) =>
                o.UseNpgsql(PostgresConnection(sp.GetRequiredService<IConfiguration>()), p => p.CommandTimeout(30)));
            services.AddScoped<AppDbContext>(sp => sp.GetRequiredService<PostgresAppDbContext>());
        }
        else if (string.Equals(config["Database:Provider"], "SqlServer", StringComparison.OrdinalIgnoreCase))
        {
            services.AddDbContext<AppDbContext>((sp, o) => o.UseSqlServer(
                sp.GetRequiredService<IConfiguration>().GetConnectionString("Default")
                ?? throw new InvalidOperationException("Thiếu ConnectionStrings:Default.")));
        }
        else
        {
            throw new InvalidOperationException("Database:Provider phải là SqlServer hoặc PostgreSql.");
        }
        return services;
    }

    public static string PostgresConnection(IConfiguration config)
    {
        var raw = config.GetConnectionString("Default");
        if (string.IsNullOrWhiteSpace(raw)) raw = config["DATABASE_URL"];
        if (string.IsNullOrWhiteSpace(raw))
            throw new InvalidOperationException("Thiếu ConnectionStrings:Default hoặc DATABASE_URL cho PostgreSQL.");
        if (!raw.StartsWith("postgres://", StringComparison.OrdinalIgnoreCase)
            && !raw.StartsWith("postgresql://", StringComparison.OrdinalIgnoreCase))
            return new NpgsqlConnectionStringBuilder(raw) { IncludeErrorDetail = false, PersistSecurityInfo = false }.ConnectionString;

        var uri = new Uri(raw);
        var credentials = uri.UserInfo.Split(':', 2);
        if (credentials.Length != 2 || uri.AbsolutePath.Length <= 1)
            throw new InvalidOperationException("DATABASE_URL cần có user, password và tên database.");
        var cs = new NpgsqlConnectionStringBuilder
        {
            Host = uri.Host,
            Port = uri.IsDefaultPort || uri.Port < 0 ? 5432 : uri.Port,
            Username = Uri.UnescapeDataString(credentials[0]),
            Password = Uri.UnescapeDataString(credentials[1]),
            Database = Uri.UnescapeDataString(uri.AbsolutePath.TrimStart('/')),
            // Render dùng chứng chỉ tự ký ở địa chỉ private; chỉ cho Require với host nội bộ Render đã nhận diện.
            SslMode = config["RENDER"] == "true" && System.Text.RegularExpressions.Regex.IsMatch(uri.Host, @"^dpg-[a-z0-9]+-[a-z]$")
                ? SslMode.Require : SslMode.VerifyFull,
            Timeout = 15,
            CommandTimeout = 30,
            MaxPoolSize = 20,
            IncludeErrorDetail = false,
            PersistSecurityInfo = false,
        };
        // Không hạ TLS theo query string của URL; địa chỉ public xác minh chứng chỉ/hostname.
        return cs.ConnectionString;
    }
}

public sealed class SqlServerDesignTimeFactory : IDesignTimeDbContextFactory<AppDbContext>
{
    public AppDbContext CreateDbContext(string[] args) => new(new DbContextOptionsBuilder<AppDbContext>()
        .UseSqlServer(@"Server=(localdb)\MSSQLLocalDB;Database=NguyenDuongNhutKhang_APIGAME_Dev;Trusted_Connection=True;TrustServerCertificate=True").Options);
}

public sealed class PostgresDesignTimeFactory : IDesignTimeDbContextFactory<PostgresAppDbContext>
{
    public PostgresAppDbContext CreateDbContext(string[] args)
    {
        var config = new ConfigurationBuilder().AddEnvironmentVariables().AddCommandLine(args).Build();
        var cs = config.GetConnectionString("Default") == null && config["DATABASE_URL"] == null
            ? "Host=localhost;Database=gamehub_dotnet_design;Username=postgres"
            : DatabaseSetup.PostgresConnection(config);
        return new(new DbContextOptionsBuilder<PostgresAppDbContext>().UseNpgsql(cs).Options);
    }
}
