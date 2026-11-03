using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Npgsql;
using NguyenDuongNhutKhang_APIGAME.Data;
using NguyenDuongNhutKhang_APIGAME.Models;
using NguyenDuongNhutKhang_APIGAME.Tests.Infrastructure;

namespace NguyenDuongNhutKhang_APIGAME.Tests.Integration;

[Collection(ApiCollection.Name)]
public class DatabaseStartupTests(ApiFactory api)
{
    [Fact]
    public async Task Concurrent_match_updates_reject_the_stale_writer_on_both_providers()
    {
        var host = await api.RegisterAsync("version");
        var id = await api.WithDbAsync(async db =>
        {
            var room = new MatchRoom { HostId = host.Id, Game = "puzzle", Mode = "3x3", Status = "CANCELLED", Code = "QATEST" };
            db.MatchRooms.Add(room);
            await db.SaveChangesAsync();
            return room.Id;
        });
        using var firstScope = api.Services.CreateScope();
        using var secondScope = api.Services.CreateScope();
        var first = firstScope.ServiceProvider.GetRequiredService<AppDbContext>();
        var second = secondScope.ServiceProvider.GetRequiredService<AppDbContext>();
        var a = await first.MatchRooms.SingleAsync(r => r.Id == id);
        var b = await second.MatchRooms.SingleAsync(r => r.Id == id);
        a.Mode = "4x4";
        await first.SaveChangesAsync();
        b.Mode = "5x5";
        await Assert.ThrowsAsync<DbUpdateConcurrencyException>(() => second.SaveChangesAsync());
    }

    [Fact]
    public async Task Repeated_and_concurrent_initialization_preserves_users_roles_and_migrations()
    {
        var user = await api.RegisterAsync("seed");
        var before = await api.WithDbAsync(async db => new
        {
            Users = await db.Users.CountAsync(),
            Roles = await db.Roles.CountAsync(),
            UserRoles = await db.UserRoles.CountAsync(),
            Results = await db.GameResults.CountAsync(),
            Password = await db.Users.Where(u => u.Id == user.Id).Select(u => u.PasswordHash).SingleAsync(),
            Migrations = (await db.Database.GetAppliedMigrationsAsync()).ToArray(),
        });
        var config = api.Services.GetRequiredService<IConfiguration>();
        var previous = config["Database:RequireExisting"];
        try
        {
            config["Database:RequireExisting"] = "true";
            await Task.WhenAll(Enumerable.Range(0, 3).Select(_ => DbSeeder.InitializeAsync(api.Services)));
        }
        finally
        {
            config["Database:RequireExisting"] = previous;
        }

        await api.WithDbAsync(async db =>
        {
            Assert.Equal(before.Users, await db.Users.CountAsync());
            Assert.Equal(before.Roles, await db.Roles.CountAsync());
            Assert.Equal(before.UserRoles, await db.UserRoles.CountAsync());
            Assert.Equal(before.Results, await db.GameResults.CountAsync());
            Assert.Equal(before.Password, await db.Users.Where(u => u.Id == user.Id).Select(u => u.PasswordHash).SingleAsync());
            Assert.Equal(before.Migrations, (await db.Database.GetAppliedMigrationsAsync()).ToArray());
            Assert.Empty(await db.Database.GetPendingMigrationsAsync());
            return true;
        });
    }

    [Fact]
    public async Task Missing_required_database_fails_before_creation_and_logs_target_without_secrets()
    {
        var name = "APIGAME_Missing_" + Guid.NewGuid().ToString("N");
        const string secret = "MustNotAppearInStartupLogs123";
        var cs = api.IsPostgres
            ? new NpgsqlConnectionStringBuilder(api.ConnectionString) { Database = name.ToLowerInvariant(), Timeout = 3 }.ConnectionString
            : $@"Server=(localdb)\MSSQLLocalDB;Database={name};Integrated Security=True;TrustServerCertificate=True;Connect Timeout=3;Password={secret}";
        var config = new ConfigurationBuilder().AddInMemoryCollection(new Dictionary<string, string?>
        {
            ["Database:RequireExisting"] = "true",
            ["Database:MigrateOnStartup"] = "true",
        }).Build();
        var logs = new CapturedLogs();
        var services = new ServiceCollection();
        services.AddSingleton<IConfiguration>(config);
        services.AddLogging(b => b.AddProvider(logs));
        if (api.IsPostgres)
        {
            services.AddDbContext<PostgresAppDbContext>(o => o.UseNpgsql(cs));
            services.AddScoped<AppDbContext>(sp => sp.GetRequiredService<PostgresAppDbContext>());
        }
        else services.AddDbContext<AppDbContext>(o => o.UseSqlServer(cs));
        await using var provider = services.BuildServiceProvider();

        var startupError = await Assert.ThrowsAnyAsync<Exception>(() => DbSeeder.InitializeAsync(provider));
        Assert.DoesNotContain(logs.Messages, m => m.Contains(secret) || m.Contains("Password="));

        if (api.IsPostgres)
        {
            var pgError = Assert.IsType<PostgresException>(startupError.GetBaseException());
            Assert.Equal(PostgresErrorCodes.InvalidCatalogName, pgError.SqlState);
            Assert.Contains(logs.Messages, m => m.Contains(name.ToLowerInvariant()) && m.Contains(pgError.SqlState));
            await using var pg = new NpgsqlConnection(new NpgsqlConnectionStringBuilder(cs) { Database = "postgres" }.ConnectionString);
            await pg.OpenAsync();
            await using var check = pg.CreateCommand();
            check.CommandText = "SELECT COUNT(*) FROM pg_database WHERE datname=@name";
            check.Parameters.AddWithValue("name", name.ToLowerInvariant());
            Assert.Equal(0L, await check.ExecuteScalarAsync());
            return;
        }

        var error = Assert.IsType<SqlException>(startupError.GetBaseException());
        Assert.Contains(error.Number, new[] { 4060, 18456 });
        Assert.Contains(logs.Messages, m => m.Contains(name) && m.Contains($"SQL {error.Number}"));

        var master = new SqlConnectionStringBuilder(cs) { InitialCatalog = "master" };
        await using var connection = new SqlConnection(master.ConnectionString);
        await connection.OpenAsync();
        await using var command = connection.CreateCommand();
        command.CommandText = "SELECT DB_ID(@name)";
        command.Parameters.AddWithValue("@name", name);
        Assert.Equal(DBNull.Value, await command.ExecuteScalarAsync());
    }

    private sealed class CapturedLogs : ILoggerProvider
    {
        public List<string> Messages { get; } = [];
        public ILogger CreateLogger(string categoryName) => new CaptureLogger(Messages);
        public void Dispose() { }

        private sealed class CaptureLogger(List<string> messages) : ILogger
        {
            public IDisposable? BeginScope<TState>(TState state) where TState : notnull => null;
            public bool IsEnabled(LogLevel logLevel) => true;
            public void Log<TState>(LogLevel level, EventId id, TState state, Exception? exception, Func<TState, Exception?, string> formatter)
                => messages.Add(formatter(state, exception));
        }
    }
}
