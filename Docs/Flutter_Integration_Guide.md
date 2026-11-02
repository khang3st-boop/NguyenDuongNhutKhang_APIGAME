# Hướng dẫn chạy Flutter với backend .NET (môi trường Development)

Chỉ dùng cho phát triển. Bản build mặc định của app vẫn trỏ backend Java trên Render + STOMP — không đổi gì ở Production
(URL, Neon, Java, người dùng, kết quả) cho tới khi có phê duyệt chuyển đổi.

## 1. Visual Studio — chạy API

1. Mở `NguyenDuongNhutKhang_APIGAME.slnx`, chọn profile **http** → F5. Server: `http://localhost:5292`, Swagger: `/swagger`.
2. Lần đầu: JWT key Development nằm trong user-secrets (`dotnet user-secrets set "Jwt:Key" "<chuỗi ngẫu nhiên ≥ 32 byte>"`
   trong thư mục project). Database LocalDB `NguyenDuongNhutKhang_APIGAME_Dev` tự migrate khi khởi động.
3. Xem dữ liệu: View → SQL Server Object Explorer → `(localdb)\MSSQLLocalDB` → `NguyenDuongNhutKhang_APIGAME_Dev`
   → bảng `Users`, `GameResults`, `MatchRooms`, `MatchResults`, `DuelChallenges`, `DirectMessages`.
4. Thử nhanh bằng `NguyenDuongNhutKhang_APIGAME.http` (nút *Send request*).
5. Kiểm tra: `dotnet build -c Debug`, `dotnet build -c Release`, `dotnet test` (dừng server trước — exe đang chạy bị khoá).

## 2. Android Studio — chạy app Flutter trỏ vào .NET

1. Mở thư mục `nguyenduongnhutkhang_4game`, chọn máy ảo Android.
2. Run → Edit Configurations → `main.dart` → **Additional run args**:
   `--dart-define-from-file=config/dev.dotnet.json`
   (`GAMEHUB_API_URL=http://10.0.2.2:5292` — 10.0.2.2 là máy tính nhìn từ máy ảo; `GAMEHUB_BACKEND=dotnet` → SignalR).
3. Nếu trước đó đã nhập URL server trong màn **Cài đặt** của app, giá trị đó được ưu tiên — xoá/đổi khi chuyển môi trường.
4. Chạy Web để test 2 người trên cùng máy:
   `flutter run -d web-server --web-port 5000 --dart-define=GAMEHUB_API_URL=http://localhost:5292 --dart-define=GAMEHUB_BACKEND=dotnet`
   rồi mở `http://localhost:5000` (origin này đã có trong `Cors:Origins` Development).
5. Điện thoại thật: chạy profile `http (LAN - dien thoai that)` rồi đặt `GAMEHUB_API_URL=http://<IP-LAN-máy-tính>:5292`
   (mở cổng 5292 trên Windows Firewall cho mạng Private).
6. Build Production như cũ, **không** truyền `config/dev.dotnet.json`: `flutter build apk`, `flutter build web`.

## 3. Kịch bản kiểm tra hai tài khoản

1. Tài khoản A trên máy ảo, B trên Web (hai tài khoản test riêng, không dùng tài khoản thật).
2. Kết bạn → B mời A (Thách đấu) → A nhận popup ngay → Chấp nhận → cả hai Sẵn sàng → đếm ngược 3 giây → vào trận.
3. Kết thúc trận → kiểm `MatchRooms.Status = FINISHED` và 2 dòng `MatchResults` (win/loss).
4. Từ chối lời mời; để lời mời hết hạn 60 giây; ngắt mạng máy ảo giữa trận (`adb shell svc wifi disable` +
   `svc data disable`, rồi `enable`) → app hiện "Đang nối lại…" rồi tiếp tục.
5. Tắt API → các game offline (Rubik, Sudoku, Xếp hình, Caro AI) vẫn chơi; bật lại → kết quả offline tự đồng bộ.

## 4. Sự cố thường gặp

| Hiện tượng | Cách xử lý |
|---|---|
| App báo "Mất kết nối" trên máy ảo | API chưa chạy hoặc dùng `localhost` thay vì `10.0.2.2` |
| Web lỗi CORS | thêm origin vào `Cors:Origins` trong `appsettings.Development.json` |
| `dotnet build/test` lỗi MSB3027 (file bị khoá) | dừng server đang chạy |
| Online không đẩy tức thời | thiếu `GAMEHUB_BACKEND=dotnet` → app đang dùng STOMP `/ws` (không có trên .NET) |
