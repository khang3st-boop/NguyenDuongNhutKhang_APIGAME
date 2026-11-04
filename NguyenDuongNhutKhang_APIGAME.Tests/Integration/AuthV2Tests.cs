using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using NguyenDuongNhutKhang_APIGAME.Tests.Infrastructure;

namespace NguyenDuongNhutKhang_APIGAME.Tests.Integration;

/// <summary>Auth V2 khi backend CHƯA cấu hình email / Google (ApiFactory mặc định): phải báo thật, không giả vờ.</summary>
[Collection(ApiCollection.Name)]
public class AuthV2UnconfiguredTests(ApiFactory api)
{
    [Fact]
    public async Task Capabilities_are_all_false_and_endpoints_answer_AUTH_NOT_READY()
    {
        var c = api.CreateClient();
        var caps = await (await c.GetAsync("/api/v1/auth/capabilities")).JsonAsync();
        Assert.Equal("gamehub-auth-v2", caps.Str("contract"));
        Assert.False(caps.GetProperty("emailRegistration").GetBoolean());
        Assert.False(caps.GetProperty("passwordReset").GetBoolean());
        Assert.False(caps.GetProperty("googleIdToken").GetBoolean());

        var reg = await c.PostAsJsonAsync("/api/v1/auth/email/register",
            new { email = "a@example.com", username = "abc123", displayName = "Abc", password = "Matkhau123" });
        Assert.Equal(HttpStatusCode.ServiceUnavailable, reg.StatusCode);
        Assert.Equal("AUTH_NOT_READY", (await reg.JsonAsync()).Str("code"));

        var forgot = await c.PostAsJsonAsync("/api/v1/auth/password/forgot", new { email = "a@example.com" });
        Assert.Equal(HttpStatusCode.ServiceUnavailable, forgot.StatusCode);

        var google = await c.PostAsJsonAsync("/api/v1/auth/google", new { idToken = "a.b.c" });
        Assert.Equal(HttpStatusCode.ServiceUnavailable, google.StatusCode);
        Assert.Equal("AUTH_NOT_READY", (await google.JsonAsync()).Str("code"));
    }

    [Fact]
    public async Task Legacy_username_register_and_login_still_work()
    {
        var u = await api.RegisterAsync("legacy");
        var login = await api.CreateClient().PostAsJsonAsync("/api/v1/auth/login", new { username = u.Username, password = u.Password });
        Assert.Equal(HttpStatusCode.OK, login.StatusCode);
    }
}

/// <summary>Helper dùng chung cho các lớp test Auth V2 (email giả, khóa Google giả).</summary>
public abstract class AuthV2Base(AuthV2Factory factory)
{
    protected readonly AuthV2Factory api = factory;

    protected const string Pass = "Matkhau123";
    protected static string NewEmail() => $"khang.{Guid.NewGuid():N}@example.com";
    protected static string NewUser() => "u" + Guid.NewGuid().ToString("N")[..10];

    protected async Task<(HttpResponseMessage Res, JsonElement Body)> PostAsync(string path, object body, HttpClient? client = null)
    {
        var res = await (client ?? api.CreateClient()).PostAsJsonAsync("/api/v1/auth/" + path, body);
        return (res, await res.JsonAsync());
    }

    protected async Task<JsonElement> StartRegisterAsync(string email, string? username = null, string password = Pass)
    {
        var (res, body) = await PostAsync("email/register",
            new { email, username = username ?? NewUser(), displayName = "Nhựt Khang", password });
        Assert.Equal(HttpStatusCode.Accepted, res.StatusCode);
        return body;
    }

    protected async Task<(string Email, string Username, JsonElement Auth)> RegisterFullAsync()
    {
        var email = NewEmail();
        var username = NewUser();
        var ch = await StartRegisterAsync(email, username);
        var code = await api.Email.LastCodeAsync(email);
        var (res, body) = await PostAsync("email/verify", new { challengeId = ch.Str("challengeId"), code });
        Assert.Equal(HttpStatusCode.OK, res.StatusCode);
        return (email, username, body);
    }

    protected static string WrongCode(string real) => real == "000000" ? "000001" : "000000";

    protected static void AssertError(HttpResponseMessage res, JsonElement body, HttpStatusCode status, string code)
    {
        Assert.Equal(status, res.StatusCode);
        Assert.Equal(code, body.Str("code"));
    }

}

