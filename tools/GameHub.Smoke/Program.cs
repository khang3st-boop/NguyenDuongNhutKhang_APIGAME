using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Security.Cryptography;
using System.Text.Json;
using Microsoft.AspNetCore.Http.Connections;
using Microsoft.AspNetCore.SignalR.Client;

if (args.Length != 1 || !Uri.TryCreate(args[0].TrimEnd('/') + "/", UriKind.Absolute, out var baseUri)
    || (baseUri.Scheme != "https" && !(baseUri.Scheme == "http" && baseUri.IsLoopback)))
    throw new ArgumentException("Dùng: dotnet run --project tools/GameHub.Smoke -- https://<service-.NET>.onrender.com");

var output = Path.GetFullPath(Environment.GetEnvironmentVariable("GAMEHUB_SMOKE_OUTPUT") ?? "artifacts/cloud-smoke.json");
Directory.CreateDirectory(Path.GetDirectoryName(output)!);
var forwardHttps = baseUri.IsLoopback && Environment.GetEnvironmentVariable("GAMEHUB_SMOKE_FORWARDED_HTTPS") == "true";
using var http = new HttpClient(new HttpClientHandler { AllowAutoRedirect = false }) { BaseAddress = baseUri, Timeout = TimeSpan.FromSeconds(120) };
if (forwardHttps) http.DefaultRequestHeaders.Add("X-Forwarded-Proto", "https");
var report = new Dictionary<string, object?> { ["url"] = baseUri.ToString(), ["startedAt"] = DateTime.UtcNow };

async Task<JsonElement> Call(HttpMethod method, string path, object? body = null, string? token = null, params HttpStatusCode[] expected)
{
    using var request = new HttpRequestMessage(method, path);
    if (body != null) request.Content = JsonContent.Create(body);
    if (token != null) request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
    using var response = await http.SendAsync(request);
    if (expected.Length > 0 && !expected.Contains(response.StatusCode))
        throw new InvalidOperationException($"{method} {path}: HTTP {(int)response.StatusCode}; expected {string.Join('/', expected.Select(x => (int)x))}.");
    var text = await response.Content.ReadAsStringAsync();
    return string.IsNullOrWhiteSpace(text) || !response.Content.Headers.ContentType?.MediaType?.Contains("json") == true
        ? default : JsonDocument.Parse(text).RootElement.Clone();
}

var health = await Call(HttpMethod.Get, "health", expected: [HttpStatusCode.OK]);
if (health.GetProperty("database").GetString() != "UP") throw new InvalidOperationException("Database health is not UP.");
report["health"] = "UP";
await Call(HttpMethod.Get, "swagger/index.html", expected: [HttpStatusCode.NotFound]);
await Call(HttpMethod.Get, "openapi/v1.json", expected: [HttpStatusCode.NotFound]);
report["productionSwagger"] = 404;

var password = "Qa" + Convert.ToHexString(RandomNumberGenerator.GetBytes(16)) + "9";
var username = "cloudqa_" + Guid.NewGuid().ToString("N")[..8];
var registered = await Call(HttpMethod.Post, "api/v1/auth/register", new { username, displayName = "Cloud QA", password },
    expected: [HttpStatusCode.Created]);
var userId = registered.GetProperty("user").GetProperty("id").GetString()!;
var login = await Call(HttpMethod.Post, "api/v1/auth/login", new { username, password }, expected: [HttpStatusCode.OK]);
var token = login.GetProperty("accessToken").GetString()!;
await File.WriteAllTextAsync(Path.ChangeExtension(output, ".private.json"), JsonSerializer.Serialize(new
{
    username, password, userId, accessToken = token, refreshToken = login.GetProperty("refreshToken").GetString(),
}));
report["registration"] = 201;
report["login"] = 200;
await Call(HttpMethod.Get, "api/v1/users/me", expected: [HttpStatusCode.Unauthorized]);
var me = await Call(HttpMethod.Get, "api/v1/users/me", token: token, expected: [HttpStatusCode.OK]);
if (me.GetProperty("id").GetString() != userId) throw new InvalidOperationException("JWT identity mismatch.");
var parts = token.Split('.');
parts[2] = (parts[2][0] == 'A' ? "B" : "A") + parts[2][1..];
await Call(HttpMethod.Get, "api/v1/users/me", token: string.Join('.', parts), expected: [HttpStatusCode.Unauthorized]);
report["validJwt"] = 200;
report["missingOrTamperedJwt"] = 401;

