# Deploy .NET Game Hub lên Render — 04/11/2026

Backend .NET có repo, service, JWT key và PostgreSQL riêng. Java `gamehub-server` tại
`https://gamehub-server-ktid.onrender.com` tiếp tục phục vụ Flutter Web; không sửa repo/service/Neon của Java.

## Kiểm thử và migration

```powershell
dotnet build -c Debug
dotnet build -c Release
dotnet test -c Release --no-build
```

Test mặc định dùng LocalDB **riêng**, tên ngẫu nhiên. Để chạy cùng suite trên PostgreSQL test,
đặt `GAMEHUB_TEST_POSTGRES` bằng connection string của server test có quyền tạo database,
rồi chạy `dotnet test -c Release --no-build`. Giữ password trong biến môi trường, không ghi vào source/lịch sử shell.
Database test được giữ lại sau khi chạy. Workflow `.github/workflows/verify.yml` chỉ chạy thủ công để kiểm soát usage.

| Provider | Context | Migration |
|---|---|---|
| SQL Server / LocalDB | `AppDbContext` | Hai migration gốc trong `Migrations/`, giữ nguyên |
| PostgreSQL | `PostgresAppDbContext` | `Migrations/PostgreSQL/`, snapshot riêng |

PostgreSQL dùng `uuid`, timestamp UTC, filter có nháy kép và `xmin` cho concurrency;
LocalDB giữ kiểu SQL Server và `rowversion`. Khi đổi model, thêm/review migration cho cả hai context:

```powershell
dotnet ef migrations add <Name> --context AppDbContext --project NguyenDuongNhutKhang_APIGAME
dotnet ef migrations add <Name> --context PostgresAppDbContext --project NguyenDuongNhutKhang_APIGAME --output-dir Migrations/PostgreSQL
dotnet ef migrations script --context PostgresAppDbContext --project NguyenDuongNhutKhang_APIGAME --idempotent --output artifacts/postgres-migrate.sql
```

Không chạy migration SQL Server vào PostgreSQL, không tự copy tài khoản/lịch sử LocalDB lên Cloud.
Database cloud mới chỉ được tạo schema và role. Chuyển dữ liệu thật cần kế hoạch và backup riêng.

## GitHub và triển khai Blueprint từng bước

1. Dùng repo private **`khang3st-boop/NguyenDuongNhutKhang_APIGAME`**, branch `main`.
   Không đặt remote vào repo Java `khang3st-boop/gamehub-server`.
2. Quét secrets cả lịch sử Git và source sắp push; không commit user-secrets, `.env`, MDF/LDF/BAK,
   database test, log, file `*.private.json`. Push source đã kiểm thử.
3. Render Dashboard → **New → Blueprint**, chọn repo .NET trên.
4. Đặt tên Blueprint `gamehub-dotnet`, branch `main`, path `render.yaml`.
5. Kiểm tra preview chỉ tạo hai tài nguyên **mới**, cùng Singapore:
   Web Service `gamehub-dotnet-api` (Docker, **Free**) và PostgreSQL `gamehub-dotnet-db` (17, **Free**).
6. Điền `Cors__Origins__0=https://gamehub-server-ktid.onrender.com` khi Render hỏi giá trị `sync:false`.
   Thêm origin HTTPS thực sự cần qua `Cors__Origins__N`; không wildcard, path hoặc dấu `/` cuối.
7. Kiểm tra tổng chi phí **$0**; không chọn Starter/Basic, disk, replica, storage autoscaling hoặc nâng cấp workspace.
8. Chọn **Deploy Blueprint**. Render tự tạo `Jwt__Key` và truyền URL database mới vào `DATABASE_URL`.
9. Chờ database `Available`, web deploy `Live`, lấy URL HTTPS .NET trên trang service mới.
10. Chạy smoke test ở mục dưới; xác nhận Java vẫn giữ deploy/commit cũ và website hoạt động.

Nếu workspace đã có một Postgres Free đang hoạt động, không xóa/nâng cấp database đó để lấy chỗ;
dừng tạo mới và thống nhất phương án database riêng khác với chủ tài khoản.

## Biến môi trường và bảo mật

