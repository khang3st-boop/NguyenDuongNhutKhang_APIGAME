# Game Hub Web API (ASP.NET Core .NET 10)

Backend C# cho Game Hub (Rubik, Sudoku, Puzzle trượt, Caro) — chạy song song, **không thay thế**
backend Java Spring Boot đang chạy trên Render. Frontend vẫn là Flutter.

- Solution: `NguyenDuongNhutKhang_APIGAME.slnx`
- API: `NguyenDuongNhutKhang_APIGAME/` — Controllers → Services → Repositories → EF Core (LocalDB Development / PostgreSQL Production)
- Test: `NguyenDuongNhutKhang_APIGAME.Tests/` — xUnit, unit + integration trên SQL Server LocalDB và PostgreSQL thật
- Tài liệu: `Docs/API_Contract_Diff.md` (so sánh với Flutter/Java), `Docs/Deploy_Plan.md`, `Docs/Flutter_Integration_Guide.md` (chạy app Flutter với .NET)

## 1. Chạy bằng Visual Studio (F5)

Yêu cầu: Visual Studio 2026 (workload ASP.NET), .NET SDK 10, SQL Server Express LocalDB (cài kèm VS).

1. Mở `NguyenDuongNhutKhang_APIGAME.slnx`, chọn startup project `NguyenDuongNhutKhang_APIGAME`, profile **http**.
2. Đặt khoá JWT (chỉ làm một lần, lưu ngoài Git trong user-secrets):
   - Chuột phải project → **Manage User Secrets**, nhập:
     `{ "Jwt": { "Key": "<chuỗi ngẫu nhiên tối thiểu 32 ký tự>" } }`
   - hoặc PowerShell trong thư mục project:
     ```powershell
     dotnet user-secrets set "Jwt:Key" "$([Convert]::ToBase64String([Security.Cryptography.RandomNumberGenerator]::GetBytes(48)))"
     ```
   Nếu chưa đặt, Development dùng khoá ngẫu nhiên tạm thời (token mất hiệu lực mỗi lần khởi động lại, log có cảnh báo);
   môi trường khác thiếu khoá → app dừng ngay khi khởi động (không có khoá mặc định trong code).
3. Database Development phải đã được đăng ký trên `(localdb)\MSSQLLocalDB`.
   `Database:RequireExisting=true` kiểm tra kết nối trước migration, tránh tạo nhầm database rỗng khi metadata bị mất.
   Nếu MDF/LDF đã có nhưng database chưa attach, sao lưu và kiểm tra file trước khi attach lại;
   xem [báo cáo sửa lỗi LocalDB](Docs/LocalDB_Startup_Fix.md). Với máy mới hoàn toàn chưa có dữ liệu,
   quản trị viên có thể cấp database và áp dụng migration bằng EF tooling trước lần F5 đầu tiên.
   Nhấn **F5** → trình duyệt mở `http://localhost:5292/swagger`; `MigrateOnStartup=true` chỉ áp dụng migration còn thiếu.
4. Trong Swagger: `POST /api/v1/auth/register` → copy `accessToken` → nút **Authorize** → dán token.

Profile **http (LAN - dien thoai that)** lắng nghe `http://*:5292` để điện thoại thật trong cùng Wi‑Fi gọi được
(có thể cần mở cổng 5292 trên Windows Firewall).

Dòng lệnh tương đương:

```powershell
dotnet restore
dotnet build -c Debug
dotnet run --project NguyenDuongNhutKhang_APIGAME --launch-profile http
dotnet test
```

File `NguyenDuongNhutKhang_APIGAME/NguyenDuongNhutKhang_APIGAME.http` chứa chuỗi request demo chạy trực tiếp trong VS.

## 2. Cấp quyền Admin (cơ chế quản trị được bảo vệ)

Đăng ký luôn chỉ tạo role **User**; body có trường `role` bị từ chối 400. Admin cấp bằng một trong hai cách:

- Lệnh cục bộ (cần quyền truy cập máy chủ + database, không qua HTTP):
  ```powershell
  dotnet run --project NguyenDuongNhutKhang_APIGAME -- grant-admin <username>
  ```
  Token cũ của tài khoản bị thu hồi; người dùng đăng nhập lại để nhận token có role Admin.
- Admin hiện có gọi `PUT /api/v1/admin/users/{id}/role` (yêu cầu role Admin).
- Tuỳ chọn: tạo Admin lúc khởi động từ user-secrets `Seed:AdminUsername` / `Seed:AdminPassword` (không commit).