/// <summary>OTP + đăng ký + quên mật khẩu + Google trên backend đã cấu hình (email giả, khóa Google giả).</summary>
public class AuthV2Tests(AuthV2Factory factory) : AuthV2Base(factory), IClassFixture<AuthV2Factory>
{
    // ---------------------------------------------------------------- capabilities

    [Fact]
    public async Task Capabilities_reflect_real_configuration()
    {
        var caps = await (await api.CreateClient().GetAsync("/api/v1/auth/capabilities")).JsonAsync();
        Assert.Equal("gamehub-auth-v2", caps.Str("contract"));
        Assert.True(caps.GetProperty("emailRegistration").GetBoolean());
        Assert.True(caps.GetProperty("passwordReset").GetBoolean());
        Assert.True(caps.GetProperty("googleIdToken").GetBoolean());
    }

    // ---------------------------------------------------------------- OTP

    [Fact]
    public async Task Register_sends_a_six_digit_code_by_email_and_never_returns_it()
    {
        var email = NewEmail();
        var ch = await StartRegisterAsync(email);

        Assert.Equal(6, ch.GetProperty("codeLength").GetInt32());
        Assert.Equal(5, ch.GetProperty("remainingAttempts").GetInt32());
        Assert.Contains("***", ch.Str("maskedEmail"));
        Assert.DoesNotContain(email, ch.GetRawText());

        var code = await api.Email.LastCodeAsync(email);
        Assert.Matches(@"^\d{6}$", code);
        Assert.DoesNotContain(code, ch.GetRawText());

        var mail = api.Email.To(email).Single();
        Assert.Contains("Game Hub", mail.Subject);
        Assert.Contains("5 phút", mail.Html);
        Assert.Contains(code, mail.Html);
        Assert.Contains("bỏ qua", mail.Text); // dòng "nếu không phải bạn"

        // DB chỉ chứa hash có khóa, không có mã.
        var stored = await api.WithDbAsync(db => db.AuthChallenges.AsNoTracking().SingleAsync(c => c.Id == Guid.Parse(ch.Str("challengeId"))));
        Assert.DoesNotContain(code, stored.CodeHash);
        Assert.Equal(64, stored.CodeHash.Length);
        Assert.NotEqual(Pass, stored.PendingPasswordHash);
        Assert.False(await api.WithDbAsync(db => db.Users.AnyAsync(u => u.Email == email)), "chưa tạo tài khoản trước khi xác minh OTP");
    }

    [Fact]
    public async Task Valid_code_creates_the_user_with_only_User_role_and_working_tokens()
    {
        var (email, username, auth) = await RegisterFullAsync();

        var access = auth.Str("accessToken");
        var client = api.CreateClient();
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", access);
        var me = await (await client.GetAsync("/api/v1/users/me")).JsonAsync();
        Assert.Equal(new[] { "User" }, me.GetProperty("roles").EnumerateArray().Select(r => r.GetString()!).ToArray());

        var stored = await api.WithDbAsync(db => db.Users.AsNoTracking().SingleAsync(u => u.UserName == username));
        Assert.Equal(email, stored.Email);
        Assert.True(stored.EmailConfirmed);

        var refreshed = await api.CreateClient().PostAsJsonAsync("/api/v1/auth/refresh", new { refreshToken = auth.Str("refreshToken") });
        Assert.Equal(HttpStatusCode.OK, refreshed.StatusCode);

        var login = await api.CreateClient().PostAsJsonAsync("/api/v1/auth/login", new { username, password = Pass });
        Assert.Equal(HttpStatusCode.OK, login.StatusCode);
    }

    [Fact]
    public async Task Wrong_code_reports_remaining_attempts()
    {
        var email = NewEmail();
        var ch = await StartRegisterAsync(email);
        var code = await api.Email.LastCodeAsync(email);

        var (res, body) = await PostAsync("email/verify", new { challengeId = ch.Str("challengeId"), code = WrongCode(code) });
        AssertError(res, body, HttpStatusCode.BadRequest, "OTP_INVALID");
        Assert.Equal("4", body.GetProperty("fieldErrors").EnumerateArray()
            .Single(f => f.Str("field") == "remainingAttempts").Str("message"));
    }

