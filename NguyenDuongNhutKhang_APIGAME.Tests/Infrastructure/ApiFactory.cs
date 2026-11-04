using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Security.Cryptography;
using System.Text.Json;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Time.Testing;
using Npgsql;
using NguyenDuongNhutKhang_APIGAME.Data;

namespace NguyenDuongNhutKhang_APIGAME.Tests.Infrastructure;

/// <summary>
/// Chạy chính Program.cs trên database RIÊNG mỗi lần: LocalDB hoặc PostgreSQL qua GAMEHUB_TEST_POSTGRES,
/// migrate bằng migration thật và tự xoá database đó khi xong (GAMEHUB_TEST_KEEP_DB=1 để giữ). Không đụng database phát triển.
/// </summary>
public class ApiFactory : WebApplicationFactory<Program>, IAsyncLifetime
{
    public string DatabaseName { get; } = "NguyenDuongNhutKhang_APIGAME_Test_" + Guid.NewGuid().ToString("N")[..10];
    public bool IsPostgres => !string.IsNullOrWhiteSpace(Environment.GetEnvironmentVariable("GAMEHUB_TEST_POSTGRES"));
    public string ConnectionString => IsPostgres
        ? new NpgsqlConnectionStringBuilder(Environment.GetEnvironmentVariable("GAMEHUB_TEST_POSTGRES"))
            { Database = DatabaseName.ToLowerInvariant(), Pooling = false }.ConnectionString
        : $@"Server=(localdb)\MSSQLLocalDB;Database={DatabaseName};Trusted_Connection=True;TrustServerCertificate=True";

    /// <summary>Khoá JWT ngẫu nhiên chỉ sống trong tiến trình test (để tự ký token giả mạo kiểm tra từ chối).</summary>
    public string JwtKey { get; } = Convert.ToBase64String(RandomNumberGenerator.GetBytes(48));

    /// <summary>Đồng hồ giả: test hết hạn sẵn sàng / hết giờ lượt mà không phải chờ thật.</summary>
    public FakeTimeProvider Clock { get; } = new(DateTimeOffset.UtcNow);