var histories = new Dictionary<string, object>();
foreach (var (game, mode) in new[] { ("rubik", "3x3"), ("sudoku", "easy"), ("puzzle", "3x3"), ("caro", "15x15") })
{
    var clientId = "cloudqa_" + Guid.NewGuid().ToString("N");
    var input = new { clientId, mode, outcome = "loss", durationMs = 60000, moves = 10 };
    var saved = await Call(HttpMethod.Post, $"api/v1/{game}/results", input, token, HttpStatusCode.Created);
    var duplicate = await Call(HttpMethod.Post, $"api/v1/{game}/results", input, token, HttpStatusCode.OK);
    if (!duplicate.GetProperty("duplicate").GetBoolean()) throw new InvalidOperationException("Duplicate result was not detected.");
    var history = await Call(HttpMethod.Get, $"api/v1/{game}/history", token: token, expected: [HttpStatusCode.OK]);
    if (history.GetArrayLength() != 1 || history[0].GetProperty("id").GetString() != saved.GetProperty("result").GetProperty("id").GetString())
        throw new InvalidOperationException($"{game} result was not persisted.");
    histories[game] = new { write = 201, duplicate = 200, historyCount = 1, resultId = history[0].GetProperty("id").GetString() };
}
report["gameResults"] = histories;

var origin = Environment.GetEnvironmentVariable("GAMEHUB_SMOKE_ORIGIN");
if (!string.IsNullOrWhiteSpace(origin))
{
    using var preflight = new HttpRequestMessage(HttpMethod.Options, "api/v1/auth/register");
    preflight.Headers.Add("Origin", origin);
    preflight.Headers.Add("Access-Control-Request-Method", "POST");
    using var response = await http.SendAsync(preflight);
    if (!response.Headers.TryGetValues("Access-Control-Allow-Origin", out var allowed) || allowed.Single() != origin)
        throw new InvalidOperationException("CORS origin was not allowed.");
    report["cors"] = origin;
    using var forbidden = new HttpRequestMessage(HttpMethod.Options, "api/v1/auth/register");
    forbidden.Headers.Add("Origin", "https://untrusted.example.com");
    forbidden.Headers.Add("Access-Control-Request-Method", "POST");
    using var denied = await http.SendAsync(forbidden);
    if (denied.Headers.Contains("Access-Control-Allow-Origin")) throw new InvalidOperationException("Untrusted CORS origin was allowed.");
    report["untrustedCors"] = "denied";
}

await Call(HttpMethod.Post, "hubs/game/negotiate?negotiateVersion=1", new { }, expected: [HttpStatusCode.Unauthorized]);
await using var hub = new HubConnectionBuilder().WithUrl(new Uri(baseUri, "hubs/game"), options =>
{
    options.Transports = HttpTransportType.WebSockets;
    options.AccessTokenProvider = () => Task.FromResult<string?>(token);
    if (forwardHttps) options.Headers["X-Forwarded-Proto"] = "https";
}).Build();
await hub.StartAsync();
var ping = await hub.InvokeAsync<DateTime>("Ping");
if (Math.Abs((ping.ToUniversalTime() - DateTime.UtcNow).TotalMinutes) > 2)
    throw new InvalidOperationException("SignalR Ping returned an unexpected time.");
report["signalR"] = new { transport = "WebSockets", ping = "passed", unauthorizedNegotiate = 401 };
await hub.StopAsync();
report["testUser"] = username;
report["completedAt"] = DateTime.UtcNow;
report["passed"] = true;
var json = JsonSerializer.Serialize(report, new JsonSerializerOptions { WriteIndented = true });
await File.WriteAllTextAsync(output, json);
Console.WriteLine(json); // Không in password, JWT hoặc refresh token.
