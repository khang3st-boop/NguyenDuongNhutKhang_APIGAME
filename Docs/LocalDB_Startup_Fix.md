# Bàn giao sửa lỗi F5 / SQL Server LocalDB — 04/11/2026

## Nguyên nhân đã xác minh

Instance `(localdb)\MSSQLLocalDB` (SQL Server `17.0.4025.3`) đang chạy nhưng ban đầu
`sys.databases` chỉ có bốn database hệ thống, **không có** `NguyenDuongNhutKhang_APIGAME_Dev`.
Hai file của database vẫn tồn tại và không bị tiến trình khác giữ mở:

- `C:\Users\MY PC\NguyenDuongNhutKhang_APIGAME_Dev.mdf` — 75.497.472 byte.
- `C:\Users\MY PC\NguyenDuongNhutKhang_APIGAME_Dev_log.ldf` — 8.388.608 byte.

`DBCC CHECKPRIMARYFILE` xác nhận MDF mang đúng tên database, version 998, và tham chiếu đúng LDF trên.
SQL error log ghi lỗi đăng nhập 18456/state 38 vì không mở được database, sau đó lỗi 5170
khi EF chạy `CREATE DATABASE` và đụng file đã tồn tại. Đây là **file database chưa được đăng ký/attach
trong instance hiện tại**. Connection string không sai đường dẫn, không có `AttachDbFilename`,
không có database tên khác đang chiếm hai file trong instance. Không có đủ chứng cứ để kết luận
thao tác nào trước đây đã làm mất đăng ký database.

## Cấu hình đã kiểm tra

| Nguồn | Kết quả |
|---|---|
| `appsettings.json` | `ConnectionStrings:Default=null`; migration mặc định tắt |
| `appsettings.Development.json` | LocalDB, tên database đúng, Windows Integrated Security, không mật khẩu |
| User-secrets ID `02730a17-5dba-4e68-a481-15bca255804a` | Ban đầu chưa có file; không có connection string ghi đè |
| Biến môi trường Process/User/Machine | Không có biến liên quan ConnectionStrings/Database/SQL/JWT/ASPNETCORE/DOTNET ghi đè tại thời điểm kiểm tra |
| `Properties/launchSettings.json` | Các profile đặt `Development`; profile `http` dùng cổng 5292, mở `swagger`; không ghi đè connection string |
| Cấu hình JSON/XML/config trong `.vs` | Không tìm thấy connection string/AttachDbFilename ghi đè |
| Thực thi F5 | Debugger chạy đúng EXE của project; health kiểm tra LocalDB thật và trả `database=UP` |

Connection string Development sau sửa (giữ nguyên vì đã đúng, không có bí mật):

```text
Server=(localdb)\MSSQLLocalDB;Database=NguyenDuongNhutKhang_APIGAME_Dev;Trusted_Connection=True;TrustServerCertificate=True
```

Development bổ sung `Database:RequireExisting=true`, giữ `Database:MigrateOnStartup=true`.
Đã tạo khóa JWT ngẫu nhiên ổn định 64 byte trong **user-secrets ngoài Git** (`Jwt:Key=[REDACTED]`),
không ghi khóa vào source, báo cáo, hoặc log. F5 tải khóa này sau khi khởi động lại.

## Thao tác bảo vệ và khôi phục

Thư mục sao lưu riêng, ngoài repository:

`C:\Users\MY PC\Source\LocalDBBackups\APIGAME-20261104-011827`

1. Mở cả hai file gốc ở chế độ đọc độc quyền, sao chép và xác nhận SHA-256 bản sao khớp file gốc.
   Chi tiết trong `files-manifest.json`. Không xóa, đổi tên hoặc di chuyển file gốc.
