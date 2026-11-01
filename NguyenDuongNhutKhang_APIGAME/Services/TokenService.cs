using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using NguyenDuongNhutKhang_APIGAME.Configuration;
using NguyenDuongNhutKhang_APIGAME.Models;

namespace NguyenDuongNhutKhang_APIGAME.Services;

/// <summary>
/// Khoá ký JWT. Lấy từ <c>Jwt:Key</c> (user-secrets / biến môi trường), không bao giờ nằm trong source.
/// Development thiếu key → sinh key ngẫu nhiên cho phiên chạy (token mất hiệu lực khi khởi động lại).
/// Môi trường khác thiếu key → dừng khởi động.
/// </summary>
public sealed class JwtSigning
{
    public SymmetricSecurityKey Key { get; }

    public JwtSigning(IOptions<JwtOptions> options, IHostEnvironment env, ILogger<JwtSigning> logger)
    {
        var raw = options.Value.Key;
        byte[] bytes;
        if (string.IsNullOrWhiteSpace(raw))
        {
            if (!env.IsDevelopment())
                throw new InvalidOperationException("Thiếu cấu hình Jwt:Key (đặt biến môi trường Jwt__Key, tối thiểu 32 byte).");
            logger.LogWarning("Chưa cấu hình Jwt:Key — dùng khoá ngẫu nhiên tạm thời. Chạy: dotnet user-secrets set \"Jwt:Key\" \"<chuỗi ngẫu nhiên ≥ 32 ký tự>\"");
            bytes = RandomNumberGenerator.GetBytes(64);
        }
        else
        {
            bytes = Encoding.UTF8.GetBytes(raw);
            if (bytes.Length < 32)
                throw new InvalidOperationException("Jwt:Key phải dài tối thiểu 32 byte.");
        }
        Key = new SymmetricSecurityKey(bytes) { KeyId = "gamehub-hs256" };
    }
}

public interface ITokenService
{
    (string Token, int ExpiresIn) CreateAccessToken(AppUser user, IEnumerable<string> roles);
    (string Raw, string Hash) NewRefreshToken();
    string Hash(string raw);
}

public class TokenService(JwtSigning signing, IOptions<JwtOptions> options, TimeProvider clock) : ITokenService
{
    /// <summary>Tên claim chứa TokenVersion — đổi mật khẩu / đăng xuất mọi nơi thì tăng lên.</summary>
    public const string VersionClaim = "sv";

    private readonly JwtOptions _opt = options.Value;

    public (string Token, int ExpiresIn) CreateAccessToken(AppUser user, IEnumerable<string> roles)
    {
        var now = clock.GetUtcNow().UtcDateTime;
        var lifetime = TimeSpan.FromMinutes(_opt.AccessTokenMinutes);
        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new(JwtRegisteredClaimNames.UniqueName, user.UserName ?? ""),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString("N")),
            new(VersionClaim, user.TokenVersion.ToString()),
        };
        claims.AddRange(roles.Select(r => new Claim("role", r)));

        var descriptor = new SecurityTokenDescriptor
        {
            Issuer = _opt.Issuer,
            Audience = _opt.Audience,
            Subject = new ClaimsIdentity(claims),
            IssuedAt = now,
            NotBefore = now,
            Expires = now.Add(lifetime),
            SigningCredentials = new SigningCredentials(signing.Key, SecurityAlgorithms.HmacSha256),
        };
        return (new JsonWebTokenHandler().CreateToken(descriptor), (int)lifetime.TotalSeconds);
    }

    public (string Raw, string Hash) NewRefreshToken()
    {
        var raw = Base64UrlEncoder.Encode(RandomNumberGenerator.GetBytes(64));
        return (raw, Hash(raw));
    }

    public string Hash(string raw) => Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(raw)));
}
