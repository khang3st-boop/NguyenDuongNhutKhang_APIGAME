namespace NguyenDuongNhutKhang_APIGAME.Configuration;

/// <summary>
/// Cấu hình JWT. <c>Key</c> KHÔNG được ghi vào appsettings trong Git:
/// Development dùng <c>dotnet user-secrets set "Jwt:Key" "..."</c>, Production dùng biến môi trường <c>Jwt__Key</c>.
/// </summary>
public class JwtOptions
{
    public const string Section = "Jwt";

    public string Issuer { get; set; } = "GameHub.Api";
    public string Audience { get; set; } = "GameHub.Client";
    public string? Key { get; set; }
    public int AccessTokenMinutes { get; set; } = 15;
    public int RefreshTokenDays { get; set; } = 30;
}

/// <summary>Tạo sẵn tài khoản Admin khi khởi động (tuỳ chọn, để trống = không tạo). Chỉ đặt qua user-secrets / biến môi trường.</summary>
public class SeedOptions
{
    public const string Section = "Seed";

    public string? AdminUsername { get; set; }
    public string? AdminPassword { get; set; }
}
