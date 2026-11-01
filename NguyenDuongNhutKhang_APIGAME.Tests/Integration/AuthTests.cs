using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using NguyenDuongNhutKhang_APIGAME.Data;
using NguyenDuongNhutKhang_APIGAME.Tests.Infrastructure;

namespace NguyenDuongNhutKhang_APIGAME.Tests.Integration;

[Collection(ApiCollection.Name)]
public class AuthTests(ApiFactory api)
{
    [Fact]
    public async Task Health_reports_database_up_and_openapi_has_bearer_scheme()
    {
        var client = api.CreateClient();
        var health = await (await client.GetAsync("/api/v1/health")).JsonAsync();
        Assert.Equal("UP", health.Str("status"));

        var doc = await client.GetStringAsync("/openapi/v1.json");
        Assert.Contains("Bearer", doc);
        Assert.Contains("/api/v1/matches/{id}/finish", doc);
    }

    [Fact]
    public async Task Register_creates_user_in_database_with_only_User_role()
    {
        var u = await api.RegisterAsync("reg");
        var me = await (await u.Client.GetAsync("/api/v1/users/me")).JsonAsync();
        Assert.Equal(new[] { "User" }, me.GetProperty("roles").EnumerateArray().Select(r => r.GetString()!).ToArray());

        var stored = await api.WithDbAsync(db => db.Users.AsNoTracking().SingleAsync(x => x.Id == u.Id));
        Assert.Equal(u.Username, stored.UserName);
        Assert.NotEqual(u.Password, stored.PasswordHash); // chỉ lưu hash
        Assert.True(await api.WithDbAsync(db => db.UserProfiles.AnyAsync(p => p.UserId == u.Id)));
    }

    [Fact]
    public async Task Register_rejects_role_field_and_never_echoes_password()
    {
        var client = api.CreateClient();
        var res = await client.PostAsJsonAsync("/api/v1/auth/register",
            new { username = "hacker_" + Guid.NewGuid().ToString("N")[..6], displayName = "Hacker", password = "Secret12345", role = "Admin" });
        Assert.Equal(HttpStatusCode.BadRequest, res.StatusCode);
        Assert.DoesNotContain("Secret12345", await res.Content.ReadAsStringAsync());

        var weak = await client.PostAsJsonAsync("/api/v1/auth/register", new { username = "weak_" + Guid.NewGuid().ToString("N")[..6], displayName = "Weak", password = "short" });
        var body = await weak.JsonAsync();
        Assert.Equal(HttpStatusCode.BadRequest, weak.StatusCode);
        Assert.Equal("VALIDATION", body.Str("code"));
        Assert.Contains(body.GetProperty("fieldErrors").EnumerateArray(), f => f.Str("field") == "password");
    }

    [Fact]
    public async Task Duplicate_username_is_conflict()
    {
        var u = await api.RegisterAsync("dup");
        var res = await api.CreateClient().PostAsJsonAsync("/api/v1/auth/register", new { username = u.Username.ToUpperInvariant(), displayName = "Dup", password = "Another123" });
        Assert.Equal(HttpStatusCode.Conflict, res.StatusCode);
    }

    [Fact]
    public async Task Login_with_wrong_password_is_401_without_detail()
    {
        var u = await api.RegisterAsync("login");
        var ok = await api.CreateClient().PostAsJsonAsync("/api/v1/auth/login", new { username = u.Username, password = u.Password });
        Assert.Equal(HttpStatusCode.OK, ok.StatusCode);

        var bad = await api.CreateClient().PostAsJsonAsync("/api/v1/auth/login", new { username = u.Username, password = "Wrong12345" });
        Assert.Equal(HttpStatusCode.Unauthorized, bad.StatusCode);
        var unknown = await api.CreateClient().PostAsJsonAsync("/api/v1/auth/login", new { username = "nobody_" + Guid.NewGuid().ToString("N")[..6], password = "Wrong12345" });
        // Cùng một thông báo → không lộ tài khoản có tồn tại hay không.
        Assert.Equal((await bad.JsonAsync()).Str("message"), (await unknown.JsonAsync()).Str("message"));
    }

    [Fact]
    public async Task Protected_endpoints_require_token_and_admin_requires_role()
    {
        Assert.Equal(HttpStatusCode.Unauthorized, (await api.CreateClient().GetAsync("/api/v1/users/me")).StatusCode);

        var u = await api.RegisterAsync("role");
        Assert.Equal(HttpStatusCode.Forbidden, (await u.Client.GetAsync("/api/v1/admin/users")).StatusCode);

        // Admin chỉ cấp qua cơ chế quản trị cục bộ (dotnet run -- grant-admin) → token cũ bị thu hồi.
        Assert.Equal(0, await DbSeeder.GrantAdminAsync(api.Services, u.Username));
        Assert.Equal(HttpStatusCode.Unauthorized, (await u.Client.GetAsync("/api/v1/users/me")).StatusCode);

        var login = await (await api.CreateClient().PostAsJsonAsync("/api/v1/auth/login", new { username = u.Username, password = u.Password })).JsonAsync();
        var admin = api.CreateClient();
        admin.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", login.Str("accessToken"));
        Assert.Equal(HttpStatusCode.OK, (await admin.GetAsync("/api/v1/admin/users")).StatusCode);
        Assert.Equal(HttpStatusCode.OK, (await admin.GetAsync("/api/v1/admin/stats")).StatusCode);
    }