    public const string Issuer = "GameHub.Api";
    public const string Audience = "GameHub.Client";

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.UseEnvironment("Development");
        builder.ConfigureAppConfiguration((_, config) => config.AddInMemoryCollection(new Dictionary<string, string?>
        {
            ["ConnectionStrings:Default"] = ConnectionString,
            ["Database:Provider"] = IsPostgres ? "PostgreSql" : "SqlServer",
            ["Database:MigrateOnStartup"] = "true",
            ["Database:RequireExisting"] = "false", // chỉ database test có tên ngẫu nhiên được tạo lần đầu
            ["Jwt:Key"] = JwtKey,
            ["Jwt:Issuer"] = Issuer,
            ["Jwt:Audience"] = Audience,
            ["Seed:AdminUsername"] = "",
            ["Seed:AdminPassword"] = "",
            ["Online:Housekeeping"] = "false", // test gọi TickAsync trực tiếp
            ["RateLimit:AuthPerMinute"] = "10000",
        }));
        builder.ConfigureServices(services =>
        {
            // Minimal-hosting chọn provider trước ConfigureAppConfiguration của test; thay alias cho context PG thật.
            if (IsPostgres)
            {
                services.RemoveAll<AppDbContext>();
                services.AddDbContext<PostgresAppDbContext>(o => o.UseNpgsql(ConnectionString));
                services.AddScoped<AppDbContext>(sp => sp.GetRequiredService<PostgresAppDbContext>());
            }
            services.RemoveAll<TimeProvider>();
            services.AddSingleton<TimeProvider>(Clock);
        });
    }

    public Task InitializeAsync()
    {
        _ = Server; // khởi động host → migrate database test
        return Task.CompletedTask;
    }

    async Task IAsyncLifetime.DisposeAsync()
    {
        await base.DisposeAsync();
        await DropTestDatabaseAsync();
    }

    /// <summary>
    /// Xoá đúng database ngẫu nhiên do chính factory này tạo (tên có tiền tố cố định) để không để lại database tồn đọng.
    /// Đặt GAMEHUB_TEST_KEEP_DB=1 để giữ lại kiểm tra thủ công. Lỗi dọn dẹp chỉ cảnh báo, không làm hỏng test.
    /// </summary>
    private async Task DropTestDatabaseAsync()
    {
        const string prefix = "NguyenDuongNhutKhang_APIGAME_Test_";
        if (Environment.GetEnvironmentVariable("GAMEHUB_TEST_KEEP_DB") == "1") return;
        if (!DatabaseName.StartsWith(prefix, StringComparison.Ordinal) || DatabaseName.Length != prefix.Length + 10) return;
        try
        {
            if (IsPostgres)
            {
                NpgsqlConnection.ClearAllPools();
                var admin = new NpgsqlConnectionStringBuilder(ConnectionString) { Database = "postgres", Pooling = false };
                await using var pg = new NpgsqlConnection(admin.ConnectionString);
                await pg.OpenAsync();
                await using var cmd = pg.CreateCommand();
                cmd.CommandText = $"DROP DATABASE IF EXISTS \"{DatabaseName.ToLowerInvariant()}\" WITH (FORCE)";
                await cmd.ExecuteNonQueryAsync();
            }
            else
            {
                Microsoft.Data.SqlClient.SqlConnection.ClearAllPools();
                await using var sql = new Microsoft.Data.SqlClient.SqlConnection(
                    @"Server=(localdb)\MSSQLLocalDB;Database=master;Trusted_Connection=True;TrustServerCertificate=True");
                await sql.OpenAsync();
                await using var cmd = sql.CreateCommand();
                cmd.CommandText = $"IF DB_ID(N'{DatabaseName}') IS NOT NULL BEGIN ALTER DATABASE [{DatabaseName}] SET SINGLE_USER WITH ROLLBACK IMMEDIATE; DROP DATABASE [{DatabaseName}]; END";
                await cmd.ExecuteNonQueryAsync();
            }
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"[test cleanup] không xoá được database test {DatabaseName}: {ex.GetType().Name}");
        }
    }

    public async Task<T> WithDbAsync<T>(Func<AppDbContext, Task<T>> work)
    {
        using var scope = Services.CreateScope();
        return await work(scope.ServiceProvider.GetRequiredService<AppDbContext>());
    }

    public async Task WithScopeAsync(Func<IServiceProvider, Task> work)
    {
        using var scope = Services.CreateScope();
        await work(scope.ServiceProvider);
    }

    /// <summary>Đăng ký tài khoản mới (mật khẩu ngẫu nhiên, không in ra) và trả client đã gắn token.</summary>
    public async Task<TestUser> RegisterAsync(string tag = "u")
    {
        var username = $"{tag}_{Guid.NewGuid().ToString("N")[..8]}";
        var password = "Pw" + Convert.ToHexString(RandomNumberGenerator.GetBytes(6)) + "1";
        var client = CreateClient();
        var res = await client.PostAsJsonAsync("/api/v1/auth/register", new { username, displayName = "Test " + tag, password });
        res.EnsureSuccessStatusCode();
        var body = await res.Content.ReadFromJsonAsync<JsonElement>();
        var token = body.GetProperty("accessToken").GetString()!;
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
        return new TestUser(Guid.Parse(body.GetProperty("user").GetProperty("id").GetString()!), username, password,
            token, body.GetProperty("refreshToken").GetString()!, client);
    }
}

public record TestUser(Guid Id, string Username, string Password, string AccessToken, string RefreshToken, HttpClient Client);

[CollectionDefinition(Name)]
public class ApiCollection : ICollectionFixture<ApiFactory>
{
    public const string Name = "api";
}

public static class HttpJson
{
    public static async Task<JsonElement> JsonAsync(this HttpResponseMessage res)
    {
        var text = await res.Content.ReadAsStringAsync();
        return string.IsNullOrEmpty(text) ? default : JsonDocument.Parse(text).RootElement.Clone();
    }

    public static string Str(this JsonElement e, string name) => e.GetProperty(name).GetString()!;
}
