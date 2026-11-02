# So sánh hợp đồng API: Flutter / Java (Render) ↔ .NET (dự án này)

Ngày kiểm tra: 2026-11-02. Nguồn Flutter: `C:\Users\MY PC\StudioProjects\nguyenduongnhutkhang_4game\lib`
(`data/remote/*.dart`, `services/online/*.dart`). Backend .NET đang chạy cục bộ `http://localhost:5292`.

## 1. Cách đã kiểm tra

1. Trích toàn bộ đường dẫn `api.get/post/put/patch/delete(...)` trong Flutter → so với `/openapi/v1.json` của .NET.
2. Trích các khoá JSON mà Flutter đọc trong `fromJson` (`api_models.dart`, `online_models.dart`) → gọi API .NET thật
   (đăng ký, kết bạn, mời, vào trận, chat, hàng chờ...) và so khoá trong response thật.

Kết quả bước 2 (khoá cấp đầu của mỗi DTO):

| DTO Flutter | Kết quả |
|---|---|
| AuthResponse, UserDto, UserSummaryDto | khớp (.NET có thêm `tokenType`, Flutter bỏ qua) |
| FriendDto, FriendRequests, FriendRequestDto | khớp |
| InviteDto, OnlineMatch, MatchPlayer, RoomMessage | khớp |
| LobbyEntry, LobbyPlayer, RegionDto, QueueTicket | khớp |
| OnlineRankEntry, LeaderboardEntry | khớp |
| ChallengeDto, ChallengeEntryDto | **.NET không có endpoint** (xem mục 2) |
| ConversationDto, ChatMessageDto | **.NET không có endpoint** |
| NearbyPlayerDto | **cố ý không làm** (không dùng GPS) |
| BracketMatch (giải 4 người caro) | .NET luôn trả `bracket: null` |

Sau bước so khoá, app Flutter thật đã được chạy với backend .NET (mục 6) — không dùng mock.

## 2. Endpoint Flutter gọi — trạng thái trên .NET

| Flutter gọi | Tính năng | Trạng thái .NET |
|---|---|---|
| `GET /challenges`, `GET /challenges/open`, `POST /challenges`, `GET /challenges/{id}`, `POST /challenges/{id}/accept\|decline\|submit` | Thách đấu Rubik bất đồng bộ kiểu cũ | **Đã thêm** (`CompatControllers.cs`, bảng `DuelChallenges`) |
| `GET /chat/conversations`, `GET\|POST /chat/conversations/{userId}/messages` | Chat 1-1 ngoài trận | **Đã thêm** (bảng `DirectMessages`, đẩy realtime `chat.message`) |
| `GET/PUT /presence/me` | Trạng thái online | **Đã thêm** (đọc/ghi qua `PresenceTracker`) |
| `POST /reports` | Báo cáo người chơi | **Đã thêm** |
| `GET /nearby/players`, `PUT/DELETE /nearby/presence` | Người chơi gần đây | **Chưa có** — cố ý không dùng GPS; app hiện lỗi nhẹ ở mục "Gần đây", phần khác không ảnh hưởng |

Endpoint .NET có thêm (Flutter hiện chưa dùng): `/{game}/sessions/*` (lưu ván dở), `/{game}/stats`, `/{game}/history`,
`/{game}/daily`, `/rubik/verify`, `/matches/{id}/report`, `/users/me/password`, `/admin/*`.

## 3. Realtime — STOMP (Java) và SignalR (.NET) qua một interface chung

| | Java (Render) | .NET (dự án này) |
|---|---|---|
| Giao thức | STOMP 1.2 trên WebSocket `/ws` | SignalR `/hubs/game` (JSON hub protocol) |
| Xác thực | header `Authorization` trong khung CONNECT | `?access_token=` lúc negotiate/WebSocket |
| Nhận sự kiện | `/user/queue/events`, `/topic/match.{id}` | một method `event`, khung `{type, data, matchId, ts}` |
| Gửi | `/app/match.ready`, `/app/match.progress`, `/app/match.assist` | hub `Ready`, `Progress`, `Assist`, `SendChat` |

Tên sự kiện .NET dùng **đúng từ vựng** app đang đọc từ Java: `invite.received`, `invite.accepted|declined|cancelled|expired`,
`match.state`, `match.ended`, `match.left`, `match.connection`, `match.chat`, `matchmaking.found`, `chat.message`,
`presence`, `presence.self`, `friend.*`, `lobby.updated` → logic xử lý sự kiện trong app không đổi, chỉ đổi lớp vận chuyển.

Flutter (`lib/services/online/realtime_adapter.dart`): interface `RealtimeAdapter` với `JavaRealtimeAdapter` (STOMP, giữ nguyên
hành vi cũ) và `DotNetRealtimeAdapter` (client SignalR tự viết trong `signalr.dart`, chỉ phụ thuộc `web_socket_channel` đã có).
Chọn bằng `--dart-define=GAMEHUB_BACKEND=java|dotnet`, **mặc định `java`** → bản build Production không đổi.
Nối lại tự động (backoff), khi nối lại app đồng bộ lại trạng thái qua REST.