2. Dừng phiên debug đang lỗi. Sau khi xác nhận database chưa được đăng ký, attach đúng cả MDF và LDF:

   ```sql
   CREATE DATABASE [NguyenDuongNhutKhang_APIGAME_Dev]
   ON (FILENAME=N'C:\Users\MY PC\NguyenDuongNhutKhang_APIGAME_Dev.mdf'),
      (FILENAME=N'C:\Users\MY PC\NguyenDuongNhutKhang_APIGAME_Dev_log.ldf')
   FOR ATTACH;
   ```

   Đây là đăng ký lại các file chứa dữ liệu hiện có, không cấp database rỗng.
   Thực hiện một lần sau kiểm tra và sao lưu, theo [tài liệu attach của Microsoft](https://learn.microsoft.com/en-us/sql/relational-databases/databases/attach-a-database?view=sql-server-ver17).
   Không thêm câu lệnh attach này vào quá trình khởi động ứng dụng.
3. Database chuyển `ONLINE`; `DBCC CHECKDB ... WITH NO_INFOMSGS, ALL_ERRORMSGS` hoàn tất, không lỗi.
4. Tạo thêm `NguyenDuongNhutKhang_APIGAME_Dev.bak` bằng `BACKUP DATABASE ... WITH COPY_ONLY, CHECKSUM`;
   `RESTORE VERIFYONLY ... WITH CHECKSUM` xác nhận backup hợp lệ (`sql-backup-verified.log`).
5. Trước khi chạy API, chụp dữ liệu và khóa chính của cả 29 bảng để đối chiếu từng dòng/cột sau kiểm tra.
   Các snapshot có dữ liệu riêng tư, chỉ lưu cục bộ trong thư mục backup, không đưa vào Git.

## File source thay đổi

| File | Thay đổi |
|---|---|
| `NguyenDuongNhutKhang_APIGAME/appsettings.Development.json` | Bật `RequireExisting`; giữ nguyên connection string |
| `NguyenDuongNhutKhang_APIGAME/Data/DbSeeder.cs` | Kiểm tra mở đúng database trước migrate; khóa khởi tạo trong tiến trình; kiểm tra kết quả tạo/gán role; log server/database/mã lỗi SQL và hướng xử lý, kể cả lỗi SQL bị EF bọc; dừng khi lỗi |
| `NguyenDuongNhutKhang_APIGAME/Program.cs` | Một điểm gọi `InitializeAsync` chung cho đường chạy Web và lệnh quản trị |
| `NguyenDuongNhutKhang_APIGAME.Tests/Infrastructure/ApiFactory.cs` | Database test riêng tên ngẫu nhiên; cho phép tạo lần đầu; bỏ `EnsureDeletedAsync`, giữ database test sau khi chạy |
| `NguyenDuongNhutKhang_APIGAME.Tests/Integration/DatabaseStartupTests.cs` | Hai test mới: khởi tạo lặp/đồng thời bảo toàn dữ liệu; database thiếu phải dừng trước tạo và log không lộ bí mật |
| `README.md` | Cập nhật quy trình F5 với database hiện có và thiết lập `RequireExisting` |
| `Docs/LocalDB_Startup_Fix.md` | Báo cáo này |

EF tiếp tục dùng `MigrateAsync` và `__EFMigrationsHistory` để áp dụng migration còn thiếu,
phù hợp [cơ chế migration của EF Core](https://learn.microsoft.com/en-us/ef/core/managing-schemas/migrations/applying).
Hai migration đã có vẫn giữ nguyên, không chỉnh file migration, không chạy lại `InitialCreate`.
Các migration mới về sau vẫn cần review nội dung `Up()` vì migration có thể chứa thao tác phá hủy.
Không dùng cờ “đã seed” toàn cục để bỏ qua kiểm tra; mỗi lần khởi động vẫn kiểm tra kết nối, migration và role.
Tài khoản đã tồn tại không bị thay mật khẩu/hồ sơ/token version bởi seed.

## Kết quả xác minh

| Kiểm tra | Kết quả |
|---|---|
| Build Debug | Thành công, 0 warning, 0 error |
| Build Release | Thành công, 0 warning, 0 error |
| Test Debug trên LocalDB thật | **69/69 passed**, không skip; gồm 67 ca hiện có trong checkout và 2 ca mới |
| F5 trong Visual Studio, profile `http` | Khởi động thành công nhiều lần sau Stop Debugging; đã xác nhận các PID khác nhau |
| `http://localhost:5292/swagger` | Mở được trong Chrome từ F5, HTTP 200 |
| `/openapi/v1.json` | HTTP 200, 109 đường dẫn |
| `/api/v1/health` | `status=UP`, `database=UP` |
| Đăng ký / đăng nhập thật | HTTP 201 / 200; dùng tài khoản QA mới, không tác động tài khoản cũ |
| JWT | Token hợp lệ: 200; thiếu token/sửa chữ ký: 401; token cấp trước restart vẫn trả 200 sau F5 lại |
| Ghi/đọc game | Mỗi Rubik/Sudoku/Puzzle/Caro ghi 201, đọc lại có đúng result ID; kiểm tra trực tiếp SQL có đủ 4 dòng mới |
| Chống trùng | Gửi lại cùng clientId trả 200/duplicate=true, không nhân đôi kết quả |
| Dữ liệu qua restart | Lịch sử bốn game vẫn có đúng result ID; đăng nhập lại trả 200 |
| Toàn vẹn dữ liệu cũ | 29 bảng, 561 dòng gốc: không mất dòng, không thay đổi cột nào |

Con số test thực tế cao hơn 62 nêu trong yêu cầu: bộ test hiện tại có 67 ca khi tính các dữ liệu Theory.
File TRX: `TestResults/localdb-startup-fix.trx`; bản sao, log build và JSON kết quả live nằm trong thư mục backup.

Trong phép thử đăng nhập cố ý sai mật khẩu, Visual Studio tạm dừng ở `AppException` nghiệp vụ
theo thiết lập user-unhandled của debugger. Đã Continue; không sửa thiết lập debugger hoặc logic xác thực.
Ca sai mật khẩu được bộ integration test kiểm tra và đã pass.

## Bảo toàn dữ liệu

| Dữ liệu | Trước | Sau kiểm tra | Đối chiếu dữ liệu cũ |
|---|---:|---:|---|
| Users | 49 | 50 | 49 tài khoản, password hash và token version cũ giữ nguyên |
| UserProfiles / UserRoles | 49 / 49 | 50 / 50 | Các dòng cũ giữ nguyên |
| GameResults | 11 | 15 | Toàn bộ 11 kết quả cũ giữ nguyên |
| Rubik / Sudoku / Puzzle / Caro | 4 / 5 / 1 / 1 | 5 / 6 / 2 / 2 | Mỗi game chỉ thêm một kết quả QA |
| Roles | 2 | 2 | Không tạo trùng |
| EF migrations | 2 | 2 | Giữ nguyên migration ID và version |

Tài khoản QA được giữ lại là `qa_fix_b4a29721`, tên hiển thị `QA LocalDB startup`;
chỉ tài khoản này có các dòng mới phát sinh từ phép thử live.
Không xóa database hoặc MDF/LDF, không chạy `EnsureDeleted` hay `dotnet ef database drop`,
không reset tài khoản, không kết nối/chỉnh dữ liệu Neon hoặc Render.

`preservation-report.json` và `Verify-Preservation.ps1` trong thư mục backup lưu kết quả và cách đối chiếu.
`live-session.private.json` chỉ lưu cục bộ thông tin tài khoản QA để kiểm tra tiếp; chứa bí mật, không đưa vào Git.
Database test được giữ lại có tên bắt đầu `NguyenDuongNhutKhang_APIGAME_Test_`; không dùng database Development để chạy suite.
