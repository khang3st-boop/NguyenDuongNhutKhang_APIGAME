# Bảo vệ DB Production .NET trước khi áp Auth V2

Không bước nào ở đây sửa `DATABASE_URL`, chạy migration, push hay deploy. Không dán mật khẩu / connection string vào chat.

## A. Lấy thông tin kết nối từ Render (đúng `gamehub-dotnet-db`)
1. Render Dashboard → **PostgreSQL** → chọn **`gamehub-dotnet-db`** (database `gamehub_dotnet`, region Singapore). Kiểm tra tên trước khi làm tiếp; đừng chọn database nào khác.
2. Tab **Info / Connect** → copy **External Database URL** (dạng `postgresql://user:pass@dpg-….singapore-postgres.render.com/gamehub_dotnet`).
   Chỉ dán vào cửa sổ PowerShell khi script hỏi (ẩn ký tự).
3. **Access Control (Inbound IP rules):** `render.yaml` đặt `ipAllowList: []` = chặn mọi kết nối từ ngoài. Muốn chạy từ máy bạn phải thêm **tạm** IP công cộng của bạn (dạng `x.x.x.x/32`, xem tại https://api.ipify.org). Đây là thay đổi cấu hình mạng của DB Production (không đổi dữ liệu, không tốn phí). **Xóa rule ngay khi xong.**

## B. Cài PostgreSQL Client 17 (nếu chưa có `psql`/`pg_dump`)
Máy hiện chưa có. `pg_dump` phải **cùng hoặc mới hơn** server (17).
- Cách 1 (khuyến nghị): `winget install PostgreSQL.PostgreSQL.17` (installer EDB 17.11, SHA256 do winget kiểm tra). Cách 2: tải installer 17.x từ postgresql.org.
- Ở bước chọn thành phần chỉ tick **Command Line Tools**, bỏ PostgreSQL Server / pgAdmin / Stack Builder.
- Thêm `C:\Program Files\PostgreSQL\17\bin` vào PATH, mở PowerShell mới, kiểm tra `pg_dump --version` (phải 17.x).
(Đây là bước tải và cài phần mềm — do bạn thực hiện.)

## C. Preflight (chỉ đọc)
```
powershell -NoProfile -File tools\prod-db-protect.ps1 -Step Preflight
```
Script bật `default_transaction_read_only=on` nên mọi lệnh ghi đều bị từ chối. Kết quả cần:
| Truy vấn | Mong đợi | Ý nghĩa nếu khác |
|---|---|---|
| 1. email trùng `NormalizedEmail` | **0 dòng** | Có dòng → migration sẽ lỗi ở unique index → DỪNG, báo tôi (không tự xóa tài khoản) |
| 2. bảng `AuthChallenges` | **0 dòng** | Có dòng → bảng đã tồn tại, lịch sử migration lệch → DỪNG |
| 3. lịch sử migration | chỉ `20261103185223_InitialPostgreSql` | Có thêm mục AddAuthV2 → đã áp trước đó |
Báo tôi **số dòng** của truy vấn 1 và 2 (không cần gửi nội dung email).

## D. Backup đầy đủ
```
powershell -NoProfile -File tools\prod-db-protect.ps1 -Step Backup
powershell -NoProfile -File tools\prod-db-protect.ps1 -Step Verify
```
File: `TestResults/gamehub_prod_pre_authv2.dump` (định dạng custom, đã gitignore). Dump chứa hash mật khẩu và email người dùng: **không commit, không gửi cho ai**, lưu thêm một bản ngoài máy (ổ ngoài/OneDrive riêng tư).

## E. Thử khôi phục (không đè Production)
Không tạo DB trả phí. Dùng chính Neon staging (miễn phí) làm nơi thử:
```
powershell -NoProfile -File tools\prod-db-protect.ps1 -Step Restore
```
Script tạo database `gh_restore_check` trong Neon staging, khôi phục dump vào đó, in số `Users` và lịch sử migration, từ chối nếu host là Render. So số `Users` với Production; xong chạy `DROP DATABASE gh_restore_check WITH (FORCE);` trên Neon staging. Lưu ý Neon staging là PostgreSQL 18 (Production 17): khôi phục dump 17 vào 18 là hướng được hỗ trợ.

## F. Kiểm tra cấu hình Render (không lộ bí mật)
Web service `gamehub-dotnet-api` → Environment. Chỉ cần xác nhận **tồn tại**, không dán giá trị:
- `Email__Provider` = `Resend`
- `Email__FromAddress` = `onboarding@resend.dev`
- `Email__ResendApiKey` đã có (bản mới sau khi rotate)
- `Auth__OtpKey` đã có, ≥ 32 ký tự, khác `Jwt__Key` (nếu thiếu: Add → *Generate value*)
- Không đổi `DATABASE_URL`, `Database__Provider`, `Jwt__*`.
Sau deploy, `GET /api/v1/auth/capabilities` phải trả `emailRegistration: true`; nếu `false` thì thiếu OtpKey hoặc Email.

## G. Đánh giá migration `AddAuthV2PostgreSql` (đã đọc SQL và diễn tập trên Neon PG 18)
- Chỉ: tạo bảng `AuthChallenges` + 5 index, tạo unique index `UX_Users_NormalizedEmail` (có điều kiện `NOT NULL`), xóa index thường `EmailIndex`. Không `DROP TABLE`, `TRUNCATE`, `DELETE`, đổi cột; không khóa ngoại. Chạy trong một transaction.
- Rủi ro duy nhất: email trùng làm unique index lỗi → transaction rollback, không mất dữ liệu (preflight phát hiện trước).
- Dùng DDL cơ bản, tương thích PostgreSQL 17; chưa thử trên 17 thật (có thể diễn tập trên branch Neon PG 17).
- Rollback: xem `DEPLOY_ROLLBACK_PLAN.md` (chiều xuống có `DROP TABLE "AuthChallenges"` chỉ cho bảng mới, cần duyệt riêng).
- **Lưu ý quan trọng:** (xem mục I để tách riêng) `render.yaml` đặt `Database__MigrateOnStartup=true` → **deploy bản mới = tự chạy migration Production lúc khởi động**. Vì vậy phê duyệt deploy đồng nghĩa phê duyệt migration; chỉ làm sau khi backup + preflight đạt.

## H. Kế hoạch triển khai (CHƯA THỰC HIỆN, chờ duyệt riêng)
1. Điều kiện: preflight 0 dòng; backup + kiểm tra + thử khôi phục xong; mục F đã xác nhận; đã rotate khóa lộ.
2. Push `main` lên GitHub (`autoDeployTrigger: off` → push không tự deploy).
3. Render → `gamehub-dotnet-api` → **Manual Deploy** commit `8f74d35` (kiểm tra commit trùng).
4. Theo dõi log khởi động: migration `AddAuthV2PostgreSql` được áp; không có OTP/token/khóa trong log.
5. Xác minh: `/health` 200 → `/api/v1/auth/capabilities` → đăng nhập cũ → đăng ký thử bằng Gmail của tài khoản Resend → OTP → verify → login → refresh → API game + SignalR.
6. Sự cố: Render → Rollback deploy trước; dùng dump nếu cần khôi phục dữ liệu; sau cùng xóa IP allowlist đã thêm ở mục A.

## I. Đề xuất: tách deploy khỏi migration (CHƯA áp dụng, cần duyệt riêng)
Hiện `Database__MigrateOnStartup=true` trong `render.yaml` (mặc định trong `appsettings.json` là `false`). Đề xuất:
1. Trên Render đổi `Database__MigrateOnStartup` thành `false` (hoặc xóa biến, dùng mặc định `false`), sau đó cập nhật `render.yaml` cho khớp. `Database__RequireExisting=true` giữ nguyên (không tự tạo DB). Đây là thay đổi cấu hình Production, chỉ làm khi bạn đồng ý.
2. Thứ tự an toàn, mỗi bước duyệt riêng: backup + thử khôi phục → preflight 0 dòng → áp `Docs/staging/AddAuthV2PostgreSql.sql` bằng `psql` (một transaction, `-v ON_ERROR_STOP=1`, kết nối từ máy bạn) → kiểm tra bảng/index và `__EFMigrationsHistory` → **rồi mới** deploy code mới.
3. Vì sao migration đi trước: code cũ bỏ qua bảng mới và không phụ thuộc `EmailIndex`, nên schema mới chạy được với code cũ; còn code mới mà thiếu bảng `AuthChallenges` thì lỗi. Với `MigrateOnStartup=false`, deploy trước migration sẽ không tự sửa schema.
4. Rủi ro cần biết: đổi biến môi trường làm Render khởi động lại dịch vụ; lần sau thêm migration phải nhớ áp tay. Nếu thiếu migration, API khởi động nhưng các endpoint Auth V2 trả lỗi 500 thay vì tự sửa.

## J. Áp migration có transaction thật sự (chuẩn bị, CHƯA chạy)
- `AddAuthV2PostgreSql.sql` tự mở `START TRANSACTION` và kết thúc `COMMIT`. PostgreSQL cho phép DDL trong transaction, nên lỗi ở bất kỳ câu nào (ví dụ unique index vì email trùng) làm cả khối rollback.
- `ON_ERROR_STOP` chỉ dừng psql; nó không tự tạo transaction. Nếu file có BOM làm câu `START TRANSACTION` đầu tiên lỗi, các câu sau có thể chạy ngoài transaction. Vì vậy file đã được bỏ BOM; trước khi chạy phải kiểm tra byte đầu là `53 54 41` (`STA`).
- Lệnh: `psql -X -v ON_ERROR_STOP=1 -f Docs\staging\AddAuthV2PostgreSql.sql` rồi kiểm tra `\d "AuthChallenges"`, index `UX_Users_NormalizedEmail` và `__EFMigrationsHistory`.
- Bằng chứng nên có trước khi áp thật: chạy file trên một DB Neon thử có cố ý 2 email trùng, xác nhận lệnh lỗi và schema giữ nguyên (không có `AuthChallenges`, `EmailIndex` còn).
