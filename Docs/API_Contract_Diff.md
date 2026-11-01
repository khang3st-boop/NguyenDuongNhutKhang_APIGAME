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

Giới hạn: mới so **tên khoá cấp đầu** và giá trị enum chính (`status`, `source`, `endReason`); chưa kiểm từng kiểu
dữ liệu lồng sâu, chưa chạy ứng dụng Flutter thật với backend .NET.

## 2. Endpoint Flutter gọi nhưng .NET chưa có

| Flutter gọi | Tính năng | Ghi chú |
|---|---|---|
| `GET /challenges`, `GET /challenges/{id}`, `GET /challenges/open`, `POST /challenges/{id}/accept\|decline` | Thách đấu Rubik bất đồng bộ kiểu cũ | .NET thay bằng mã thách đấu `POST /rubik/challenges`, `GET /rubik/challenges/{code}` và lời mời realtime `/challenges/invites` |
| `GET /chat/conversations` (+ tin nhắn riêng) | Chat 1-1 ngoài trận | .NET chỉ có chat trong trận `/matches/{id}/messages` |
| `GET /nearby/players`, `PUT/DELETE /nearby/presence` | Người chơi gần đây | Không làm: yêu cầu cấm GPS → dùng vùng thô `/matchmaking/regions` |
| `GET/PUT /presence/me` | Trạng thái online | .NET tự ghi nhận hiện diện qua middleware + kết nối SignalR, chưa có endpoint đọc/ghi |

Endpoint .NET có thêm (Flutter hiện chưa dùng): `/{game}/sessions/*` (lưu ván dở), `/{game}/stats`, `/{game}/history`,
`/{game}/daily`, `/rubik/verify`, `/matches/{id}/report`, `/users/me/password`, `/admin/*`.

## 3. Realtime — khác biệt lớn nhất

| | Java (Render) — Flutter đang dùng | .NET (dự án này) |
|---|---|---|
| Giao thức | STOMP 1.2 trên WebSocket `/ws` | SignalR `/hubs/game` (JSON hub protocol) |
| Xác thực | header `Authorization` trong khung CONNECT | header Bearer hoặc `?access_token=` lúc negotiate |
| Nhận sự kiện | `/user/queue/events`, `/user/queue/errors`, `/topic/match.{id}` | `inviteReceived`, `inviteUpdated`, `matchState`, `chatMessage` |
| Gửi | `/app/match.ready`, `/app/match.progress`, `/app/match.assist` | REST `/matches/{id}/ready|progress|assist` (+ hub `SendChat`, `Ping`) |

**Hệ quả:** Flutter hiện tại kết nối `.NET` sẽ dùng được REST, nhưng kênh realtime STOMP không mở được
(trận online vẫn cập nhật khi app gọi lại `GET /matches/{id}`, chỉ là không đẩy tức thời).
Theo yêu cầu "không thay đổi giao thức realtime đang chạy trên Render nếu chưa có kế hoạch tương thích",
dự án này **không** sửa Flutter hay Java. Kế hoạch tương thích đề xuất (chưa làm, cần duyệt):

1. Thêm lớp trừu tượng `RealtimeTransport` trong Flutter với 2 cài đặt `StompTransport` (hiện có) và `SignalRTransport`
   (gói `signalr_netcore`), chọn theo `--dart-define=GAMEHUB_REALTIME=stomp|signalr`, mặc định `stomp`.
2. Ánh xạ sự kiện: `matchState` ↔ khung `/topic/match.{id}` (cùng DTO `OnlineMatch`), `inviteReceived/inviteUpdated` ↔ `/user/queue/events`.
3. Chỉ bật `signalr` cho bản Dev trỏ vào .NET; bản Prod giữ STOMP → Render không bị ảnh hưởng.

## 4. Khác biệt nghiệp vụ so với backend Java

- Thử thách hằng ngày `.NET` trả seed/scramble tất định theo ngày; ngày tương lai → `400 FUTURE_DATE`.
- Không có giải đấu 4 người cho Caro (`bracket` luôn null); Caro chỉ 2 người, Rubik/Sudoku/Puzzle 2 hoặc 4 người.
- Điểm online đơn giản: `max(100, 1200 + 16·(thắng − thua))`, chỉ tính trận ghép ngẫu nhiên/lời mời 2 người
  (phòng tự tạo bằng mã và trận 4 người `rated=false`).
- Kết quả online lưu ở `MatchResults`, không trộn vào lịch sử offline `GameResults`.
- Tài khoản/kết quả trên Neon (Java) **không** có trong database .NET — đây là database phát triển riêng,
  không có bước di chuyển dữ liệu nào chạm vào Neon.

## 5. Cấu hình Dev/Prod cho Flutter (không đổi URL production)

Flutter đã đọc URL server theo thứ tự: giá trị người dùng lưu trong **Cài đặt** → `--dart-define=GAMEHUB_API_URL` → mặc định.
Không cần sửa code. Đã thêm file cấu hình Dev (không chứa bí mật):
`nguyenduongnhutkhang_4game/config/dev.dotnet.json` → `{"GAMEHUB_API_URL": "http://10.0.2.2:5292"}`.

- **Dev (máy ảo Android → .NET trên máy tính):**
  `flutter run --dart-define-from-file=config/dev.dotnet.json`
  (Android Studio: Run → Edit Configurations → Additional run args).
  HTTP thường được phép vì app đã có `network_security_config.xml` với `cleartextTrafficPermitted="true"`.
- **Điện thoại thật:** chạy profile `http (LAN - dien thoai that)`, nhập `http://<IP-LAN-máy-tính>:5292` trong Cài đặt app.
- **Prod:** build như hiện tại (URL Render) — không truyền file dev, không đổi gì.
- Nếu đã từng nhập URL trong màn Cài đặt, giá trị đó được ưu tiên hơn `--dart-define` — xoá/đổi trong Cài đặt khi chuyển môi trường.
