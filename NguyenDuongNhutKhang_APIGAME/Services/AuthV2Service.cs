using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Options;
using NguyenDuongNhutKhang_APIGAME.Configuration;
using NguyenDuongNhutKhang_APIGAME.Data;
using NguyenDuongNhutKhang_APIGAME.DTOs;
using NguyenDuongNhutKhang_APIGAME.Helpers;
using NguyenDuongNhutKhang_APIGAME.Models;
using NguyenDuongNhutKhang_APIGAME.Services.Email;

namespace NguyenDuongNhutKhang_APIGAME.Services;

public interface IAuthV2Service
{
    AuthCapabilitiesDto Capabilities();
    Task<OtpChallengeDto> RegisterEmailAsync(EmailRegisterRequest req, string ip, CancellationToken ct);
    Task<AuthResponse> VerifyEmailAsync(VerifyOtpRequest req, CancellationToken ct);
    Task<OtpChallengeDto> ResendAsync(ResendOtpRequest req, string ip, CancellationToken ct);
    Task<OtpChallengeDto> ForgotPasswordAsync(ForgotPasswordRequest req, string ip, CancellationToken ct);
    Task<ResetTokenDto> VerifyResetOtpAsync(VerifyOtpRequest req, CancellationToken ct);
    Task ResetPasswordAsync(ResetPasswordRequest req, CancellationToken ct);
    Task<AuthResponse> GoogleLoginAsync(GoogleLoginRequest req, CancellationToken ct);
    Task LinkGoogleAsync(Guid userId, GoogleLoginRequest req, CancellationToken ct);
}

