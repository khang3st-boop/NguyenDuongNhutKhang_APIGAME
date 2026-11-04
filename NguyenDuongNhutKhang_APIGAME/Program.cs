using System.Text.Json.Serialization;
using System.Threading.RateLimiting;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using NguyenDuongNhutKhang_APIGAME.Configuration;
using NguyenDuongNhutKhang_APIGAME.Data;
using NguyenDuongNhutKhang_APIGAME.Hubs;
using NguyenDuongNhutKhang_APIGAME.Middleware;
using NguyenDuongNhutKhang_APIGAME.Models;
using NguyenDuongNhutKhang_APIGAME.Services;

var builder = WebApplication.CreateBuilder(args);
builder.ConfigureGameHubHosting();
var services = builder.Services;

// ---------------------------------------------------------------- cấu hình
services.AddOptions<JwtOptions>().Bind(builder.Configuration.GetSection(JwtOptions.Section))
    .Validate(o => builder.Environment.IsDevelopment() || (!string.IsNullOrWhiteSpace(o.Key)
        && System.Text.Encoding.UTF8.GetByteCount(o.Key) >= 32), "Production cần Jwt:Key riêng, tối thiểu 32 byte.")
    .Validate(o => !string.IsNullOrWhiteSpace(o.Issuer) && !string.IsNullOrWhiteSpace(o.Audience), "JWT cần Issuer và Audience.")
    .ValidateOnStart();
services.AddOptions<AuthOptions>().Bind(builder.Configuration.GetSection(AuthOptions.Section));
services.AddOptions<EmailOptions>().Bind(builder.Configuration.GetSection(EmailOptions.Section));
services.AddOptions<SeedOptions>().Bind(builder.Configuration.GetSection(SeedOptions.Section));
services.AddSingleton(TimeProvider.System);

// ---------------------------------------------------------------- database
// Development: SqlServer/LocalDB; Production: PostgreSql/context và migration riêng.
services.AddGameHubDatabase(builder.Configuration);

// ---------------------------------------------------------------- Identity
services.AddIdentityCore<AppUser>(o =>
    {
        o.Password.RequiredLength = 8;
        o.Password.RequireDigit = true;
        o.Password.RequireLowercase = false;
        o.Password.RequireUppercase = false;
        o.Password.RequireNonAlphanumeric = false;
        o.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_.";
        o.Lockout.AllowedForNewUsers = true;
        o.Lockout.MaxFailedAccessAttempts = 5;
        o.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
    })
    .AddRoles<AppRole>()
    .AddEntityFrameworkStores<AppDbContext>();

// ---------------------------------------------------------------- JWT
services.AddSingleton<JwtSigning>();
services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer();
services.AddOptions<JwtBearerOptions>(JwtBearerDefaults.AuthenticationScheme)
    .Configure<JwtSigning, IOptions<JwtOptions>>((o, signing, jwt) =>
    {
        o.MapInboundClaims = false;
        o.TokenValidationParameters = new TokenValidationParameters
        {
            // Xác minh đầy đủ: chữ ký, issuer, audience, thời hạn.
            ValidateIssuer = true,
            ValidIssuer = jwt.Value.Issuer,
            ValidateAudience = true,
            ValidAudience = jwt.Value.Audience,
            ValidateLifetime = true,
            RequireExpirationTime = true,
            RequireSignedTokens = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = signing.Key,
            ValidAlgorithms = [SecurityAlgorithms.HmacSha256],
            ClockSkew = TimeSpan.FromSeconds(30),
            NameClaimType = "unique_name",
            RoleClaimType = "role",
        };
        o.Events = new JwtBearerEvents
        {
            // WebSocket của SignalR không gửi được header → nhận token qua ?access_token= (chỉ cho /hubs).
            OnMessageReceived = ctx =>
            {
                var token = ctx.Request.Query["access_token"];
                if (!string.IsNullOrEmpty(token) && ctx.HttpContext.Request.Path.StartsWithSegments("/hubs"))
                    ctx.Token = token;
                return Task.CompletedTask;
            },
            // Token đúng chữ ký nhưng đã bị thu hồi (đổi mật khẩu / đăng xuất mọi nơi / đổi role) → từ chối.
            OnTokenValidated = async ctx =>
            {
                var sub = ctx.Principal?.FindFirst("sub")?.Value;
                var sv = ctx.Principal?.FindFirst(TokenService.VersionClaim)?.Value;
                if (!Guid.TryParse(sub, out var userId) || !int.TryParse(sv, out var version))
                {
                    ctx.Fail("invalid claims");
                    return;
                }
                var db = ctx.HttpContext.RequestServices.GetRequiredService<AppDbContext>();
                var current = await db.Users.Where(u => u.Id == userId).Select(u => (int?)u.TokenVersion).FirstOrDefaultAsync();
                if (current != version) ctx.Fail("revoked");
            },
            OnChallenge = async ctx =>
            {
                ctx.HandleResponse();
                await ErrorWriter.WriteAsync(ctx.HttpContext, 401, "UNAUTHORIZED", "Bạn cần đăng nhập (token thiếu, sai hoặc đã hết hạn).");
            },
            OnForbidden = ctx =>
                ErrorWriter.WriteAsync(ctx.HttpContext, 403, "FORBIDDEN", "Bạn không có quyền truy cập chức năng này."),
        };
    });
