using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NguyenDuongNhutKhang_APIGAME.Data;
using NguyenDuongNhutKhang_APIGAME.DTOs;
using NguyenDuongNhutKhang_APIGAME.Helpers;

namespace NguyenDuongNhutKhang_APIGAME.Middleware;

/// <summary>
/// Chuyển mọi lỗi thành <see cref="ErrorResponse"/>. Lỗi không lường trước chỉ trả thông báo chung
/// (chi tiết ghi log phía server), không lộ stack trace, câu SQL hay chuỗi kết nối.
/// </summary>
public class ErrorHandlingMiddleware(RequestDelegate next, ILogger<ErrorHandlingMiddleware> logger)
{
    public async Task InvokeAsync(HttpContext ctx)
    {
        try
        {
            await next(ctx);
        }
        catch (AppException ex)
        {
            await ErrorWriter.WriteAsync(ctx, ex.Status, ex.Code, ex.Message, ex.Fields, ex.RetryAfterSeconds);
        }
        catch (DbUpdateConcurrencyException)
        {
            await ErrorWriter.WriteAsync(ctx, 409, "CONFLICT", "Dữ liệu vừa được thay đổi bởi thao tác khác, vui lòng thử lại.");
        }
        catch (DbUpdateException ex) when (IsUniqueViolation(ex))
        {
            await ErrorWriter.WriteAsync(ctx, 409, "CONFLICT", "Dữ liệu đã tồn tại.");
        }
        catch (OperationCanceledException) when (ctx.RequestAborted.IsCancellationRequested)
        {
            // client đã ngắt kết nối
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Lỗi không xử lý được tại {Path}", ctx.Request.Path);
            await ErrorWriter.WriteAsync(ctx, 500, "INTERNAL_ERROR", "Máy chủ gặp lỗi, vui lòng thử lại sau.");
        }
    }

    private static bool IsUniqueViolation(DbUpdateException ex) =>
        DatabaseErrors.IsUniqueViolation(ex);
}

public static class ErrorWriter
{
    private static readonly JsonSerializerOptions Json = new(JsonSerializerDefaults.Web);

    public static ErrorResponse Build(HttpContext ctx, string code, string message, IReadOnlyList<FieldError>? fields = null) =>
        new(code, message, fields ?? [], DateTime.UtcNow, ctx.Request.Path);

    public static async Task WriteAsync(HttpContext ctx, int status, string code, string message, IReadOnlyList<FieldError>? fields = null, int? retryAfterSeconds = null)
    {
        if (ctx.Response.HasStarted) return;
        ctx.Response.Clear();
        ctx.Response.StatusCode = status;
        if (retryAfterSeconds is > 0) ctx.Response.Headers.RetryAfter = retryAfterSeconds.Value.ToString();
        ctx.Response.ContentType = "application/json; charset=utf-8";
        await ctx.Response.WriteAsync(JsonSerializer.Serialize(Build(ctx, code, message, fields), Json));
    }

    /// <summary>Lỗi validation DTO → 400 VALIDATION với danh sách trường lỗi (tên trường camelCase).</summary>
    public static IActionResult Validation(ActionContext ctx)
    {
        var fields = new List<FieldError>();
        var malformed = false;
        foreach (var (key, entry) in ctx.ModelState)
        {
            if (entry.Errors.Count == 0) continue;
            if (key == "$" || key.StartsWith("$."))
            {
                malformed = true;
                var name = key.Length > 2 ? key[2..] : "body";
                fields.Add(new FieldError(name, "Dữ liệu JSON sai định dạng hoặc chứa trường không được phép."));
                continue;
            }
            var field = string.Join('.', key.Split('.').Select(p => p.Length > 0 ? char.ToLowerInvariant(p[0]) + p[1..] : p));
            fields.AddRange(entry.Errors.Select(e => new FieldError(field,
                string.IsNullOrWhiteSpace(e.ErrorMessage) ? "Giá trị không hợp lệ." : e.ErrorMessage)));
        }
        // Body JSON hỏng thường kéo theo lỗi "request is required" vô nghĩa → chỉ giữ lỗi JSON.
        if (malformed) fields = fields.Where(f => f.Message.StartsWith("Dữ liệu JSON")).ToList();

        var body = Build(ctx.HttpContext, "VALIDATION", "Dữ liệu gửi lên không hợp lệ.", fields);
        return new BadRequestObjectResult(body) { ContentTypes = { "application/json" } };
    }
}