    [Fact]
    public async Task Five_wrong_codes_lock_the_challenge_even_for_the_right_code()
    {
        var email = NewEmail();
        var ch = await StartRegisterAsync(email);
        var code = await api.Email.LastCodeAsync(email);
        var id = ch.Str("challengeId");

        for (var i = 0; i < 4; i++)
        {
            var (r, b) = await PostAsync("email/verify", new { challengeId = id, code = WrongCode(code) });
            AssertError(r, b, HttpStatusCode.BadRequest, "OTP_INVALID");
        }
        var (res, body) = await PostAsync("email/verify", new { challengeId = id, code = WrongCode(code) });
        AssertError(res, body, HttpStatusCode.TooManyRequests, "OTP_ATTEMPTS_EXCEEDED");

        var (res2, body2) = await PostAsync("email/verify", new { challengeId = id, code });
        AssertError(res2, body2, HttpStatusCode.TooManyRequests, "OTP_ATTEMPTS_EXCEEDED");
        Assert.False(await api.WithDbAsync(db => db.Users.AnyAsync(u => u.Email == email)));
    }

    [Fact]
    public async Task Code_is_single_use()
    {
        var email = NewEmail();
        var ch = await StartRegisterAsync(email);
        var code = await api.Email.LastCodeAsync(email);
        var req = new { challengeId = ch.Str("challengeId"), code };

        Assert.Equal(HttpStatusCode.OK, (await PostAsync("email/verify", req)).Res.StatusCode);
        var (res, body) = await PostAsync("email/verify", req);
        AssertError(res, body, HttpStatusCode.BadRequest, "OTP_INVALID");
    }

    [Fact]
    public async Task Concurrent_verifies_create_exactly_one_account()
    {
        var email = NewEmail();
        var ch = await StartRegisterAsync(email);
        var code = await api.Email.LastCodeAsync(email);
        var req = new { challengeId = ch.Str("challengeId"), code };

        var results = await Task.WhenAll(Enumerable.Range(0, 4).Select(_ => PostAsync("email/verify", req)));
        Assert.Equal(1, results.Count(r => r.Res.StatusCode == HttpStatusCode.OK));
        Assert.Equal(1, await api.WithDbAsync(db => db.Users.CountAsync(u => u.Email == email)));
    }

    [Fact]
    public async Task Sends_per_email_are_limited_per_hour()
    {
        var email = NewEmail();
        for (var i = 0; i < 5; i++) await StartRegisterAsync(email);

        var (res, body) = await PostAsync("email/register",
            new { email, username = NewUser(), displayName = "Khang", password = Pass });
        AssertError(res, body, HttpStatusCode.TooManyRequests, "RATE_LIMITED");
        Assert.True(res.Headers.RetryAfter?.Delta?.TotalSeconds > 0);
        Assert.Equal(5, api.Email.To(email).Count);
    }

    // ---------------------------------------------------------------- đăng ký: trùng, đầu vào, lỗi nhà cung cấp

    [Fact]
    public async Task Duplicate_email_and_username_are_rejected_and_legacy_users_are_unaffected()
    {
        var (email, username, _) = await RegisterFullAsync();

        var (r1, b1) = await PostAsync("email/register", new { email, username = NewUser(), displayName = "Khang", password = Pass });
        AssertError(r1, b1, HttpStatusCode.Conflict, "EMAIL_TAKEN");
        var (r2, b2) = await PostAsync("email/register", new { email = NewEmail(), username, displayName = "Khang", password = Pass });
        AssertError(r2, b2, HttpStatusCode.Conflict, "USERNAME_TAKEN");

        // Tài khoản cũ chỉ có username (Email = null) vẫn tồn tại song song và vẫn đăng nhập được.
        var legacy = await api.RegisterAsync("legacy");
        var again = await api.CreateClient().PostAsJsonAsync("/api/v1/auth/login", new { username = legacy.Username, password = legacy.Password });
        Assert.Equal(HttpStatusCode.OK, again.StatusCode);
        await StartRegisterAsync(NewEmail());
    }

