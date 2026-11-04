using Microsoft.AspNetCore.Authorization;
using Microsoft.OpenApi;

namespace NguyenDuongNhutKhang_APIGAME.Configuration;

/// <summary>Tài liệu OpenAPI: thông tin chung, nút Authorize (Bearer JWT), khoá ổ cho endpoint cần đăng nhập.</summary>
public static class OpenApiSetup
{
    public const string Scheme = "Bearer";

    public static IServiceCollection AddGameHubOpenApi(this IServiceCollection services) =>
        services.AddOpenApi(o =>
        {
            o.AddDocumentTransformer((doc, _, _) =>
            {
                doc.Info = new OpenApiInfo
                {
                    Title = "Game Hub API",
                    Version = "v1",
                    Description = """
                        Web API cho app Flutter **Game Hub** (Rubik, Sudoku, Xếp hình, Caro).

                        **Cách thử nhanh:** `POST /api/v1/auth/register` → copy `accessToken` → bấm **Authorize** → dán token
                        (không cần gõ chữ `Bearer`). Access token sống 15 phút; dùng `POST /api/v1/auth/refresh` để lấy token mới.

                        ## Realtime — SignalR (không thử được bằng Swagger)
                        - **Hub:** `wss://<host>/hubs/game` — xác thực bằng JWT: header `Authorization: Bearer <accessToken>` hoặc `?access_token=<accessToken>` (WebSocket/SSE).
                        - **Client gọi server (invoke):** `Ping()` → giờ server (giữ online); `SendChat(matchId, text, clientId?)` → tin nhắn phòng;
                          `Ready(matchId, ready)` → trạng thái trận; `Progress(matchId, progress)` → `true`; `Assist(matchId)` → trạng thái trận (trợ giúp, có thể bị khoá theo luật phòng).
                        - **Server đẩy về client:** một method duy nhất `event` với payload `{ "type", "data", "matchId", "ts" }`. Các `type`: `invite.received`,
                          `invite.accepted|declined|cancelled|expired`, `matchmaking.found`, `match.state`, `match.ended`, `match.left`, `match.connection`,
                          `match.chat`, `chat.message`, `presence`, `presence.self`, `friend.*`, `lobby.updated`.
                        - **Lỗi:** `HubException` với thông điệp dạng `MÃ_LỖI: mô tả` (ví dụ `FORBIDDEN`, `NOT_FOUND`, `CONFLICT`).
                        - **Luồng thách đấu:** A `POST /api/v1/challenges/invites` → B nhận `invite.received` → B `POST .../invites/{id}/accept` →
                          cả hai nhận `match.state` (WAITING) → cả hai `Ready(matchId,true)` hoặc `POST /api/v1/matches/{id}/ready` → `COUNTDOWN` 3 giây → `PLAYING` →
                          `Progress`/`POST /api/v1/matches/{id}/caro/move` (Caro) → `POST /api/v1/matches/{id}/finish` → `match.ended` (kết quả ghi vào bảng xếp hạng).
                        - Mất kết nối: server phát `match.connection {userId, connected:false}`; client kết nối lại cùng JWT và đọc lại `GET /api/v1/matches/{id}`.
                        """,
                };
                doc.Components ??= new OpenApiComponents();
                doc.Components.SecuritySchemes ??= new Dictionary<string, IOpenApiSecurityScheme>();
                doc.Components.SecuritySchemes[Scheme] = new OpenApiSecurityScheme
                {
                    Type = SecuritySchemeType.Http,
                    Scheme = "bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description = "Dán access token nhận được từ /api/v1/auth/login hoặc /register.",
                };
                return Task.CompletedTask;
            });

            o.AddOperationTransformer((op, ctx, _) =>
            {
                var meta = ctx.Description.ActionDescriptor.EndpointMetadata;
                var needsAuth = meta.OfType<IAuthorizeData>().Any() && !meta.OfType<IAllowAnonymous>().Any();
                if (!needsAuth) return Task.CompletedTask;

                op.Security ??= [];
                op.Security.Add(new OpenApiSecurityRequirement
                {
                    [new OpenApiSecuritySchemeReference(Scheme, ctx.Document)] = [],
                });
                op.Responses ??= new OpenApiResponses();
                op.Responses.TryAdd("401", new OpenApiResponse { Description = "Chưa đăng nhập, token sai/hết hạn hoặc đã bị thu hồi." });
                if (meta.OfType<IAuthorizeData>().Any(a => !string.IsNullOrEmpty(a.Roles)))
                    op.Responses.TryAdd("403", new OpenApiResponse { Description = "Không đủ quyền (cần role Admin)." });
                return Task.CompletedTask;
            });
        });
}
