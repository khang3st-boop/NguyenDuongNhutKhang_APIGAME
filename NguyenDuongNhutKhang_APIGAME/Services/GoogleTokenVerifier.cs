using System.Text.Json;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using NguyenDuongNhutKhang_APIGAME.Configuration;
using NguyenDuongNhutKhang_APIGAME.Helpers;

namespace NguyenDuongNhutKhang_APIGAME.Services;

/// <summary>Danh tính đã được Google xác nhận. <see cref="Subject"/> là định danh bất biến (không đổi khi đổi email).</summary>
public record GoogleIdentity(string Subject, string Email, string? Name);

public interface IGoogleTokenVerifier
{
    bool IsConfigured { get; }

    /// <exception cref="AppException">401 GOOGLE_TOKEN_INVALID khi chữ ký / issuer / audience / hạn / email_verified không đạt.</exception>
    Task<GoogleIdentity> VerifyAsync(string idToken, CancellationToken ct = default);
}

/// <summary>Nguồn khóa công khai của Google (tách ra để test ký token bằng khóa cục bộ).</summary>
public interface IGoogleKeyProvider
{
    Task<IReadOnlyList<SecurityKey>> GetKeysAsync(bool forceRefresh, CancellationToken ct);
}

/// <summary>Tải JWKS của Google và cache theo <c>Cache-Control: max-age</c> (tối thiểu 5 phút, tối đa 24 giờ).</summary>
public sealed class HttpGoogleKeyProvider(HttpClient http, TimeProvider clock, ILogger<HttpGoogleKeyProvider> logger) : IGoogleKeyProvider
{
    public const string JwksUrl = "https://www.googleapis.com/oauth2/v3/certs";

    private readonly SemaphoreSlim _gate = new(1, 1);
    private IReadOnlyList<SecurityKey> _keys = [];
    private DateTimeOffset _expires = DateTimeOffset.MinValue;
    private DateTimeOffset _lastFetch = DateTimeOffset.MinValue;

    public async Task<IReadOnlyList<SecurityKey>> GetKeysAsync(bool forceRefresh, CancellationToken ct)
    {
        var now = clock.GetUtcNow();
        // Ép làm mới (kid lạ) tối đa 1 lần/phút để token rác không làm nghẽn Google.
        var refresh = _keys.Count == 0 || now >= _expires || (forceRefresh && now - _lastFetch > TimeSpan.FromMinutes(1));
        if (!refresh) return _keys;

        await _gate.WaitAsync(ct);
        try
        {
            now = clock.GetUtcNow();
            if (_keys.Count > 0 && now < _expires && !(forceRefresh && now - _lastFetch > TimeSpan.FromMinutes(1))) return _keys;
            try
            {
                using var res = await http.GetAsync(JwksUrl, ct);
                res.EnsureSuccessStatusCode();
                var json = await res.Content.ReadAsStringAsync(ct);
                _keys = [.. new JsonWebKeySet(json).GetSigningKeys()];
                var maxAge = res.Headers.CacheControl?.MaxAge ?? TimeSpan.FromHours(1);
                _expires = now + TimeSpan.FromSeconds(Math.Clamp(maxAge.TotalSeconds, 300, 86_400));
                _lastFetch = now;
            }
            catch (Exception ex) when (ex is HttpRequestException or TaskCanceledException or JsonException)
            {
                logger.LogWarning("Không tải được khóa công khai của Google ({Type}).", ex.GetType().Name);
                if (_keys.Count == 0) throw new AppException(503, "AUTH_NOT_READY", "Chưa kiểm tra được đăng nhập Google, vui lòng thử lại sau.");
            }
            return _keys;
        }
        finally
        {
            _gate.Release();
        }
    }
}

/// <summary>
/// Xác minh Google ID token theo hướng dẫn của Google: chữ ký RS256 bằng JWKS, <c>iss</c>, <c>aud</c> thuộc danh sách
/// client ID, <c>exp</c>, và bắt buộc <c>email_verified</c>. Chỉ tin dữ liệu trong token đã xác minh.
/// </summary>
public sealed class GoogleTokenVerifier(
    IGoogleKeyProvider keys,
    IOptions<AuthOptions> options,
    TimeProvider clock,
    ILogger<GoogleTokenVerifier> logger) : IGoogleTokenVerifier
{
    private static readonly string[] Issuers = ["https://accounts.google.com", "accounts.google.com"];
    private readonly JsonWebTokenHandler _handler = new();

    public bool IsConfigured => options.Value.Google.Configured;

    public async Task<GoogleIdentity> VerifyAsync(string idToken, CancellationToken ct = default)
    {
        if (!IsConfigured)
            throw new AppException(503, "AUTH_NOT_READY", "Đăng nhập Google chưa được cấu hình trên máy chủ.");
        if (string.IsNullOrWhiteSpace(idToken) || idToken.Length > 4096 || idToken.Count(c => c == '.') != 2)
            throw Invalid();

        var audiences = options.Value.Google.ClientIds.Where(c => !string.IsNullOrWhiteSpace(c)).ToArray();
        var result = await ValidateAsync(idToken, audiences, forceRefresh: false, ct);
        if (!result.IsValid && result.Exception is SecurityTokenSignatureKeyNotFoundException)
            result = await ValidateAsync(idToken, audiences, forceRefresh: true, ct);
        if (!result.IsValid)
        {
            logger.LogInformation("Google ID token bị từ chối: {Reason}", result.Exception?.GetType().Name);
            throw Invalid();
        }

        var token = (JsonWebToken)result.SecurityToken;
        var sub = token.GetClaim("sub")?.Value;
        var email = token.TryGetClaim("email", out var e) ? e.Value : null;
        var verified = token.TryGetClaim("email_verified", out var v) && string.Equals(v.Value, "true", StringComparison.OrdinalIgnoreCase);
        if (string.IsNullOrWhiteSpace(sub) || string.IsNullOrWhiteSpace(email) || !verified)
            throw new AppException(401, "GOOGLE_EMAIL_NOT_VERIFIED", "Email Google chưa được xác minh nên không thể đăng nhập.");

        var name = token.TryGetClaim("name", out var n) ? n.Value : null;
        return new GoogleIdentity(sub, email.Trim().ToLowerInvariant(), name);
    }

    private async Task<TokenValidationResult> ValidateAsync(string idToken, string[] audiences, bool forceRefresh, CancellationToken ct)
    {
        var signingKeys = await keys.GetKeysAsync(forceRefresh, ct);
        var parameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuers = Issuers,
            ValidateAudience = true,
            ValidAudiences = audiences,
            ValidateLifetime = true,
            RequireExpirationTime = true,
            RequireSignedTokens = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKeys = signingKeys,
            ValidAlgorithms = [SecurityAlgorithms.RsaSha256],
            ClockSkew = TimeSpan.FromMinutes(1),
            LifetimeValidator = (notBefore, expires, _, p) =>
            {
                var now = clock.GetUtcNow().UtcDateTime;
                return expires != null && now <= expires.Value.ToUniversalTime() + p.ClockSkew
                    && (notBefore == null || now >= notBefore.Value.ToUniversalTime() - p.ClockSkew);
            },
        };
        return await _handler.ValidateTokenAsync(idToken, parameters);
    }

    private static AppException Invalid() =>
        new(401, "GOOGLE_TOKEN_INVALID", "Google ID token không hợp lệ hoặc đã hết hạn.");
}