    [Fact]
    public async Task Invalid_input_is_rejected_and_roles_cannot_be_chosen()
    {
        var (r1, b1) = await PostAsync("email/register", new { email = "khong-phai-email", username = NewUser(), displayName = "Khang", password = Pass });
        AssertError(r1, b1, HttpStatusCode.BadRequest, "INVALID_EMAIL");

        var (r2, _) = await PostAsync("email/register", new { email = NewEmail(), username = NewUser(), displayName = "Khang", password = "123" });
        Assert.Equal(HttpStatusCode.BadRequest, r2.StatusCode);

        // Trường lạ (role / isAdmin) bị từ chối thay vì bị bỏ qua âm thầm.
        var (r3, _) = await PostAsync("email/register",
            new { email = NewEmail(), username = NewUser(), displayName = "Khang", password = Pass, role = "Admin" });
        Assert.Equal(HttpStatusCode.BadRequest, r3.StatusCode);

        var (r4, _) = await PostAsync("email/verify", new { challengeId = Guid.NewGuid().ToString(), code = "12ab56" });
        Assert.Equal(HttpStatusCode.BadRequest, r4.StatusCode);
        var (r5, b5) = await PostAsync("email/verify", new { challengeId = Guid.NewGuid().ToString(), code = "123456" });
        AssertError(r5, b5, HttpStatusCode.BadRequest, "OTP_INVALID");
    }

    [Theory]
    [InlineData(false, HttpStatusCode.BadGateway, "EMAIL_PROVIDER_REJECTED")]
    [InlineData(true, HttpStatusCode.ServiceUnavailable, "EMAIL_SEND_FAILED")]
    public async Task Email_provider_failure_is_reported_honestly_and_leaves_no_challenge(bool transient, HttpStatusCode status, string code)
    {
        var email = NewEmail();
        api.Email.FailTransient = transient;
        try
        {
            var (res, body) = await PostAsync("email/register", new { email, username = NewUser(), displayName = "Khang", password = Pass });
            AssertError(res, body, status, code);
        }
        finally
        {
            api.Email.FailTransient = null;
        }
        Assert.False(await api.WithDbAsync(db => db.AuthChallenges.AnyAsync(c => c.Email == email)));
        Assert.Empty(api.Email.To(email));
    }

    // ---------------------------------------------------------------- quên mật khẩu

    [Fact]
    public async Task Forgot_password_full_flow_resets_password_revokes_sessions_and_does_not_log_in()
    {
        var (email, username, auth) = await RegisterFullAsync();
        var oldAccess = auth.Str("accessToken");
        var oldRefresh = auth.Str("refreshToken");
        var newPass = "MatkhauMoi456";

        var (fr, forgot) = await PostAsync("password/forgot", new { email });
        Assert.Equal(HttpStatusCode.Accepted, fr.StatusCode);
        Assert.Equal("passwordReset", forgot.Str("purpose"));
        var code = await api.Email.LastCodeAsync(email, expectedCount: 2); // thư 1 = đăng ký, thư 2 = quên mật khẩu

        var (vr, verified) = await PostAsync("password/verify-otp", new { challengeId = forgot.Str("challengeId"), code });
        Assert.Equal(HttpStatusCode.OK, vr.StatusCode);
        Assert.False(verified.TryGetProperty("accessToken", out _), "xác minh OTP quên mật khẩu không được tự đăng nhập");
        var resetToken = verified.Str("resetToken");

        var (rr, _) = await PostAsync("password/reset", new { resetToken, newPassword = newPass });
        Assert.Equal(HttpStatusCode.NoContent, rr.StatusCode);

        // Phiên cũ bị thu hồi.
        var old = api.CreateClient();
        old.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", oldAccess);
        Assert.Equal(HttpStatusCode.Unauthorized, (await old.GetAsync("/api/v1/users/me")).StatusCode);
        Assert.Equal(HttpStatusCode.Unauthorized,
            (await api.CreateClient().PostAsJsonAsync("/api/v1/auth/refresh", new { refreshToken = oldRefresh })).StatusCode);

        // Mật khẩu cũ hết tác dụng, mật khẩu mới đăng nhập được.
        Assert.Equal(HttpStatusCode.Unauthorized,
            (await api.CreateClient().PostAsJsonAsync("/api/v1/auth/login", new { username, password = Pass })).StatusCode);
        Assert.Equal(HttpStatusCode.OK,
            (await api.CreateClient().PostAsJsonAsync("/api/v1/auth/login", new { username, password = newPass })).StatusCode);

        // Token dùng một lần.
        var (again, againBody) = await PostAsync("password/reset", new { resetToken, newPassword = "KhacNua789" });
        AssertError(again, againBody, HttpStatusCode.BadRequest, "RESET_TOKEN_INVALID");

        // Thư thông báo đã đổi mật khẩu được gửi (nền).
        var notice = await api.Email.WaitForAsync(email, expectedCount: 3);
        Assert.Contains("đã được thay đổi", notice.Subject);
    }

