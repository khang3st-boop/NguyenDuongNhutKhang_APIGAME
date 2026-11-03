# Kế hoạch SQL Server cũ (lưu tham khảo)

**Đã được thay thế theo yêu cầu ngày 04/11/2026:** triển khai Render/PostgreSQL độc lập theo
[Render_Deployment.md](Render_Deployment.md). Nội dung dưới đây là đề xuất SQL Server trước đó, không phải cấu hình đang triển khai.

Nguyên tắc: **không đụng** dịch vụ Java đang chạy trên Render và database Neon production.
Backend .NET chạy như một dịch vụ **mới, song song**, với database SQL Server riêng.

## 1. Hạ tầng đề xuất

| Thành phần | Lựa chọn | Ghi chú |
|---|---|---|
| App | Docker image `mcr.microsoft.com/dotnet/aspnet:10.0` trên Render (Web Service mới) hoặc Azure App Service | không tái dùng service Java |
| Database | Azure SQL / SQL Server riêng (Basic tier đủ cho demo) | KHÔNG dùng Neon (PostgreSQL); provider hiện tại là SQL Server |
| Realtime | SignalR trên cùng instance (1 instance) | >1 instance cần Azure SignalR Service hoặc Redis backplane |
| HTTPS | do nền tảng cung cấp | **cần thêm** `UseForwardedHeaders` (+ KnownProxies) trước khi deploy sau proxy, nếu không rate limit theo IP sẽ thấy IP của proxy và `UseHttpsRedirection` có thể lặp chuyển hướng |

## 2. Biến môi trường Production (đặt trên dashboard, không commit)

```
ASPNETCORE_ENVIRONMENT=Production
ConnectionStrings__Default=<chuỗi kết nối SQL Server riêng>
Jwt__Key=<≥ 32 byte ngẫu nhiên, khác Development>
Cors__Origins__0=<domain web của Flutter nếu có>
Swagger__Enabled=false
Database__MigrateOnStartup=false
```

## 3. Migration có kiểm soát (không phá dữ liệu)

1. Sinh script idempotent: `dotnet ef migrations script --idempotent -o migrate.sql` (project API).
2. Review script — chỉ chấp nhận lệnh tạo/ thêm; từ chối `DROP`/đổi kiểu cột khi chưa có kế hoạch sao lưu.
3. Sao lưu database → chạy script → kiểm `GET /api/v1/health` = `UP`.
4. Giữ `MigrateOnStartup=false` ở Production.

## 4. Thứ tự rollout

1. Deploy service .NET mới với URL riêng (ví dụ `gamehub-dotnet.onrender.com`); chạy smoke test REST + `/hubs/game/negotiate`.
2. Flutter **bản Dev/Beta** trỏ URL mới bằng `--dart-define=GAMEHUB_API_URL=...`; bản Prod vẫn trỏ Java.
3. Làm `SignalRTransport` trong Flutter (xem `API_Contract_Diff.md` §3) và các endpoint còn thiếu
   (`/challenges` kiểu cũ, chat 1-1, `/presence/me`) nếu quyết định thay thế Java.
4. Chỉ khi đủ tính năng + có kế hoạch di chuyển tài khoản/kết quả (xuất từ Neon → nhập SQL Server, kiểm đếm) mới cân nhắc chuyển Prod.
   Rollback: đổi lại URL build Flutter về Java — dữ liệu Java không bị chạm nên rollback an toàn.

## 5. Bảo mật trước khi public

- Đổi `Jwt__Key`, tạo Admin bằng `grant-admin` qua shell của nền tảng (không qua HTTP công khai).
- Bật Swagger ở Production chỉ khi đặt sau xác thực/IP allowlist; mặc định tắt.
- Theo dõi log rate limit (429) và báo cáo chat (`/admin/reports`).
