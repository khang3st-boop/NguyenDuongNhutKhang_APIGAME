using System.Net;
using Microsoft.AspNetCore.HttpOverrides;

namespace NguyenDuongNhutKhang_APIGAME.Configuration;

public static class CloudHosting
{
    public static void ConfigureGameHubHosting(this WebApplicationBuilder builder)
    {
        var config = builder.Configuration;
        var port = config["PORT"];
        if (port != null)
        {
            if (!int.TryParse(port, out var value) || value is < 1 or > 65535)
                throw new InvalidOperationException("PORT phải là số từ 1 đến 65535.");
            builder.WebHost.UseUrls($"http://0.0.0.0:{value}");
        }

        if (!builder.Environment.IsDevelopment())
        {
            if (!string.Equals(config["Database:Provider"], "PostgreSql", StringComparison.OrdinalIgnoreCase))
                throw new InvalidOperationException("Production yêu cầu Database:Provider=PostgreSql; LocalDB chỉ dành cho Development.");
            ValidateOrigins(config.GetSection("Cors:Origins").Get<string[]>() ?? []);
            if (config["AllowedHosts"] == "*" && config["RENDER_EXTERNAL_HOSTNAME"] is { Length: > 0 } hostname)
                config["AllowedHosts"] = hostname;
        }

        builder.Services.AddHttpsRedirection(o => o.HttpsPort = 443);
        builder.Services.Configure<ForwardedHeadersOptions>(o =>
        {
            o.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
            o.ForwardLimit = 1; // chỉ hop gần nhất; không nhận X-Forwarded-Host từ client
            // Không clear KnownProxies/KnownIPNetworks để tin mọi nguồn Internet.
            var networks = config.GetSection("ReverseProxy:KnownNetworks").Get<string[]>() ?? [];
            if (config["RENDER"] == "true")
                networks = [.. networks, "10.0.0.0/8", "172.16.0.0/12", "192.168.0.0/16"];
            foreach (var network in networks) o.KnownIPNetworks.Add(System.Net.IPNetwork.Parse(network));
        });
    }

    internal static void ValidateOrigins(IEnumerable<string> origins)
    {
        foreach (var origin in origins)
            if (!Uri.TryCreate(origin, UriKind.Absolute, out var uri) || uri.Scheme != "https"
                || uri.GetLeftPart(UriPartial.Authority) != origin || origin.Contains('*') || uri.UserInfo.Length != 0)
                throw new InvalidOperationException("Cors:Origins ở Production phải là origin HTTPS cụ thể, không có wildcard, path hoặc dấu / cuối.");
    }
}