    [Fact]
    public async Task Weak_new_password_is_rejected_without_burning_the_reset_token()
    {
        var (email, username, _) = await RegisterFullAsync();
        var (_, forgot) = await PostAsync("password/forgot", new { email });
        var code = await api.Email.LastCodeAsync(email, expectedCount: 2);
        var (_, verified) = await PostAsync("password/verify-otp", new { challengeId = forgot.Str("challengeId"), code });
        var resetToken = verified.Str("resetToken");

        var (weak, weakBody) = await PostAsync("password/reset", new { resetToken, newPassword = "12345678" });
        Assert.Equal(HttpStatusCode.BadRequest, weak.StatusCode); // thiếu chữ → bị chặn (validation hoặc WEAK_PASSWORD)
        _ = weakBody;

        var (ok, _) = await PostAsync("password/reset", new { resetToken, newPassword = "MatkhauMoi456" });
        Assert.Equal(HttpStatusCode.NoContent, ok.StatusCode);
        Assert.Equal(HttpStatusCode.OK,
            (await api.CreateClient().PostAsJsonAsync("/api/v1/auth/login", new { username, password = "MatkhauMoi456" })).StatusCode);
    }

    [Fact]
    public async Task Forgot_password_does_not_reveal_whether_the_email_exists()
    {
        var unknown = NewEmail();
        var (res, body) = await PostAsync("password/forgot", new { email = unknown });
        Assert.Equal(HttpStatusCode.Accepted, res.StatusCode);
        Assert.Equal(6, body.GetProperty("codeLength").GetInt32());
        Assert.Equal(5, body.GetProperty("remainingAttempts").GetInt32());
        await api.Email.AssertNoMailAsync(unknown);

        // Challenge giả không bao giờ xác minh được, kể cả khi đoán trúng.
        for (var i = 0; i < 3; i++)
        {
            var (vr, vb) = await PostAsync("password/verify-otp", new { challengeId = body.Str("challengeId"), code = "123456" });
            AssertError(vr, vb, HttpStatusCode.BadRequest, "OTP_INVALID");
        }
    }

    [Fact]
    public async Task Register_challenge_cannot_be_used_to_reset_a_password()
    {
        var email = NewEmail();
        var ch = await StartRegisterAsync(email);
        var code = await api.Email.LastCodeAsync(email);
        var (res, body) = await PostAsync("password/verify-otp", new { challengeId = ch.Str("challengeId"), code });
        AssertError(res, body, HttpStatusCode.BadRequest, "OTP_INVALID");
    }

    // ---------------------------------------------------------------- Google

    [Fact]
    public async Task Google_login_creates_a_User_account_then_reuses_it_by_stable_sub()
    {
        var sub = "g-" + Guid.NewGuid().ToString("N");
        var email = NewEmail();

        var (r1, b1) = await PostAsync("google", new { idToken = api.Google.Token(sub, email) });
        Assert.Equal(HttpStatusCode.OK, r1.StatusCode);
        var id = b1.GetProperty("user").Str("id");

        var client = api.CreateClient();
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", b1.Str("accessToken"));
        var me = await (await client.GetAsync("/api/v1/users/me")).JsonAsync();
        Assert.Equal(new[] { "User" }, me.GetProperty("roles").EnumerateArray().Select(r => r.GetString()!).ToArray());

        var stored = await api.WithDbAsync(db => db.Users.AsNoTracking().SingleAsync(u => u.Id == Guid.Parse(id)));
        Assert.Equal(email, stored.Email);
        Assert.True(stored.EmailConfirmed);
        Assert.Null(stored.PasswordHash);

        // Google đổi email nhưng sub giữ nguyên → vẫn là cùng tài khoản.
        var (r2, b2) = await PostAsync("google", new { idToken = api.Google.Token(sub, NewEmail()) });
        Assert.Equal(HttpStatusCode.OK, r2.StatusCode);
        Assert.Equal(id, b2.GetProperty("user").Str("id"));

        var refreshed = await api.CreateClient().PostAsJsonAsync("/api/v1/auth/refresh", new { refreshToken = b1.Str("refreshToken") });
        Assert.Equal(HttpStatusCode.OK, refreshed.StatusCode);
    }

