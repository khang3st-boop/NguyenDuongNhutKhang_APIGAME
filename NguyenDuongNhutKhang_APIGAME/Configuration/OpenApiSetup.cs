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

                        Realtime (chat, trạng thái trận) qua SignalR hub `/hubs/game?access_token=<JWT>`.
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
