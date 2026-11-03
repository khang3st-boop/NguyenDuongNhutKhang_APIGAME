using Microsoft.Extensions.Configuration;
using Npgsql;
using NguyenDuongNhutKhang_APIGAME.Configuration;

namespace NguyenDuongNhutKhang_APIGAME.Tests.Unit;

public class CloudConfigurationTests
{
    [Theory]
    [InlineData("*")]
    [InlineData("https://*.example.com")]
    [InlineData("http://app.example.com")]
    [InlineData("https://app.example.com/path")]
    [InlineData("https://app.example.com/")]
    public void Production_rejects_unsafe_or_non_origin_cors_values(string origin)
        => Assert.Throws<InvalidOperationException>(() => CloudHosting.ValidateOrigins([origin]));

    [Fact]
    public void Production_accepts_exact_https_origins()
        => CloudHosting.ValidateOrigins(["https://app.example.com", "https://beta.example.com:8443"]);

    [Fact]
    public void Postgres_url_decodes_credentials_and_enforces_public_tls()
    {
        var config = new ConfigurationBuilder().AddInMemoryCollection(new Dictionary<string, string?>
        {
            ["DATABASE_URL"] = "postgresql://test_user:test%40pw%3A123@db.example.com:5433/gamehub?sslmode=disable",
        }).Build();
        var cs = new NpgsqlConnectionStringBuilder(DatabaseSetup.PostgresConnection(config));
        Assert.Equal(("db.example.com", 5433, "gamehub", "test_user", "test@pw:123"),
            (cs.Host, cs.Port, cs.Database, cs.Username, cs.Password));
        Assert.Equal(SslMode.VerifyFull, cs.SslMode);
        Assert.False(cs.IncludeErrorDetail);
        Assert.False(cs.PersistSecurityInfo);
    }

    [Theory]
    [InlineData("true", SslMode.Require)]
    [InlineData("false", SslMode.VerifyFull)]
    public void Render_internal_tls_exception_requires_render_runtime(string render, SslMode expected)
    {
        var config = new ConfigurationBuilder().AddInMemoryCollection(new Dictionary<string, string?>
        {
            ["RENDER"] = render,
            ["DATABASE_URL"] = "postgresql://test_user:test_only@dpg-test123-a/gamehub",
        }).Build();
        Assert.Equal(expected, new NpgsqlConnectionStringBuilder(DatabaseSetup.PostgresConnection(config)).SslMode);
    }
}