    [Fact]
    public async Task Google_rejects_bad_tokens()
    {
        var sub = "g-" + Guid.NewGuid().ToString("N");
        var email = NewEmail();
        var cases = new Dictionary<string, string>
        {
            ["rác"] = "not-a-jwt",
            ["sai audience"] = api.Google.Token(sub, email, audience: "someone-else.apps.googleusercontent.com"),
            ["sai issuer"] = api.Google.Token(sub, email, issuer: "https://evil.example.com"),
            ["hết hạn"] = api.Google.Token(sub, email, expires: DateTime.UtcNow.AddHours(-1), notBefore: DateTime.UtcNow.AddHours(-2)),
            ["sai chữ ký"] = api.Google.Token(sub, email, signWithOtherKey: true),
        };
        foreach (var (name, token) in cases)
        {
            var (res, body) = await PostAsync("google", new { idToken = token });
            Assert.True(res.StatusCode == HttpStatusCode.Unauthorized, $"{name}: {res.StatusCode}");
            Assert.Equal("GOOGLE_TOKEN_INVALID", body.Str("code"));
        }
        Assert.False(await api.WithDbAsync(db => db.Users.AnyAsync(u => u.Email == email)));
    }

    [Fact]
    public async Task Google_requires_a_verified_email()
    {
        var (res, body) = await PostAsync("google", new { idToken = api.Google.Token("g-" + Guid.NewGuid().ToString("N"), NewEmail(), emailVerified: false) });
        AssertError(res, body, HttpStatusCode.Unauthorized, "GOOGLE_EMAIL_NOT_VERIFIED");
    }

    [Fact]
    public async Task Google_never_trusts_client_supplied_email_or_user_id()
    {
        var token = api.Google.Token("g-" + Guid.NewGuid().ToString("N"), NewEmail());
        var (res, _) = await PostAsync("google", new { idToken = token, email = "admin@example.com", userId = Guid.NewGuid() });
        Assert.Equal(HttpStatusCode.BadRequest, res.StatusCode);
    }

    [Fact]
    public async Task Google_does_not_auto_link_an_existing_email_account()
    {
        var (email, username, _) = await RegisterFullAsync();
        var sub = "g-" + Guid.NewGuid().ToString("N");

        var (res, body) = await PostAsync("google", new { idToken = api.Google.Token(sub, email) });
        AssertError(res, body, HttpStatusCode.Conflict, "ACCOUNT_EXISTS_LINK_REQUIRED");
        Assert.False(await api.WithDbAsync(db => db.Set<IdentityUserLogin<Guid>>().AnyAsync(l => l.ProviderKey == sub)));
        Assert.Equal(1, await api.WithDbAsync(db => db.Users.CountAsync(u => u.UserName == username)));
    }

    [Fact]
    public async Task Signed_in_user_can_link_google_then_sign_in_with_it_but_others_cannot_steal_it()
    {
        var owner = await api.RegisterAsync("lnk");
        var sub = "g-" + Guid.NewGuid().ToString("N");
        var token = api.Google.Token(sub, NewEmail());

        // Cần phiên đăng nhập hiện tại để liên kết.
        var (anon, _) = await PostAsync("google/link", new { idToken = token });
        Assert.Equal(HttpStatusCode.Unauthorized, anon.StatusCode);

        var (linked, _) = await PostAsync("google/link", new { idToken = token }, owner.Client);
        Assert.Equal(HttpStatusCode.NoContent, linked.StatusCode);

        var (login, body) = await PostAsync("google", new { idToken = token });
        Assert.Equal(HttpStatusCode.OK, login.StatusCode);
        Assert.Equal(owner.Id.ToString(), body.GetProperty("user").Str("id"));

        var other = await api.RegisterAsync("oth");
        var (steal, stealBody) = await PostAsync("google/link", new { idToken = token }, other.Client);
        AssertError(steal, stealBody, HttpStatusCode.Conflict, "GOOGLE_ALREADY_LINKED");
    }
}

