# Bàn giao triển khai Render .NET — 04/11/2026

## Cloud đã hoạt động

| Thành phần | Kết quả |
|---|---|
| API | **https://gamehub-dotnet-api.onrender.com** |
| Health readiness | https://gamehub-dotnet-api.onrender.com/health — HTTP 200, database `UP` |
| Liveness | https://gamehub-dotnet-api.onrender.com/health/live |
| GitHub | https://github.com/khang3st-boop/NguyenDuongNhutKhang_APIGAME — private, branch `main` |
| Commit code đang deploy | `4675a8b69429188918fb3422ed38b580f11a2e3d` |
| Web Service | `gamehub-dotnet-api`, `srv-dbl31ge7bikc7388f1v0`, Docker, **Free**, Singapore |
| Deploy | `dep-dbl31gu7bikc7388f2pg` — **Live**, Docker build/deploy thành công trong khoảng 1m40s |
| Blueprint | `gamehub-dotnet`, `exs-dbl305s9v7es73fnscd0` |
| PostgreSQL | `gamehub-dotnet-db`, database `gamehub_dotnet`, PostgreSQL **17**, Singapore, **Available** |
| Database ID | `dpg-dbl31767bikc7388eeag-a` |
| Database plan | **Free**, 1 GB, Storage Autoscaling **Disabled** |
| Hết hạn database | **04/12/2026 02:06 giờ Việt Nam** (`2026-12-03T19:06:05.348303Z`) |