## 3. Cấu hình & bí mật

| Khoá | Development | Production |
|---|---|---|
| `Database:Provider` | `SqlServer` | `PostgreSql` |
| `ConnectionStrings:Default` | LocalDB trong `appsettings.Development.json` (không mật khẩu) | `DATABASE_URL` hoặc `ConnectionStrings__Default` PostgreSQL riêng |
| `Jwt:Key` | user-secrets | biến môi trường `Jwt__Key` |
| Swagger/OpenAPI | luôn bật | không map endpoint công khai |
| `Database:MigrateOnStartup` | `true` | `false` (chạy migration có kiểm soát) |
| `Database:RequireExisting` | `true` (dừng nếu không mở được database) | `true`, dùng database cloud đã cấp |
| `Cors:Origins` | localhost | điền domain thật |

`.gitignore` chặn `appsettings.Production.json`, `appsettings.*.local.json`, `.env*`.
**Không** trỏ chuỗi kết nối vào database Neon production của Java — backend này dùng database riêng.
Deploy Docker/Render và smoke test REST/WebSocket: [Docs/Render_Deployment.md](Docs/Render_Deployment.md).
Hai bộ migration tách biệt theo `AppDbContext` và `PostgresAppDbContext`.

## 4. Kiến trúc chính

- **Xác thực**: ASP.NET Identity (hash mật khẩu, khoá tài khoản sau nhiều lần sai) + JWT HS256
  (kiểm signature, issuer, audience, lifetime, clock skew 30s) + refresh token xoay vòng lưu dạng hash.
  Claim `sv` (security version) cho phép thu hồi mọi token khi đổi mật khẩu/đổi role.
- **Lỗi**: luôn JSON `{ code, message, fieldErrors, timestamp, path }`; không lộ stack trace/SQL.
- **Rate limit**: endpoint auth (theo IP), chat (theo người dùng).
- **Trò chơi**: kết quả do server kiểm tra (Rubik giải lại bằng mô phỏng khối, Sudoku kiểm lưới,
  Caro kiểm 5 quân liên tiếp); `clientId` chống ghi trùng khi app đồng bộ lại.
- **Online**: lời mời (hết hạn 60s), phòng 2/4 người bằng mã, ghép trận theo game + vùng thô (không GPS),
  trạng thái WAITING_READY → COUNTDOWN → PLAYING → FINISHED/CANCELLED do server điều khiển (hết giờ sẵn sàng,
  hết giờ lượt Caro 30s), chat có lọc ký tự, chống trùng, giới hạn tần suất, chặn và báo cáo.
- **Realtime**: SignalR hub `/hubs/game` (token qua header hoặc `?access_token=`).
  Server → client: một method `event` với khung `{type, data, matchId, ts}`, tên sự kiện giống backend Java
  (`invite.received`, `match.state`, ...). Client → server: `Ready`, `Progress`, `Assist`, `SendChat`.
  App Flutter chọn backend bằng `--dart-define=GAMEHUB_BACKEND=java|dotnet` (mặc định `java`) — xem `Docs/API_Contract_Diff.md` mục 3, 5, 6.

## 5. Kịch bản demo (≈10 phút)

1. F5 → Swagger. `GET /api/v1/health` → `UP` (có kiểm tra database).
2. `POST /auth/register` (user A). Thử thêm `"role":"Admin"` → 400. Mật khẩu yếu → 400 `VALIDATION` + `fieldErrors`.
3. `POST /auth/login` → Authorize. `GET /users/me` (200); bỏ token → 401; `GET /admin/users` → 403.
4. `dotnet run -- grant-admin <A>` → đăng nhập lại → `GET /admin/stats` 200.
5. `POST /sudoku/results` (201) → gửi lại cùng `clientId` (200 `duplicate`) → `GET /sudoku/history`, `GET /stats/me`.
   Mở SQL Server Object Explorer → `(localdb)\MSSQLLocalDB` → `NguyenDuongNhutKhang_APIGAME_Dev` → bảng `GameResults` để thấy dữ liệu thật.
6. `GET /rubik/scramble`, `POST /rubik/results` với lời giải sai → 400 (server mô phỏng khối).
7. Đăng ký user B (cửa sổ ẩn danh). A `POST /challenges/invites` mời B chơi caro → B `accept` → cả hai `ready`
   → `POST /matches/{id}/caro/move` lần lượt tới khi 5 quân → `FINISHED`, `GET /leaderboards/online?game=caro`.
8. `POST /rooms` (capacity 4) → các user khác `POST /rooms/join {code}`.
