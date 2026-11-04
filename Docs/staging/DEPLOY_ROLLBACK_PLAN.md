# Kế hoạch cập nhật Auth V2 trên gamehub-dotnet-api và rollback

Không chứa bí mật. Chưa thực hiện bước nào trong tài liệu này.

## Trước khi deploy (cần phê duyệt)
1. Xác định DB mà `DATABASE_URL` của gamehub-dotnet-api đang trỏ (Dashboard → Environment; chỉ nhìn host/tên DB, không dán mật khẩu vào chat).
2. Backup: `pg_dump --format=custom --no-owner "$DATABASE_URL" -f gamehub_prod_pre_authv2.dump`
   rồi kiểm tra khôi phục: tạo DB trống riêng và `pg_restore --list` / `pg_restore -d <db-trống>`; so sánh số dòng `Users`.
3. `Docs/staging/preflight_AddAuthV2.sql` trên Production (chỉ đọc): mọi truy vấn 1 và 2 phải trả 0 dòng.
4. Thử migration trên Neon staging đã được xác nhận là DB riêng: tạo schema từ `InitialPostgreSql`, thêm dữ liệu mẫu, áp `AddAuthV2PostgreSql`, kiểm tra bảng/index, rồi thử rollback.

## Rollback
- Migration chỉ thêm bảng `AuthChallenges`, các index, unique index `UX_Users_NormalizedEmail` và bỏ index thường `EmailIndex`. Không xoá dữ liệu người dùng.
- Hoàn tác schema (chỉ khi cần): `dotnet ef database update InitialPostgreSql --context PostgresAppDbContext` (Down xoá `AuthChallenges` rỗng/OTP tạm thời, tạo lại `EmailIndex`).
- Hoàn tác code: Render → Events → Rollback về deploy trước (`dep-dbl31gu7bikc7388f2pg`). Code cũ bỏ qua bảng mới nên vẫn chạy.
- Hoàn tác dữ liệu: `pg_restore` từ bản dump bước 2 vào DB mới rồi đổi `DATABASE_URL` (chỉ khi có sự cố mất dữ liệu).

## Biến môi trường Render (nhập tay, không qua chat)
- `Email__FromAddress` = `onboarding@resend.dev` (chỉ địa chỉ; code đã chịu được dạng cũ).
- `Auth__OtpKey`: Environment → Add → "Generate value" (Render sinh chuỗi ngẫu nhiên); phải ≥ 32 ký tự; không dùng lại `Jwt__Key`.
- Không đổi `DATABASE_URL`, `Database__Provider`, `Jwt__*`.