services.AddAuthorization();

// ---------------------------------------------------------------- giới hạn tần suất
services.AddRateLimiter(o =>
{
    var perMinute = builder.Configuration.GetValue("RateLimit:AuthPerMinute", 10);
    o.AddPolicy("auth", ctx => RateLimitPartition.GetFixedWindowLimiter(
        ctx.Connection.RemoteIpAddress?.ToString() ?? "unknown",
        _ => new FixedWindowRateLimiterOptions { PermitLimit = perMinute, Window = TimeSpan.FromMinutes(1), QueueLimit = 0 }));
    o.OnRejected = (ctx, _) => new ValueTask(ErrorWriter.WriteAsync(ctx.HttpContext, 429, "RATE_LIMITED",
        "Bạn thao tác quá nhiều lần, vui lòng thử lại sau 1 phút."));
});

// ---------------------------------------------------------------- MVC + JSON + validation
services.AddControllers()
    .AddJsonOptions(o =>
    {
        o.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.Never;
        o.AllowInputFormatterExceptionMessages = false;
    })
    .ConfigureApiBehaviorOptions(o => o.InvalidModelStateResponseFactory = ErrorWriter.Validation);

// ---------------------------------------------------------------- dịch vụ ứng dụng
services.AddScoped<ITokenService, TokenService>();
services.AddScoped<IAuthService, AuthService>();
services.AddAuthV2(builder.Configuration);
services.AddScoped<IUserService, UserService>();
services.AddGameHubServices(builder.Configuration);

// ---------------------------------------------------------------- OpenAPI / Swagger
services.AddGameHubOpenApi();
services.AddCors(o => o.AddDefaultPolicy(p =>
{
    var origins = builder.Configuration.GetSection("Cors:Origins").Get<string[]>() ?? [];
    if (origins.Length > 0) p.WithOrigins(origins).AllowAnyHeader().AllowAnyMethod().AllowCredentials();
}));

var app = builder.Build();

// Thiếu JWT Production phải dừng trước khi sửa schema hoặc seed database.
if (!app.Environment.IsDevelopment()) _ = app.Services.GetRequiredService<JwtSigning>();

await DbSeeder.InitializeAsync(app.Services);

if (args.Length == 1 && args[0] == "migrate") return;

// Lệnh quản trị cục bộ (không qua HTTP): dotnet run -- grant-admin <username>
if (args.Length == 2 && args[0] == "grant-admin")
{
    Environment.ExitCode = await DbSeeder.GrantAdminAsync(app.Services, args[1]);
    return;
}

app.UseForwardedHeaders();
app.UseMiddleware<ErrorHandlingMiddleware>();

// Swagger/OpenAPI: luôn bật ở Development; ở môi trường khác chỉ bật khi đặt rõ Swagger:Enabled=true (mặc định false).
if (app.Environment.IsDevelopment() || app.Configuration.GetValue<bool>("Swagger:Enabled"))
{
    app.MapOpenApi();
    app.UseSwaggerUI(o =>
    {
        o.SwaggerEndpoint("/openapi/v1.json", "Game Hub API v1");
        o.RoutePrefix = "swagger";
        o.DocumentTitle = "Game Hub API — Swagger";
        o.EnablePersistAuthorization();
        o.DisplayRequestDuration();
    });
    app.MapGet("/", () => Results.Redirect("/swagger")).ExcludeFromDescription();
}

if (!app.Environment.IsDevelopment())
{
    // Development giữ HTTP để máy ảo Android (10.0.2.2:5292) gọi được.
    app.UseHsts();
    // Health probe nội bộ Render dùng HTTP; các endpoint nghiệp vụ chuyển sang HTTPS sau khi xử lý forwarded headers.
    app.UseWhen(ctx => ctx.Request.Path != "/health" && ctx.Request.Path != "/health/live",
        branch => branch.UseHttpsRedirection());
}
app.UseCors();
app.UseAuthentication();
app.UseMiddleware<PresenceMiddleware>();
app.UseRateLimiter();
app.UseAuthorization();

app.MapControllers();
app.MapGet("/health/live", () => Results.Ok(new { status = "UP" })).AllowAnonymous().ExcludeFromDescription();
app.MapHub<GameHub>("/hubs/game");

app.Run();

/// <summary>Khai báo để project test dùng WebApplicationFactory&lt;Program&gt;.</summary>
public partial class Program;
