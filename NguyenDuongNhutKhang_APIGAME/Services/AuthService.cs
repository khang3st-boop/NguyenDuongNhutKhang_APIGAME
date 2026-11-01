using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using NguyenDuongNhutKhang_APIGAME.Configuration;
using NguyenDuongNhutKhang_APIGAME.Data;
using NguyenDuongNhutKhang_APIGAME.DTOs;
using NguyenDuongNhutKhang_APIGAME.Helpers;
using NguyenDuongNhutKhang_APIGAME.Models;

namespace NguyenDuongNhutKhang_APIGAME.Services;

public interface IAuthService
{
    Task<AuthResponse> RegisterAsync(RegisterRequest req);
    Task<AuthResponse> LoginAsync(LoginRequest req);
    Task<AuthResponse> RefreshAsync(string refreshToken);
    Task LogoutAsync(Guid? userId, LogoutRequest req);
    Task ChangePasswordAsync(Guid userId, ChangePasswordRequest req);
}

public class AuthService(
    AppDbContext db,
    UserManager<AppUser> users,
    ITokenService tokens,
    IOptions<JwtOptions> jwt,
    TimeProvider clock,
    ILogger<AuthService> logger) : IAuthService
{
    private DateTime Now => clock.GetUtcNow().UtcDateTime;

    public async Task<AuthResponse> RegisterAsync(RegisterRequest req)
    {
        var username = req.Username.Trim();
        if (await users.FindByNameAsync(username) != null)
            throw AppException.Conflict("Tên đăng nhập đã được sử dụng.", "USERNAME_TAKEN");

        var user = new AppUser
        {
            UserName = username,
            CreatedAt = Now,
            Profile = new UserProfile
            {
                DisplayName = req.DisplayName.Trim(),
                AvatarColor = username.Sum(ch => ch) % 8,
                UpdatedAt = Now,
            },
        };

        await using var tx = await db.Database.BeginTransactionAsync();
        var created = await users.CreateAsync(user, req.Password);
        if (!created.Succeeded)
        {
            // Lỗi đã được DTO kiểm tra trước; còn lại (trùng tên do tranh chấp...) trả thông báo chung.
            if (created.Errors.Any(e => e.Code is "DuplicateUserName"))
                throw AppException.Conflict("Tên đăng nhập đã được sử dụng.", "USERNAME_TAKEN");
            throw AppException.BadRequest("Mật khẩu chưa đủ mạnh (tối thiểu 8 ký tự, có chữ và số).", "WEAK_PASSWORD");
        }
        // Luôn chỉ cấp quyền User — không nhận role từ client.
        await users.AddToRoleAsync(user, AppRoles.User);
        await tx.CommitAsync();

        logger.LogInformation("Đăng ký tài khoản mới {UserId}", user.Id);
        return await IssueAsync(user);
    }

    public async Task<AuthResponse> LoginAsync(LoginRequest req)
    {
        var user = await users.FindByNameAsync(req.Username.Trim());
        // Cùng một thông báo cho "sai tên" và "sai mật khẩu" để không lộ tài khoản nào tồn tại.
        if (user == null) throw AppException.Unauthorized();

        if (await users.IsLockedOutAsync(user))
            throw new AppException(423, "LOCKED", "Tài khoản tạm khoá do đăng nhập sai nhiều lần. Thử lại sau ít phút.");

        if (!await users.CheckPasswordAsync(user, req.Password))
        {
            await users.AccessFailedAsync(user);
            throw AppException.Unauthorized();
        }
        await users.ResetAccessFailedCountAsync(user);
        return await IssueAsync(user);
    }

    public async Task<AuthResponse> RefreshAsync(string refreshToken)
    {
        var hash = tokens.Hash(refreshToken);
        var stored = await db.RefreshTokens.Include(t => t.User).FirstOrDefaultAsync(t => t.TokenHash == hash);
        if (stored == null)
            throw new AppException(401, "INVALID_REFRESH_TOKEN", "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại.");

        if (stored.RevokedAt != null)
        {
            // Token đã bị xoay vòng mà vẫn được dùng lại → có thể bị lộ: thu hồi mọi phiên của người này.
            if (stored.ReplacedById != null)
            {
                logger.LogWarning("Phát hiện dùng lại refresh token cũ của {UserId} — thu hồi mọi phiên", stored.UserId);
                await RevokeAllAsync(stored.User);
            }
            throw new AppException(401, "INVALID_REFRESH_TOKEN", "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại.");
        }
        if (stored.ExpiresAt <= Now)
            throw new AppException(401, "INVALID_REFRESH_TOKEN", "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại.");

        var response = await IssueAsync(stored.User, stored);
        return response;
    }

    public async Task LogoutAsync(Guid? userId, LogoutRequest req)
    {
        var hash = tokens.Hash(req.RefreshToken);
        var stored = await db.RefreshTokens.Include(t => t.User).FirstOrDefaultAsync(t => t.TokenHash == hash);
        // Đăng xuất luôn "thành công" (idempotent) — không cho biết token có tồn tại không.
        if (stored == null) return;
        if (userId != null && stored.UserId != userId) return;

        if (req.AllDevices)
        {
            await RevokeAllAsync(stored.User);
            return;
        }
        stored.RevokedAt ??= Now;
        await db.SaveChangesAsync();
    }

    public async Task ChangePasswordAsync(Guid userId, ChangePasswordRequest req)
    {
        var user = await users.FindByIdAsync(userId.ToString()) ?? throw AppException.NotFound();
        var result = await users.ChangePasswordAsync(user, req.CurrentPassword, req.NewPassword);
        if (!result.Succeeded)
        {
            if (result.Errors.Any(e => e.Code == "PasswordMismatch"))
                throw AppException.BadRequest("Mật khẩu hiện tại không đúng.", "WRONG_PASSWORD");
            throw AppException.BadRequest("Mật khẩu mới chưa đủ mạnh (tối thiểu 8 ký tự, có chữ và số).", "WEAK_PASSWORD");
        }
        // Đổi mật khẩu → mọi access token và refresh token cũ mất hiệu lực.
        await RevokeAllAsync(user);
    }

    private async Task RevokeAllAsync(AppUser user)
    {
        var now = Now;
        await db.RefreshTokens
            .Where(t => t.UserId == user.Id && t.RevokedAt == null)
            .ExecuteUpdateAsync(s => s.SetProperty(t => t.RevokedAt, now));
        user.TokenVersion++;
        await db.SaveChangesAsync();
    }

    /// <summary>Cấp access token + refresh token mới. Nếu có <paramref name="previous"/> thì xoay vòng token cũ.</summary>
    private async Task<AuthResponse> IssueAsync(AppUser user, RefreshToken? previous = null)
    {
        var roles = await users.GetRolesAsync(user);
        var (access, expiresIn) = tokens.CreateAccessToken(user, roles);
        var (raw, hash) = tokens.NewRefreshToken();
        var entity = new RefreshToken
        {
            UserId = user.Id,
            TokenHash = hash,
            CreatedAt = Now,
            ExpiresAt = Now.AddDays(jwt.Value.RefreshTokenDays),
        };
        db.RefreshTokens.Add(entity);
        if (previous != null)
        {
            previous.RevokedAt = Now;
            previous.ReplacedById = entity.Id;
        }
        await db.SaveChangesAsync();

        var profile = user.Profile ?? await db.UserProfiles.FirstAsync(p => p.UserId == user.Id);
        return new AuthResponse(access, raw, expiresIn, "Bearer",
            new UserDto(user.Id, user.UserName!, profile.DisplayName, profile.AvatarColor, user.CreatedAt));
    }
}