Hai lỗi server phát hiện khi chạy app thật và đã sửa:
- Hết đếm ngược 3 giây server không đẩy `match.state` PLAYING → app đứng ở "Chờ máy chủ bắt đầu…". Nay nhịp dọn dẹp
  (2 giây) đẩy PLAYING đúng một lần cho mỗi trận (test `Countdown_end_pushes_playing_and_decline_only_notifies_inviter`).
- `invite.declined` gửi cả hai bên → người từ chối thấy thông báo "X đã từ chối" sai góc nhìn. Nay chỉ gửi người mời.

## 4. Khác biệt nghiệp vụ so với backend Java

- Thử thách hằng ngày `.NET` trả seed/scramble tất định theo ngày; ngày tương lai → `400 FUTURE_DATE`.
- Không có giải đấu 4 người cho Caro (`bracket` luôn null); Caro chỉ 2 người, Rubik/Sudoku/Puzzle 2 hoặc 4 người.
- Điểm online đơn giản: `max(100, 1200 + 16·(thắng − thua))`, chỉ tính trận ghép ngẫu nhiên/lời mời 2 người
  (phòng tự tạo bằng mã và trận 4 người `rated=false`).
- Kết quả online lưu ở `MatchResults`, không trộn vào lịch sử offline `GameResults`.
- **Điểm**: server tính lại điểm theo công thức riêng (vd Rubik `10000 − 5·giây − 10·nước`), app hiển thị điểm theo công thức
  của app → cùng ván có thể khác số (vd Sudoku: app 958, server 9916). Chưa thống nhất — cần quyết định công thức chuẩn.
- Tài khoản/kết quả trên Neon (Java) **không** có trong database .NET — đây là database phát triển riêng,
  không có bước di chuyển dữ liệu nào chạm vào Neon.

## 5. Cấu hình Dev/Prod cho Flutter (không đổi URL production)

Flutter đã đọc URL server theo thứ tự: giá trị người dùng lưu trong **Cài đặt** → `--dart-define=GAMEHUB_API_URL` → mặc định.
Không cần sửa code. Đã thêm file cấu hình Dev (không chứa bí mật):
`nguyenduongnhutkhang_4game/config/dev.dotnet.json` → `{"GAMEHUB_API_URL": "http://10.0.2.2:5292", "GAMEHUB_BACKEND": "dotnet"}`.

- **Dev (máy ảo Android → .NET trên máy tính):**
  `flutter run --dart-define-from-file=config/dev.dotnet.json`
  (Android Studio: Run → Edit Configurations → Additional run args).
  HTTP thường được phép vì app đã có `network_security_config.xml` với `cleartextTrafficPermitted="true"`.
- **Điện thoại thật:** chạy profile `http (LAN - dien thoai that)`, nhập `http://<IP-LAN-máy-tính>:5292` trong Cài đặt app.
- **Prod:** build như hiện tại (URL Render) — không truyền file dev, không đổi gì.
- Nếu đã từng nhập URL trong màn Cài đặt, giá trị đó được ưu tiên hơn `--dart-define` — xoá/đổi trong Cài đặt khi chuyển môi trường.

## 6. Kết quả chạy Flutter thật với .NET (2026-11-02)

Máy ảo Android Pixel_5 (`--dart-define-from-file=config/dev.dotnet.json`) + Flutter Web
(`flutter run -d web-server --web-port 5000 --dart-define=GAMEHUB_API_URL=http://localhost:5292 --dart-define=GAMEHUB_BACKEND=dotnet`),
hai tài khoản test riêng trong LocalDB.

| Kịch bản | Kết quả |
|---|---|
| Đăng ký, đăng nhập, JWT, hồ sơ, đăng xuất, danh sách game | đạt |
| Kết quả Rubik/Sudoku → `GameResults`, lịch sử, bảng xếp hạng | đạt (kiểm bằng `sqlcmd`) |
| Web mời → máy ảo nhận popup tức thời → chấp nhận → sẵn sàng → đếm ngược → chơi | đạt (sau khi sửa lỗi đẩy PLAYING) |
| Kết thúc trận → `MatchResults` thắng/thua, bên kia nhận `match.ended` tức thời | đạt |
| Từ chối lời mời | đạt |
| Lời mời hết hạn 60 giây → popup đóng, thông báo "đã hết hạn" | đạt |
| Ngắt mạng máy ảo 10 giây giữa trận → "Đang nối lại…" → nối lại, trận tiếp tục, kết quả lưu | đạt |
| Tắt server .NET → Rubik, Sudoku, Xếp hình, Caro AI vẫn chơi; khởi động app nguội không treo | đạt |
| Bật lại server → ván Sudoku chơi lúc offline tự đồng bộ vào `GameResults` | đạt |

Chưa kiểm: điện thoại thật, iOS, nhiều instance server, "Người chơi gần đây" (không có endpoint).