Dashboard: [Web service .NET](https://dashboard.render.com/web/srv-dbl31ge7bikc7388f1v0),
[Database .NET](https://dashboard.render.com/d/dpg-dbl31767bikc7388eeag-a),
[Blueprint .NET](https://dashboard.render.com/blueprint/exs-dbl305s9v7es73fnscd0).

Chỉ tạo hai tài nguyên Free mới. Không chọn gói trả phí, disk, replica, autoscaling hoặc nâng cấp workspace.
Postgres Free không phải database lưu trữ vô thời hạn: cần xuất backup/di chuyển trước thời hạn;
không tự nâng trả phí. Web Free có thể ngủ khi không có traffic. Xem [giới hạn Render Free](https://render.com/docs/free).

## Cấu hình vận hành

- Development giữ `(localdb)\MSSQLLocalDB` và database Development hiện có.
- Production dùng `PostgresAppDbContext` và bộ migration PostgreSQL riêng; hai migration SQL Server gốc giữ nguyên SHA-256.
- Migration PostgreSQL đầu tiên tạo schema, không có `DROP`, `TRUNCATE` hoặc `DELETE` trong script triển khai đã review.
- Docker multi-stage .NET 10, publish Release, chạy non-root; nhận `PORT`, bind `0.0.0.0`.
- Forwarded headers, host filtering, HTTPS, CORS allowlist, JWT signature/issuer/audience/lifetime đều hoạt động.
- `Cors__Origins__0=https://gamehub-server-ktid.onrender.com`; origin không được phép không có ACAO.
- JWT key Production do Render sinh, nằm trong environment variables, không ghi vào Git hoặc báo cáo.
- `DATABASE_URL` tham chiếu database .NET mới qua Blueprint; không trỏ LocalDB/Neon của Java.
- Swagger/OpenAPI chỉ map ở Development; cả `/swagger/index.html` và `/openapi/v1.json` trên Cloud trả 404.
- Health readiness `/health` kiểm tra database; `/health/live` chỉ kiểm tra tiến trình.
- Giữ một instance cho state presence/matchmaking/countdown. Service auto deploy đặt `off`.

## Kết quả kiểm thử

| Kiểm tra | Kết quả |
|---|---|
| Build Debug | Thành công, 0 warning/error |
| Build Release và publish | Thành công, 0 warning/error |
| SQL Server suite | **79/79 passed**, 0 skipped |
| PostgreSQL suite | **79/79 passed**, 0 skipped, database kiểm thử riêng |
| Migration lặp lại | Không có migration thiếu; không tạo lại schema hoặc role trùng |
| Concurrency phòng đấu | Writer dùng version cũ bị từ chối trên SQL Server lẫn PostgreSQL (`xmin`) |
| Secret scan | Gitleaks: không tìm thấy secrets trong lịch sử Git, source chuẩn bị push hoặc commit code |
| Production local | REST/JWT/CORS/CRUD bốn game và WebSocket SignalR đạt, dù thử `Swagger__Enabled=true` vẫn 404 |
| Cloud health | HTTP 200, API/Database `UP` |
| Cloud register / login | 201 / 200 |
| Cloud JWT | Hợp lệ: 200; thiếu/sai chữ ký: 401 |
| Cloud dữ liệu | Mỗi Rubik/Sudoku/Puzzle/Caro ghi 201, đọc lại đúng result ID |
| Cloud chống trùng | Gửi lại clientId: 200/`duplicate=true`, không nhân đôi |
| Cloud CORS | Origin Flutter Web được phép; origin thử không tin cậy bị từ chối |
| Cloud SignalR | Negotiate không JWT: 401; kết nối **WebSocket thật**, gọi hub method `Ping` thành công |
| Độc lập máy cá nhân | Đã dừng cả API Production QA và PostgreSQL QA cục bộ; Cloud vẫn `database=UP`, JWT trả 200 |
| Development sau deploy | F5 profile `http` tiếp tục chạy LocalDB, Swagger localhost:5292 trả 200 |

Cloud smoke chạy lúc khoảng 02:10 ngày 04/11/2026 giờ Việt Nam, dùng tài khoản QA mới
`cloudqa_7d0fa95d`. Không dùng hoặc reset tài khoản thật. Database cloud khởi tạo độc lập,
chưa chuyển tài khoản/lịch sử từ LocalDB hoặc Java lên Cloud.

## Bảo toàn Java và dữ liệu cũ

Java vẫn phục vụ `https://gamehub-server-ktid.onrender.com`, HTTP 200.
Repo Java `khang3st-boop/gamehub-server` giữ commit `9b238d90f8d1fe6aeff956da5f98ca59f66563d2`.
Không ghi vào service `srv-dbjjuim7bikc73fmnd00`, Blueprint Java, môi trường Java hay database Neon.
Flutter Web hiện tại vẫn phục vụ qua Java; không đổi cấu hình hoặc triển khai lại frontend.

Đối chiếu LocalDB: cả **561 dòng gốc trong 29 bảng** giữ nguyên từng dòng/cột, bao gồm 49 tài khoản
và lịch sử bốn game đã có trước lần sửa LocalDB. Các dòng thêm sau đó được giữ nguyên, không reset database.

## Source và bằng chứng

Thay đổi chính: cấu hình provider/hosting trong `Configuration/`, `PostgresAppDbContext`, concurrency `xmin`,
nhận diện lỗi unique của cả hai provider, migration/snapshot PostgreSQL riêng, `Program.cs`, health,
seeder, bộ test hai provider, `Dockerfile`, `.dockerignore`, `render.yaml`, workflow thủ công và CLI `tools/GameHub.Smoke`.

Hướng dẫn deploy/cập nhật/Flutter: [Render_Deployment.md](Render_Deployment.md).
Test report trong `TestResults/sqlserver-cloud.trx` và `TestResults/postgres-cloud.trx` (không commit dữ liệu test).
Bằng chứng cục bộ:

`C:\Users\MY PC\Source\GameHubCloudQA-20261104-014218`

Thư mục này có TRX, báo cáo smoke local/cloud, secret scan, bản script SQL đã review, metadata Render,
kiểm tra độc lập máy cá nhân và tình trạng Java. Các file `.private.json`/password chỉ lưu cục bộ ngoài Git.
PostgreSQL portable QA đã dừng, dữ liệu kiểm thử vẫn giữ trên đĩa. Không cài Docker hoặc dịch vụ PostgreSQL hệ thống.