    public static TheoryData<string> ForgedCases => ["wrong-key", "wrong-issuer", "wrong-audience", "expired", "unsigned"];

    [Theory]
    [MemberData(nameof(ForgedCases))]
    public async Task Forged_or_expired_tokens_are_rejected(string kind)
    {
        var u = await api.RegisterAsync("jwt");
        // Token hợp lệ tự ký bằng đúng khoá → 200 (chứng minh các ca dưới bị từ chối đúng lý do).
        Assert.Equal(HttpStatusCode.OK, await CallMe(Craft(u.Id, "valid")));
        Assert.Equal(HttpStatusCode.Unauthorized, await CallMe(Craft(u.Id, kind)));
    }

    private async Task<HttpStatusCode> CallMe(string token)
    {
        var client = api.CreateClient();
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
        return (await client.GetAsync("/api/v1/users/me")).StatusCode;
    }

    private string Craft(Guid userId, string kind)
    {
        var now = DateTime.UtcNow;
        var key = kind == "wrong-key" ? Encoding.UTF8.GetBytes(new string('x', 48)) : Encoding.UTF8.GetBytes(api.JwtKey);
        var descriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity([new Claim("sub", userId.ToString()), new Claim("sv", "0"), new Claim("role", "User")]),
            Issuer = kind == "wrong-issuer" ? "evil" : ApiFactory.Issuer,
            Audience = kind == "wrong-audience" ? "evil" : ApiFactory.Audience,
            NotBefore = kind == "expired" ? now.AddHours(-2) : now.AddSeconds(-5),
            IssuedAt = kind == "expired" ? now.AddHours(-2) : now.AddSeconds(-5),
            Expires = kind == "expired" ? now.AddHours(-1) : now.AddMinutes(10),
            SigningCredentials = kind == "unsigned" ? null : new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256),
        };
        return new JsonWebTokenHandler().CreateToken(descriptor);
    }

    [Fact]
    public async Task Refresh_rotates_and_reuse_or_logout_revokes()
    {
        var u = await api.RegisterAsync("refresh");
        var anon = api.CreateClient();
        var first = await anon.PostAsJsonAsync("/api/v1/auth/refresh", new { refreshToken = u.RefreshToken });
        Assert.Equal(HttpStatusCode.OK, first.StatusCode);
        var rotated = (await first.JsonAsync()).Str("refreshToken");
        Assert.NotEqual(u.RefreshToken, rotated);

        // Refresh token cũ không dùng lại được.
        Assert.Equal(HttpStatusCode.Unauthorized, (await anon.PostAsJsonAsync("/api/v1/auth/refresh", new { refreshToken = u.RefreshToken })).StatusCode);

        Assert.Equal(HttpStatusCode.NoContent, (await anon.PostAsJsonAsync("/api/v1/auth/logout", new { refreshToken = rotated })).StatusCode);
        Assert.Equal(HttpStatusCode.Unauthorized, (await anon.PostAsJsonAsync("/api/v1/auth/refresh", new { refreshToken = rotated })).StatusCode);
    }

    [Fact]
    public async Task Change_password_revokes_old_tokens_and_profile_update_persists()
    {
        var u = await api.RegisterAsync("pw");
        var upd = await u.Client.PutAsJsonAsync("/api/v1/users/me", new { displayName = "Tên Mới", bio = "Xin chào" });
        Assert.Equal(HttpStatusCode.OK, upd.StatusCode);
        Assert.Equal("Tên Mới", await api.WithDbAsync(db => db.UserProfiles.Where(x => x.UserId == u.Id).Select(x => x.DisplayName).SingleAsync()));

        var bad = await u.Client.PostAsJsonAsync("/api/v1/users/me/password", new { currentPassword = "Wrong12345", newPassword = "NewPass12345" });
        Assert.NotEqual(HttpStatusCode.OK, bad.StatusCode);
        Assert.NotEqual(HttpStatusCode.NoContent, bad.StatusCode);

        var ok = await u.Client.PostAsJsonAsync("/api/v1/users/me/password", new { currentPassword = u.Password, newPassword = "NewPass12345" });
        Assert.True(ok.IsSuccessStatusCode, ok.StatusCode.ToString());
        Assert.Equal(HttpStatusCode.Unauthorized, (await u.Client.GetAsync("/api/v1/users/me")).StatusCode);
        Assert.Equal(HttpStatusCode.OK, (await api.CreateClient().PostAsJsonAsync("/api/v1/auth/login", new { username = u.Username, password = "NewPass12345" })).StatusCode);
    }
}