/// <summary>OTP theo thời gian: tua đồng hồ giả. Lớp riêng (database riêng) vì JWT cấp theo đồng hồ giả đã tua sẽ bị từ chối ở các test khác.</summary>
public class AuthV2ClockTests(AuthV2Factory factory) : AuthV2Base(factory), IClassFixture<AuthV2Factory>
{
    [Fact]
    public async Task Expired_code_is_rejected()
    {
        var email = NewEmail();
        var ch = await StartRegisterAsync(email);
        var code = await api.Email.LastCodeAsync(email);

        api.Clock.Advance(TimeSpan.FromMinutes(5) + TimeSpan.FromSeconds(1));
        var (res, body) = await PostAsync("email/verify", new { challengeId = ch.Str("challengeId"), code });
        AssertError(res, body, HttpStatusCode.BadRequest, "OTP_EXPIRED");
    }

    [Fact]
    public async Task Resend_is_blocked_for_60_seconds_then_issues_a_new_code_and_kills_the_old()
    {
        var email = NewEmail();
        var first = await StartRegisterAsync(email);
        var oldCode = await api.Email.LastCodeAsync(email);

        var (tooSoon, tooSoonBody) = await PostAsync("otp/resend", new { challengeId = first.Str("challengeId") });
        AssertError(tooSoon, tooSoonBody, HttpStatusCode.TooManyRequests, "RESEND_TOO_SOON");
        Assert.True(tooSoon.Headers.RetryAfter?.Delta?.TotalSeconds > 0);

        api.Clock.Advance(TimeSpan.FromSeconds(61));
        var (res, second) = await PostAsync("otp/resend", new { challengeId = first.Str("challengeId") });
        Assert.Equal(HttpStatusCode.Accepted, res.StatusCode);
        Assert.NotEqual(first.Str("challengeId"), second.Str("challengeId"));
        var newCode = await api.Email.LastCodeAsync(email, expectedCount: 2);

        // Challenge + mã cũ không còn dùng được, kể cả khi mã đúng.
        var (oldRes, oldBody) = await PostAsync("email/verify", new { challengeId = first.Str("challengeId"), code = oldCode });
        AssertError(oldRes, oldBody, HttpStatusCode.BadRequest, "OTP_INVALID");

        var (ok, _) = await PostAsync("email/verify", new { challengeId = second.Str("challengeId"), code = newCode });
        Assert.Equal(HttpStatusCode.OK, ok.StatusCode);
    }

    [Fact]
    public async Task Reset_token_expires_after_ten_minutes()
    {
        var (email, _, _) = await RegisterFullAsync();
        var (_, forgot) = await PostAsync("password/forgot", new { email });
        var code = await api.Email.LastCodeAsync(email, expectedCount: 2);
        var (_, verified) = await PostAsync("password/verify-otp", new { challengeId = forgot.Str("challengeId"), code });

        api.Clock.Advance(TimeSpan.FromMinutes(10) + TimeSpan.FromSeconds(1));
        var (res, body) = await PostAsync("password/reset", new { resetToken = verified.Str("resetToken"), newPassword = "MatkhauMoi456" });
        AssertError(res, body, HttpStatusCode.BadRequest, "RESET_TOKEN_INVALID");
    }
}

/// <summary>Chặn theo IP: 3 lần gửi / giờ / IP.</summary>
public class AuthV2IpLimitTests(LowIpLimitFactory api) : IClassFixture<LowIpLimitFactory>
{
    [Fact]
    public async Task Sends_per_ip_are_limited_across_different_emails()
    {
        var client = api.CreateClient();
        for (var i = 0; i < 3; i++)
        {
            var ok = await client.PostAsJsonAsync("/api/v1/auth/email/register", new
            {
                email = $"ip.{Guid.NewGuid():N}@example.com",
                username = "u" + Guid.NewGuid().ToString("N")[..10],
                displayName = "Khang",
                password = "Matkhau123",
            });
            Assert.Equal(HttpStatusCode.Accepted, ok.StatusCode);
        }
        var blocked = await client.PostAsJsonAsync("/api/v1/auth/email/register", new
        {
            email = $"ip.{Guid.NewGuid():N}@example.com",
            username = "u" + Guid.NewGuid().ToString("N")[..10],
            displayName = "Khang",
            password = "Matkhau123",
        });
        Assert.Equal(HttpStatusCode.TooManyRequests, blocked.StatusCode);
        Assert.Equal("RATE_LIMITED", (await blocked.JsonAsync()).Str("code"));
    }
}