| Biến | Giá trị / nguồn |
|---|---|
| `ASPNETCORE_ENVIRONMENT` | `Production` |
| `Database__Provider` | `PostgreSql` |
| `Database__RequireExisting` | `true`, chỉ mở database Render đã cấp |
| `Database__MigrateOnStartup` | `true` cho migration đã review trên database .NET riêng |
| `DATABASE_URL` | Blueprint `fromDatabase.connectionString`, không log giá trị |
| `Jwt__Key` | Render `generateValue:true`, khác Development và Java |
| `Jwt__Issuer` / `Jwt__Audience` | `GameHub.DotNet.Api` / `GameHub.Client` |
| `Cors__Origins__0` | Origin Flutter Web cụ thể |
| `Swagger__Enabled` | `false`; code chỉ map Swagger/OpenAPI ở Development |
| `PORT` | Render cấp; API bind `http://0.0.0.0:$PORT` |

Production thiếu JWT key hoặc dùng LocalDB bị từ chối trước migrate/seed.
URL PostgreSQL public dùng TLS `VerifyFull`; chỉ host private `dpg-…-a` khi `RENDER=true`
dùng TLS `Require` vì chứng chỉ nội bộ Render tự ký. Không lấy `sslmode=disable` từ query URL.
`ipAllowList:[]` trong Blueprint không mở database ra Internet.

Forwarded headers chạy trước HTTPS/auth/rate limit, chỉ tin loopback/proxy private trên Render,
giới hạn một hop, không nhận `X-Forwarded-Host`, không clear trusted proxies để tin mọi IP.
Ngoài Render có thể cấu hình CIDR proxy qua `ReverseProxy__KnownNetworks__N`.
Host filtering dùng `RENDER_EXTERNAL_HOSTNAME` nếu chưa có allowlist riêng.

Free không có pre-deploy command/shell. Lần triển khai này migrate khi khởi động với migration lock EF,
chỉ áp dụng migration thiếu, không reset dữ liệu. Review/backup trước mỗi thay đổi schema.
Nếu có runner quản trị riêng, có thể chạy image bằng lệnh
`dotnet NguyenDuongNhutKhang_APIGAME.dll migrate`, rồi tắt `Database__MigrateOnStartup`.

## REST, SignalR và Flutter

Readiness: `GET /health` hoặc `/api/v1/health` → 200, `database=UP`; database lỗi → 503.
Liveness: `GET /health/live` → 200. Swagger/OpenAPI Production → 404.

```powershell
$env:GAMEHUB_SMOKE_ORIGIN = 'https://gamehub-server-ktid.onrender.com'
dotnet run --project tools/GameHub.Smoke -c Release -- https://<service-.NET>.onrender.com
```

Smoke tạo tài khoản QA mới, kiểm đăng ký/đăng nhập/JWT, thiếu/sai chữ ký, đọc/ghi và chống trùng bốn game,
CORS hợp lệ/bị từ chối, negotiate cần JWT và **WebSocket SignalR thực tế + gọi `Ping`**.
Report mặc định `artifacts/cloud-smoke.json`; file `.private.json` cùng chỗ chứa tài khoản QA/token,
phải giữ ngoài Git. Đặt `GAMEHUB_SMOKE_OUTPUT` để lưu ở thư mục kiểm thử riêng.
Password/JWT/refresh token không in ra console.

API .NET dùng **SignalR JSON**, không phải STOMP của Java. Chỉ bản Flutter Dev/Beta đã hỗ trợ transport SignalR
mới chọn `.NET`; không đổi URL của Flutter Web hiện tại chỉ vì backend mới đã deploy:

```text
--dart-define=GAMEHUB_BACKEND=dotnet
--dart-define=GAMEHUB_API_URL=https://<service-.NET>.onrender.com
```

## Giới hạn và vận hành

- Giữ một instance vì presence/countdown/matchmaking có state trong tiến trình; scale cần backplane/distributed state.
- Web Free ngủ sau 15 phút không có traffic; lần HTTP/WebSocket tiếp theo có thể chờ khoảng một phút.
- Postgres Free: **30 ngày**, 1 GB, không có managed backup. Xuất backup trước hạn; không tự nâng trả phí.
- Auto deploy đặt `off`. Lần sau review/test/scan secrets rồi Manual Deploy **service .NET**.
- Không deploy/rollback/xóa service hoặc Blueprint Java, không đụng Neon.

Nguồn: [Render port/Docker](https://render.com/docs/web-services), [Free](https://render.com/docs/free),
[Postgres/TLS](https://render.com/docs/postgresql-creating-connecting),
[EF nhiều provider](https://learn.microsoft.com/en-us/ef/core/managing-schemas/migrations/providers),
[Npgsql xmin](https://www.npgsql.org/efcore/modeling/concurrency.html),
[ASP.NET proxy](https://learn.microsoft.com/en-us/aspnet/core/host-and-deploy/proxy-load-balancer?view=aspnetcore-10.0).