/// <summary>
/// Đăng ký email + OTP, quên mật khẩu, đăng nhập Google. Dùng chung hệ thống Identity / JWT / refresh token hiện có
/// (qua <see cref="IAuthService"/>), không tạo cơ chế xác thực song song.
/// </summary>
public class AuthV2Service(
    AppDbContext db,
    UserManager<AppUser> users,
    IPasswordHasher<AppUser> hasher,
    IAuthService auth,
    IEmailService email,
    IEmailOutbox outbox,
    IGoogleTokenVerifier google,
    IOptions<AuthOptions> options,
    TimeProvider clock,
    ILogger<AuthV2Service> logger) : IAuthV2Service
{
    public const string Contract = "gamehub-auth-v2";
    public const string GoogleProvider = "Google";

    private readonly AuthOptions _o = options.Value;
    private DateTime Now => clock.GetUtcNow().UtcDateTime;
    private bool EmailReady => _o.OtpConfigured && email.IsConfigured;

    public AuthCapabilitiesDto Capabilities() => new(Contract, EmailReady, EmailReady, google.IsConfigured);

    // ------------------------------------------------------------------ đăng ký bằng email

    public async Task<OtpChallengeDto> RegisterEmailAsync(EmailRegisterRequest req, string ip, CancellationToken ct)
    {
        RequireEmailReady();
        var address = NormalizeEmail(req.Email);
        var username = req.Username.Trim();

        await EnforceSendLimitsAsync(address, ChallengePurpose.Register, null, ip, ct);
        if (await users.FindByNameAsync(username) != null)
            throw AppException.Conflict("Tên đăng nhập đã được sử dụng.", "USERNAME_TAKEN");
        if (await EmailInUseAsync(address, ct))
            throw AppException.Conflict("Email này đã được dùng cho một tài khoản khác.", "EMAIL_TAKEN");
        await ValidatePasswordAsync(req.Password, username);

        // Đăng ký đang chờ trước đó với cùng email bị thay thế bởi lần này.
        await SupersedeActiveAsync(address, ChallengePurpose.Register, ct);

        var (challenge, code) = NewChallenge(ChallengePurpose.Register, address, null, ip, decoy: false);
        challenge.PendingUsername = username;
        challenge.PendingDisplayName = req.DisplayName.Trim();
        challenge.PendingPasswordHash = hasher.HashPassword(new AppUser { UserName = username }, req.Password);
        db.AuthChallenges.Add(challenge);
        await db.SaveChangesAsync(ct);

        await SendOtpOrRollbackAsync(challenge, code, ct);
        return ToDto(challenge);
    }

    public async Task<AuthResponse> VerifyEmailAsync(VerifyOtpRequest req, CancellationToken ct)
    {
        RequireEmailReady();
        var ch = await CheckCodeAsync(req.ChallengeId, ChallengePurpose.Register, req.Code, ct);

        // Kiểm tra xung đột TRƯỚC khi tiêu thụ mã để người dùng không mất mã vì tên bị người khác chiếm.
        if (await users.FindByNameAsync(ch.PendingUsername!) != null)
            throw AppException.Conflict("Tên đăng nhập đã được sử dụng.", "USERNAME_TAKEN");
        if (await EmailInUseAsync(ch.Email, ct))
            throw AppException.Conflict("Email này đã được dùng cho một tài khoản khác.", "EMAIL_TAKEN");
        await ClaimAsync(ch, ct);

        var user = new AppUser
        {
            UserName = ch.PendingUsername,
            Email = ch.Email,
            EmailConfirmed = true,
            CreatedAt = Now,
            PasswordHash = ch.PendingPasswordHash,
            Profile = new UserProfile
            {
                DisplayName = ch.PendingDisplayName!,
                AvatarColor = ch.PendingUsername!.Sum(c => c) % 8,
                UpdatedAt = Now,
            },
        };
        await CreateUserAsync(user, ct);
        logger.LogInformation("Đăng ký email hoàn tất cho {UserId}", user.Id);
        return await auth.IssueSessionAsync(user);
    }

    public async Task<OtpChallengeDto> ResendAsync(ResendOtpRequest req, string ip, CancellationToken ct)
    {
        RequireEmailReady();
        if (!Guid.TryParse(req.ChallengeId, out var id)) throw OtpInvalid(0);
        var old = await db.AuthChallenges.AsNoTracking().FirstOrDefaultAsync(c => c.Id == id, ct);
        if (old == null || old.ConsumedAt != null || old.SupersededAt != null) throw OtpInvalid(0);

        var wait = (int)Math.Ceiling((old.ResendAvailableAt - Now).TotalSeconds);
        if (wait > 0)
            throw new AppException(429, "RESEND_TOO_SOON", $"Vui lòng chờ {wait} giây để gửi lại mã.") { RetryAfterSeconds = wait };

        await EnforceSendLimitsAsync(old.Email, old.Purpose, old.UserId, ip, ct);

        // Vô hiệu mã cũ trước (nguyên tử): hai yêu cầu gửi lại song song chỉ một cái thắng.
        var now = Now;
        var rows = await db.AuthChallenges
            .Where(c => c.Id == id && c.ConsumedAt == null && c.SupersededAt == null)
            .ExecuteUpdateAsync(s => s.SetProperty(c => c.SupersededAt, now), ct);
        if (rows == 0) throw OtpInvalid(0);

        var (fresh, code) = NewChallenge(old.Purpose, old.Email, old.UserId, ip, decoy: old.Purpose == ChallengePurpose.PasswordReset && old.UserId == null);
        fresh.PendingUsername = old.PendingUsername;
        fresh.PendingDisplayName = old.PendingDisplayName;
        fresh.PendingPasswordHash = old.PendingPasswordHash;
        db.AuthChallenges.Add(fresh);
        await db.SaveChangesAsync(ct);

        if (old.Purpose == ChallengePurpose.Register)
        {
            try
            {
                await SendOtpOrRollbackAsync(fresh, code, ct);
            }
            catch
            {
                // Gửi thất bại → trả lại mã cũ để người dùng thử lại, không bị kẹt không có mã nào.
                await db.AuthChallenges.Where(c => c.Id == id).ExecuteUpdateAsync(s => s.SetProperty(c => c.SupersededAt, (DateTime?)null), CancellationToken.None);
                throw;
            }
        }
        else if (fresh.UserId != null)
        {
            outbox.Enqueue(EmailTemplates.Otp(fresh.Email, fresh.Purpose, code, _o.OtpMinutes));
        }
        return ToDto(fresh);
    }

    // ------------------------------------------------------------------ quên mật khẩu

    public async Task<OtpChallengeDto> ForgotPasswordAsync(ForgotPasswordRequest req, string ip, CancellationToken ct)
    {
        RequireEmailReady();
        var address = NormalizeEmail(req.Email);
        var normalized = users.NormalizeEmail(address);

        var user = await db.Users.AsNoTracking()
            .Where(u => u.NormalizedEmail == normalized && u.EmailConfirmed)
            .Select(u => new { u.Id })
            .FirstOrDefaultAsync(ct);

        // Email không tồn tại vẫn đi qua đúng giới hạn tần suất và nhận phản hồi y hệt (thử thách giả, không gửi thư).
        await EnforceSendLimitsAsync(address, ChallengePurpose.PasswordReset, user?.Id, ip, ct);
        await SupersedeActiveAsync(address, ChallengePurpose.PasswordReset, ct);

        var (challenge, code) = NewChallenge(ChallengePurpose.PasswordReset, address, user?.Id, ip, decoy: user == null);
        db.AuthChallenges.Add(challenge);
        await db.SaveChangesAsync(ct);

        if (user != null) outbox.Enqueue(EmailTemplates.Otp(address, ChallengePurpose.PasswordReset, code, _o.OtpMinutes));
        return ToDto(challenge);
    }

    public async Task<ResetTokenDto> VerifyResetOtpAsync(VerifyOtpRequest req, CancellationToken ct)
    {
        RequireEmailReady();
        var ch = await CheckCodeAsync(req.ChallengeId, ChallengePurpose.PasswordReset, req.Code, ct);
        if (ch.UserId == null) throw OtpInvalid(0); // thử thách giả: không bao giờ khớp, chốt chặn phụ
        await ClaimAsync(ch, ct);

        var token = Base64UrlEncoder.Encode(RandomNumberGenerator.GetBytes(32));
        var expires = Now.AddMinutes(_o.ResetTokenMinutes);
        var hash = Hmac("reset|" + token);
        await db.AuthChallenges.Where(c => c.Id == ch.Id).ExecuteUpdateAsync(s => s
            .SetProperty(c => c.ResetTokenHash, hash)
            .SetProperty(c => c.ResetTokenExpiresAt, (DateTime?)expires), ct);
        return new ResetTokenDto(token, expires);
    }

    public async Task ResetPasswordAsync(ResetPasswordRequest req, CancellationToken ct)
    {
        RequireEmailReady();
        var hash = Hmac("reset|" + req.ResetToken);
        var ch = await db.AuthChallenges.AsNoTracking()
            .FirstOrDefaultAsync(c => c.ResetTokenHash == hash && c.Purpose == ChallengePurpose.PasswordReset, ct);
        var now = Now;
        if (ch == null || ch.UserId == null || ch.ResetUsedAt != null || ch.ResetTokenExpiresAt == null || ch.ResetTokenExpiresAt <= now)
            throw new AppException(400, "RESET_TOKEN_INVALID", "Phiên đặt lại mật khẩu không hợp lệ hoặc đã hết hạn. Hãy yêu cầu mã mới.");

        var user = await users.FindByIdAsync(ch.UserId.Value.ToString())
            ?? throw new AppException(400, "RESET_TOKEN_INVALID", "Phiên đặt lại mật khẩu không hợp lệ hoặc đã hết hạn. Hãy yêu cầu mã mới.");
        // Mật khẩu yếu bị từ chối TRƯỚC khi dùng token để người dùng nhập lại được.
        await ValidatePasswordAsync(req.NewPassword, user.UserName, user);

        var rows = await db.AuthChallenges
            .Where(c => c.Id == ch.Id && c.ResetUsedAt == null)
            .ExecuteUpdateAsync(s => s.SetProperty(c => c.ResetUsedAt, (DateTime?)now), ct);
        if (rows == 0)
            throw new AppException(400, "RESET_TOKEN_INVALID", "Phiên đặt lại mật khẩu không hợp lệ hoặc đã hết hạn. Hãy yêu cầu mã mới.");

        user.PasswordHash = hasher.HashPassword(user, req.NewPassword);
        var updated = await users.UpdateAsync(user);
        if (!updated.Succeeded)
            throw AppException.BadRequest("Không thể đặt lại mật khẩu, vui lòng thử lại.", "RESET_FAILED");
        await users.UpdateSecurityStampAsync(user);
        await users.SetLockoutEndDateAsync(user, null);
        await users.ResetAccessFailedCountAsync(user);
        // Không tự đăng nhập: thu hồi mọi phiên cũ, người dùng phải đăng nhập lại bằng mật khẩu mới.
        await auth.RevokeAllSessionsAsync(user);
        await SupersedeAllForUserAsync(user.Id, ct);

        if (!string.IsNullOrEmpty(user.Email)) outbox.Enqueue(EmailTemplates.PasswordChanged(user.Email));
        logger.LogInformation("Đặt lại mật khẩu thành công cho {UserId}", user.Id);
    }

    // ------------------------------------------------------------------ Google

    public async Task<AuthResponse> GoogleLoginAsync(GoogleLoginRequest req, CancellationToken ct)
    {
        var identity = await google.VerifyAsync(req.IdToken, ct);

        var linked = await db.Set<IdentityUserLogin<Guid>>().AsNoTracking()
            .FirstOrDefaultAsync(l => l.LoginProvider == GoogleProvider && l.ProviderKey == identity.Subject, ct);
        if (linked != null)
        {
            var existing = await users.FindByIdAsync(linked.UserId.ToString())
                ?? throw AppException.Unauthorized("Tài khoản không còn tồn tại.");
            if (await users.IsLockedOutAsync(existing))
                throw new AppException(423, "LOCKED", "Tài khoản tạm khoá. Thử lại sau ít phút.");
            return await auth.IssueSessionAsync(existing);
        }

        // Email này đã thuộc một tài khoản Game Hub khác → KHÔNG tự nối chỉ vì trùng email.
        if (await EmailInUseAsync(identity.Email, ct))
            throw AppException.Conflict(
                "Email này đã có tài khoản Game Hub. Hãy đăng nhập bằng cách cũ rồi liên kết Google trong Cài đặt.",
                "ACCOUNT_EXISTS_LINK_REQUIRED");

        var username = await NewGoogleUsernameAsync(identity.Subject);
        var user = new AppUser
        {
            UserName = username,
            Email = identity.Email,
            EmailConfirmed = true,
            CreatedAt = Now,
            Profile = new UserProfile
            {
                DisplayName = CleanDisplayName(identity.Name, identity.Email),
                AvatarColor = username.Sum(c => c) % 8,
                UpdatedAt = Now,
            },
        };
        await CreateUserAsync(user, ct, new UserLoginInfo(GoogleProvider, identity.Subject, GoogleProvider));
        logger.LogInformation("Tạo tài khoản mới từ Google cho {UserId}", user.Id);
        return await auth.IssueSessionAsync(user);
    }

    public async Task LinkGoogleAsync(Guid userId, GoogleLoginRequest req, CancellationToken ct)
    {
        var identity = await google.VerifyAsync(req.IdToken, ct);
        var user = await users.FindByIdAsync(userId.ToString()) ?? throw AppException.Unauthorized("Chưa đăng nhập.");

        var owner = await db.Set<IdentityUserLogin<Guid>>().AsNoTracking()
            .FirstOrDefaultAsync(l => l.LoginProvider == GoogleProvider && l.ProviderKey == identity.Subject, ct);
        if (owner != null)
        {
            if (owner.UserId == userId) return; // đã liên kết: idempotent
            throw AppException.Conflict("Tài khoản Google này đã liên kết với người chơi khác.", "GOOGLE_ALREADY_LINKED");
        }
        if ((await users.GetLoginsAsync(user)).Any(l => l.LoginProvider == GoogleProvider))
            throw AppException.Conflict("Tài khoản của bạn đã liên kết một tài khoản Google khác.", "GOOGLE_ALREADY_LINKED");

        if (string.IsNullOrEmpty(user.Email))
        {
            if (await EmailInUseAsync(identity.Email, ct))
                throw AppException.Conflict("Email Google này đã được dùng cho tài khoản khác.", "EMAIL_TAKEN");
            user.Email = identity.Email;
            user.EmailConfirmed = true;
            var set = await users.UpdateAsync(user);
            if (!set.Succeeded) throw AppException.Conflict("Không thể gắn email Google vào tài khoản.", "EMAIL_TAKEN");
        }
        var added = await users.AddLoginAsync(user, new UserLoginInfo(GoogleProvider, identity.Subject, GoogleProvider));
        if (!added.Succeeded) throw AppException.Conflict("Tài khoản Google này đã liên kết với người chơi khác.", "GOOGLE_ALREADY_LINKED");
    }

    // ------------------------------------------------------------------ OTP lõi

    private void RequireEmailReady()
    {
        if (!EmailReady)
            throw new AppException(503, "AUTH_NOT_READY", "Tính năng xác minh email chưa được cấu hình trên máy chủ.");
    }

    private (AuthChallenge Challenge, string Code) NewChallenge(string purpose, string address, Guid? userId, string ip, bool decoy)
    {
        var now = Now;
        var id = Guid.NewGuid();
        // CSPRNG, phân bố đều 000000–999999. Thử thách giả dùng mã không ai biết nên không bao giờ khớp.
        var code = RandomNumberGenerator.GetInt32(0, 1_000_000).ToString("D6");
        var hashed = decoy ? Hmac("decoy|" + Convert.ToHexString(RandomNumberGenerator.GetBytes(16))) : Hmac(CodeInput(id, purpose, address, code));
        var challenge = new AuthChallenge
        {
            Id = id,
            Purpose = purpose,
            Email = address,
            UserId = userId,
            CodeHash = hashed,
            CreatedAt = now,
            ExpiresAt = now.AddMinutes(_o.OtpMinutes),
            ResendAvailableAt = now.AddSeconds(_o.ResendSeconds),
            MaxAttempts = _o.MaxAttempts,
            IpHash = Hmac("ip|" + ip),
        };
        return (challenge, code);
    }

    private async Task SendOtpOrRollbackAsync(AuthChallenge challenge, string code, CancellationToken ct)
    {
        try
        {
            await email.SendAsync(EmailTemplates.Otp(challenge.Email, challenge.Purpose, code, _o.OtpMinutes), ct);
        }
        catch (EmailDeliveryException ex)
        {
            // Mã chưa tới người dùng → bỏ thử thách, không tính vào hạn mức, báo lỗi thật (không giả vờ đã gửi).
            await db.AuthChallenges.Where(c => c.Id == challenge.Id).ExecuteDeleteAsync(CancellationToken.None);
            logger.LogError("Gửi OTP thất bại ({Kind}): {Reason}", ex.Transient ? "tạm thời" : "bị từ chối", ex.Message);
            throw ex.Transient
                ? new AppException(503, "EMAIL_SEND_FAILED", "Chưa gửi được email xác minh, vui lòng thử lại sau ít phút.")
                : new AppException(502, "EMAIL_PROVIDER_REJECTED", "Nhà cung cấp email từ chối gửi thư tới địa chỉ này.");
        }
    }

    private async Task<AuthChallenge> CheckCodeAsync(string challengeId, string purpose, string code, CancellationToken ct)
    {
        if (!Guid.TryParse(challengeId, out var id)) throw OtpInvalid(0);
        var ch = await db.AuthChallenges.AsNoTracking().FirstOrDefaultAsync(c => c.Id == id && c.Purpose == purpose, ct);
        if (ch == null || ch.ConsumedAt != null || ch.SupersededAt != null) throw OtpInvalid(0);
        if (ch.ExpiresAt <= Now)
            throw new AppException(400, "OTP_EXPIRED", "Mã xác minh đã hết hạn. Hãy yêu cầu gửi lại mã.");
        if (ch.Attempts >= ch.MaxAttempts) throw AttemptsExceeded();

        // Tăng số lần thử NGUYÊN TỬ trước khi so khớp: các đoán song song không vượt được giới hạn.
        var rows = await db.AuthChallenges
            .Where(c => c.Id == id && c.ConsumedAt == null && c.SupersededAt == null && c.Attempts < c.MaxAttempts)
            .ExecuteUpdateAsync(s => s.SetProperty(c => c.Attempts, c => c.Attempts + 1), ct);
        if (rows == 0) throw AttemptsExceeded();
        var attempts = await db.AuthChallenges.AsNoTracking().Where(c => c.Id == id).Select(c => c.Attempts).FirstAsync(ct);

        var expected = Encoding.ASCII.GetBytes(ch.CodeHash);
        var actual = Encoding.ASCII.GetBytes(Hmac(CodeInput(ch.Id, ch.Purpose, ch.Email, code)));
        if (!CryptographicOperations.FixedTimeEquals(expected, actual))
        {
            var remaining = Math.Max(0, ch.MaxAttempts - attempts);
            throw remaining == 0 ? AttemptsExceeded() : OtpInvalid(remaining);
        }
        return ch;
    }

    /// <summary>Tiêu thụ mã (dùng một lần). Nguyên tử: song song chỉ một yêu cầu thắng.</summary>
    private async Task ClaimAsync(AuthChallenge ch, CancellationToken ct)
    {
        var now = Now;
        var rows = await db.AuthChallenges
            .Where(c => c.Id == ch.Id && c.ConsumedAt == null && c.SupersededAt == null)
            .ExecuteUpdateAsync(s => s.SetProperty(c => c.ConsumedAt, (DateTime?)now), ct);
        if (rows == 0) throw OtpInvalid(0);
    }

    private async Task EnforceSendLimitsAsync(string address, string purpose, Guid? userId, string ip, CancellationToken ct)
    {
        var since = Now.AddHours(-1);
        var ipHash = Hmac("ip|" + ip);
        var byEmail = db.AuthChallenges.AsNoTracking().Where(c => c.Email == address && c.Purpose == purpose && c.CreatedAt > since);
        var byIp = db.AuthChallenges.AsNoTracking().Where(c => c.IpHash == ipHash && c.CreatedAt > since);

        if (await byEmail.CountAsync(ct) >= _o.MaxSendsPerEmailPerHour)
            throw await TooManyAsync(byEmail, "Bạn đã yêu cầu mã cho email này quá nhiều lần. Vui lòng thử lại sau.", ct);
        if (await byIp.CountAsync(ct) >= _o.MaxSendsPerIpPerHour)
            throw await TooManyAsync(byIp, "Có quá nhiều yêu cầu gửi mã từ thiết bị / mạng của bạn. Vui lòng thử lại sau.", ct);
        if (userId != null)
        {
            var byUser = db.AuthChallenges.AsNoTracking().Where(c => c.UserId == userId && c.CreatedAt > since);
            if (await byUser.CountAsync(ct) >= _o.MaxSendsPerEmailPerHour)
                throw await TooManyAsync(byUser, "Tài khoản này đã yêu cầu mã quá nhiều lần. Vui lòng thử lại sau.", ct);
        }
    }

    private async Task<AppException> TooManyAsync(IQueryable<AuthChallenge> window, string message, CancellationToken ct)
    {
        var oldest = await window.MinAsync(c => (DateTime?)c.CreatedAt, ct) ?? Now;
        var retry = Math.Max(1, (int)Math.Ceiling((oldest.AddHours(1) - Now).TotalSeconds));
        return new AppException(429, "RATE_LIMITED", message) { RetryAfterSeconds = retry };
    }

    private Task SupersedeActiveAsync(string address, string purpose, CancellationToken ct)
    {
        var now = Now;
        return db.AuthChallenges
            .Where(c => c.Email == address && c.Purpose == purpose && c.ConsumedAt == null && c.SupersededAt == null)
            .ExecuteUpdateAsync(s => s.SetProperty(c => c.SupersededAt, (DateTime?)now), ct);
    }

    private Task SupersedeAllForUserAsync(Guid userId, CancellationToken ct)
    {
        var now = Now;
        return db.AuthChallenges
            .Where(c => c.UserId == userId && c.SupersededAt == null && c.ResetUsedAt == null)
            .ExecuteUpdateAsync(s => s.SetProperty(c => c.SupersededAt, (DateTime?)now), ct);
    }

    // ------------------------------------------------------------------ tiện ích

    private OtpChallengeDto ToDto(AuthChallenge c) => new(
        c.Id.ToString(), c.Purpose, MaskEmail(c.Email), _o.OtpLength, c.ExpiresAt, c.ResendAvailableAt,
        Math.Max(0, c.MaxAttempts - c.Attempts));

    private static AppException OtpInvalid(int remaining) => new(400, "OTP_INVALID",
        remaining > 0 ? $"Mã xác minh không đúng. Còn {remaining} lần thử." : "Mã xác minh không đúng hoặc không còn hiệu lực. Hãy yêu cầu mã mới.")
    {
        Fields = [new FieldError("remainingAttempts", remaining.ToString())],
    };

    private static AppException AttemptsExceeded() => new(429, "OTP_ATTEMPTS_EXCEEDED",
        "Bạn đã nhập sai quá số lần cho phép. Hãy yêu cầu gửi mã mới.")
    {
        Fields = [new FieldError("remainingAttempts", "0")],
    };

    private static string CodeInput(Guid id, string purpose, string address, string code) =>
        $"otp|{id:N}|{purpose}|{address}|{code}";

    private string Hmac(string data) =>
        Convert.ToHexString(HMACSHA256.HashData(Encoding.UTF8.GetBytes(_o.OtpKey ?? ""), Encoding.UTF8.GetBytes(data))).ToLowerInvariant();

    private static string NormalizeEmail(string raw)
    {
        var e = (raw ?? "").Trim().ToLowerInvariant();
        if (e.Length is < 5 or > 254 || !MailAddress.TryCreate(e, out var parsed) || parsed.Address != e
            || e.Count(c => c == '@') != 1 || !parsed.Host.Contains('.'))
            throw AppException.BadRequest("Email không hợp lệ.", "INVALID_EMAIL");
        return e;
    }

    /// <summary>a***b@domain — đủ để nhận ra, không đủ để lộ địa chỉ.</summary>
    public static string MaskEmail(string address)
    {
        var at = address.IndexOf('@');
        if (at <= 0) return "***";
        var local = address[..at];
        var shown = local.Length == 1 ? local + "***" : local[0] + "***" + local[^1];
        return shown + address[at..];
    }

    private Task<bool> EmailInUseAsync(string address, CancellationToken ct)
    {
        var normalized = users.NormalizeEmail(address);
        return db.Users.AsNoTracking().AnyAsync(u => u.NormalizedEmail == normalized, ct);
    }

    private async Task ValidatePasswordAsync(string password, string? username, AppUser? user = null)
    {
        var probe = user ?? new AppUser { UserName = username };
        foreach (var validator in users.PasswordValidators)
        {
            var result = await validator.ValidateAsync(users, probe, password);
            if (!result.Succeeded)
                throw AppException.BadRequest("Mật khẩu chưa đủ mạnh (tối thiểu 8 ký tự, có chữ và số).", "WEAK_PASSWORD");
        }
    }

    private async Task CreateUserAsync(AppUser user, CancellationToken ct, UserLoginInfo? login = null)
    {
        await using var tx = await db.Database.BeginTransactionAsync(ct);
        var created = await users.CreateAsync(user);
        if (!created.Succeeded)
        {
            var codes = created.Errors.Select(e => e.Code).ToArray();
            if (codes.Contains("DuplicateUserName")) throw AppException.Conflict("Tên đăng nhập đã được sử dụng.", "USERNAME_TAKEN");
            throw AppException.BadRequest("Không thể tạo tài khoản, vui lòng thử lại.", "REGISTER_FAILED");
        }
        // Luôn chỉ cấp quyền User — không nhận role từ bất kỳ đầu vào nào.
        await users.AddToRoleAsync(user, AppRoles.User);
        if (login != null)
        {
            var added = await users.AddLoginAsync(user, login);
            if (!added.Succeeded) throw AppException.Conflict("Tài khoản Google này đã được dùng.", "GOOGLE_ALREADY_LINKED");
        }
        await tx.CommitAsync(ct);
    }

    private async Task<string> NewGoogleUsernameAsync(string subject)
    {
        var baseName = "g_" + Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(subject)))[..10].ToLowerInvariant();
        var name = baseName;
        for (var i = 0; i < 5 && await users.FindByNameAsync(name) != null; i++)
            name = baseName + RandomNumberGenerator.GetInt32(10, 99);
        return name;
    }

    private static string CleanDisplayName(string? name, string address)
    {
        static string Clean(string? s) => new string((s ?? "").Where(c => !char.IsControl(c) && c is not '<' and not '>').ToArray()).Trim();
        var cleaned = Clean(name);
        if (cleaned.Length < 2) cleaned = Clean(address[..address.IndexOf('@')]);
        if (cleaned.Length < 2) cleaned = "Người chơi";
        return cleaned.Length > 30 ? cleaned[..30].TrimEnd() : cleaned;
    }
}

/// <summary>Dọn thử thách OTP cũ (hết hạn hơn 1 ngày) mỗi giờ để bảng không phình ra.</summary>
public sealed class AuthChallengeCleanupService(IServiceScopeFactory scopes, TimeProvider clock, ILogger<AuthChallengeCleanupService> logger) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        using var timer = new PeriodicTimer(TimeSpan.FromHours(1));
        do
        {
            try
            {
                using var scope = scopes.CreateScope();
                var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
                var cutoff = clock.GetUtcNow().UtcDateTime.AddDays(-1);
                await db.AuthChallenges.Where(c => c.ExpiresAt < cutoff && (c.ResetTokenExpiresAt == null || c.ResetTokenExpiresAt < cutoff))
                    .ExecuteDeleteAsync(stoppingToken);
            }
            catch (OperationCanceledException) when (stoppingToken.IsCancellationRequested)
            {
                break;
            }
            catch (Exception ex)
            {
                logger.LogWarning(ex, "Dọn thử thách OTP thất bại, sẽ thử lại sau.");
            }
        } while (await timer.WaitForNextTickAsync(stoppingToken));
    }
}
