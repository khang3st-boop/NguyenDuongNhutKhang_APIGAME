# Game Hub — Auth V2 API Contract (`gamehub-auth-v2`)

Backend: ASP.NET Core .NET 10 (`NguyenDuongNhutKhang_APIGAME`). Base path: `/api/v1/auth`.
Auth V2 **không thay** đăng nhập cũ — `POST /auth/register`, `/auth/login`, `/auth/refresh`, `/auth/logout` vẫn hoạt động y nguyên.
Auth V2 chỉ thêm: đăng ký bằng email + OTP, quên mật khẩu, đăng nhập Google.

> Trạng thái: code + test hoàn tất. **Chưa bật trên Production**: cần cấu hình email provider, Google client ID, OTP key (xem mục 9). Cho tới lúc đó
> `GET /auth/capabilities` trả `false` và các endpoint V2 trả `503 AUTH_NOT_READY` — Flutter phải ẩn/khóa nút tương ứng.

## 1. Quy ước chung

- JSON camelCase. Mọi request V2 **từ chối trường lạ** (HTTP 400) — ví dụ không thể gửi `role`, `userId`, `email` cho `/auth/google`.
- Lỗi: `{ "code": "...", "message": "...", "fieldErrors": [{"field","message"}], "timestamp": "...", "path": "..." }`.
- Mọi endpoint V2 chịu rate limit theo IP (policy `auth`, mặc định 10 req/phút/IP) → `429 RATE_LIMITED`.
- Email được chuẩn hóa chữ thường. `maskedEmail` dạng `k***g@example.com`; **OTP và email đầy đủ không bao giờ có trong response**.
- Session sau đăng nhập/đăng ký/Google: cùng `AuthResponse` với `/auth/login` (`accessToken`, `refreshToken`, `expiresIn…`, `user{ id, … , roles }`).

## 2. Chính sách OTP

| Mục | Giá trị |
|---|---|
| Độ dài | 6 chữ số (CSPRNG, `RandomNumberGenerator`) |
| Hiệu lực | **5 phút** |
| Gửi lại | tối thiểu **60 giây** giữa hai lần (`RESEND_TOO_SOON` + header `Retry-After`) |
| Dùng một lần | có (tiêu thụ nguyên tử, chạy song song chỉ một request thắng) |
| Nhập sai | tối đa **5 lần** / challenge → `OTP_ATTEMPTS_EXCEEDED` (429), phải gửi lại mã mới |
| Gửi lại | tạo **mã mới + challengeId mới**, vô hiệu mã/challenge cũ |
| Giới hạn gửi | 5 / email / giờ, 5 / tài khoản / giờ, 20 / IP / giờ (`RATE_LIMITED` + `Retry-After`) |
| Lưu trữ | HMAC-SHA256 có khóa (`Auth__OtpKey`), gắn với challengeId + mục đích + email. Không lưu/log mã thô |

## 3. Endpoint

### 3.1 `GET /auth/capabilities` (ẩn danh)
```json
{ "contract": "gamehub-auth-v2", "emailRegistration": true, "passwordReset": true, "googleIdToken": true }
```
Các cờ phản ánh **cấu hình thật**: `emailRegistration`/`passwordReset` = có `Auth__OtpKey` (≥ 32 byte) **và** email provider đã cấu hình;
`googleIdToken` = có ít nhất một `Auth__Google__ClientIds__n`.

### 3.2 `POST /auth/email/register` → 202
Request: `{ "email", "username", "displayName", "password" }` (username 3–20 ký tự `[a-zA-Z0-9_.]`; mật khẩu 8–72 ký tự có chữ và số).
Response `OtpChallenge`:
```json
{ "challengeId": "guid", "purpose": "register", "maskedEmail": "k***g@example.com",
  "codeLength": 6, "expiresAt": "2026-11-04T10:05:00Z", "resendAvailableAt": "2026-11-04T10:01:00Z", "remainingAttempts": 5 }
```
**Chưa tạo tài khoản.** Mật khẩu được hash ngay và giữ trong challenge; tài khoản chỉ sinh ra khi nhập đúng OTP.
Lỗi: `409 USERNAME_TAKEN`, `409 EMAIL_TAKEN`, `400 INVALID_EMAIL|WEAK_PASSWORD`, `429 RATE_LIMITED`,
`502 EMAIL_PROVIDER_REJECTED` (nhà cung cấp từ chối địa chỉ), `503 EMAIL_SEND_FAILED` (timeout/lỗi tạm), `503 AUTH_NOT_READY`.
Khi gửi thất bại challenge bị xóa — không tính vào hạn mức, người dùng bấm gửi lại ngay được.

### 3.3 `POST /auth/email/verify` → 200 `AuthResponse`
Request: `{ "challengeId", "code" }` (`code` = đúng 6 chữ số). Tạo tài khoản (chỉ quyền `User`, `emailConfirmed = true`) và cấp JWT + refresh token.
Lỗi: `400 OTP_INVALID` (`fieldErrors[{field:"remainingAttempts",message:"4"}]`), `400 OTP_EXPIRED`, `429 OTP_ATTEMPTS_EXCEEDED`,
`409 USERNAME_TAKEN|EMAIL_TAKEN` (mã **chưa** bị tiêu thụ).

### 3.4 `POST /auth/otp/resend` → 202 `OtpChallenge`
Request: `{ "challengeId" }`. Dùng cho cả đăng ký và quên mật khẩu. Trả challenge **mới** (`challengeId` mới) — Flutter phải thay challengeId cũ.
Lỗi: `429 RESEND_TOO_SOON` (+ `Retry-After` giây), `429 RATE_LIMITED`, `400 OTP_INVALID` (challenge không còn hiệu lực).

### 3.5 `POST /auth/password/forgot` → 202 `OtpChallenge`
Request: `{ "email" }`. **Luôn 202** với cùng cấu trúc dù email có tồn tại hay không (chống dò tài khoản): email lạ nhận challenge giả không bao giờ xác minh được
và không có thư nào được gửi. Thư thật gửi nền để thời gian phản hồi không lộ thông tin. Chỉ tài khoản có email đã xác minh nhận được thư.

### 3.6 `POST /auth/password/verify-otp` → 200
Request: `{ "challengeId", "code" }`. Response: `{ "resetToken", "expiresAt" }` (hiệu lực **10 phút**, dùng một lần, lưu dạng HMAC).
**Không cấp phiên đăng nhập.** Lỗi như 3.3.

### 3.7 `POST /auth/password/reset` → 204
Request: `{ "resetToken", "newPassword" }`. Hiệu ứng: đổi mật khẩu, đổi security stamp, mở khóa/reset đếm sai, **thu hồi mọi access/refresh token cũ**,
vô hiệu mọi challenge còn lại, gửi thư thông báo "mật khẩu đã được thay đổi". **Không tự đăng nhập** — Flutter chuyển về màn đăng nhập.
Lỗi: `400 RESET_TOKEN_INVALID` (sai/hết hạn/đã dùng), `400 WEAK_PASSWORD` (token **không** bị đốt, nhập lại được).

### 3.8 `POST /auth/google` → 200 `AuthResponse`
Request: `{ "idToken": "<Google ID token>" }` — chỉ đúng một trường.
Backend tự xác minh: chữ ký RS256 bằng JWKS của Google (cache theo `Cache-Control`), `iss` ∈ {`https://accounts.google.com`, `accounts.google.com`},
`aud` ∈ `Auth__Google__ClientIds`, `exp`/`nbf` (lệch ≤ 1 phút), và **bắt buộc `email_verified = true`**. Định danh ổn định là `sub` (bảng `UserLogins`, provider `Google`).
- `sub` đã liên kết → đăng nhập tài khoản đó (đổi email bên Google không đổi tài khoản).
- `sub` mới và email chưa dùng → tạo tài khoản mới (quyền `User`, tên `g_xxxxxxxxxx`, không mật khẩu).
- `sub` mới nhưng **email đã thuộc tài khoản Game Hub** → `409 ACCOUNT_EXISTS_LINK_REQUIRED`. **Không tự nối** chỉ vì trùng email.
Lỗi: `401 GOOGLE_TOKEN_INVALID`, `401 GOOGLE_EMAIL_NOT_VERIFIED`, `503 AUTH_NOT_READY` (chưa có client ID hoặc không tải được khóa Google).

### 3.9 `POST /auth/google/link` → 204 (cần `Authorization: Bearer`)
Request: `{ "idToken" }`. Người dùng **đang đăng nhập** chứng minh quyền sở hữu tài khoản Google bằng ID token. Idempotent nếu đã liên kết đúng tài khoản.
Lỗi: `401` (chưa đăng nhập), `409 GOOGLE_ALREADY_LINKED` (Google này thuộc người khác, hoặc tài khoản đã liên kết Google khác), `409 EMAIL_TAKEN`.
Tài khoản cũ chưa có email sẽ nhận email Google đã xác minh khi liên kết.

## 4. Bảng mã lỗi

| Code | HTTP | Ý nghĩa |
|---|---|---|
| `AUTH_NOT_READY` | 503 | Backend chưa cấu hình email/OTP key/Google |
| `OTP_INVALID` | 400 | Sai mã, hoặc challenge đã dùng/bị thay (`remainingAttempts` trong `fieldErrors`) |
| `OTP_EXPIRED` | 400 | Quá 5 phút |
| `OTP_ATTEMPTS_EXCEEDED` | 429 | Sai 5 lần; phải xin mã mới |
| `RESEND_TOO_SOON` | 429 | Chưa đủ 60 giây; xem `Retry-After` |
| `RATE_LIMITED` | 429 | Vượt hạn mức email/tài khoản/IP; xem `Retry-After` |
| `USERNAME_TAKEN` / `EMAIL_TAKEN` | 409 | Trùng |
| `INVALID_EMAIL` / `WEAK_PASSWORD` | 400 | Dữ liệu không hợp lệ |
| `RESET_TOKEN_INVALID` | 400 | Token đặt lại sai/hết hạn/đã dùng |
| `GOOGLE_TOKEN_INVALID` | 401 | Token Google sai chữ ký/issuer/audience/hết hạn |
| `GOOGLE_EMAIL_NOT_VERIFIED` | 401 | Google chưa xác minh email |
| `ACCOUNT_EXISTS_LINK_REQUIRED` | 409 | Email Google trùng tài khoản Game Hub hiện có |
| `GOOGLE_ALREADY_LINKED` | 409 | Google này đã gắn với tài khoản khác |
| `EMAIL_SEND_FAILED` | 503 | Lỗi tạm khi gửi thư (có thể thử lại) |
| `EMAIL_PROVIDER_REJECTED` | 502 | Nhà cung cấp email từ chối hẳn |

## 5. Luồng JWT
1. Mọi đường vào (login cũ, email/verify, google) đều trả cùng `AuthResponse`: access token JWT HS256 (claim `sv` = TokenVersion) + refresh token.
2. Access token hết hạn → `POST /auth/refresh {refreshToken}`; refresh token **xoay vòng**, dùng lại token cũ bị coi là tái sử dụng và thu hồi cả chuỗi.
3. Đổi mật khẩu (reset) tăng TokenVersion → mọi access token cũ lập tức `401`, mọi refresh token cũ bị thu hồi.
4. Quyền: backend luôn gán `User`. Không có trường nào trong V2 nhận role; quyền Admin chỉ qua cơ chế seed/quản trị hiện có.

## 6. Quy tắc liên kết tài khoản
- Khóa nhận diện Google là `sub`, không phải email.
- Không bao giờ tự liên kết theo email trùng. Muốn gắn Google vào tài khoản cũ: đăng nhập tài khoản cũ → `POST /auth/google/link`.
- Email là duy nhất (chỉ mục unique có điều kiện `NormalizedEmail IS NOT NULL`; tài khoản cũ không có email vẫn hợp lệ).

## 7. Yêu cầu bảo mật (đã triển khai)
OTP CSPRNG + HMAC có khóa; không log/trả OTP; so khớp thời gian không đổi; tăng đếm sai nguyên tử trước khi so khớp; tiêu thụ nguyên tử;
challenge giả chống dò email; không tin email/userId từ client; không có client secret trong Flutter (chỉ cần Web/Android client ID để lấy ID token);
log email nền không ghi người nhận/nội dung; thu hồi phiên khi đổi mật khẩu; migration chỉ thêm bảng `AuthChallenges` + chỉ mục unique email (không xóa/đổi dữ liệu).

## 8. Hướng dẫn tích hợp Flutter (cho Codex)
1. Khi mở màn đăng nhập gọi `GET /auth/capabilities`; **chỉ hiện/bật** nút Google, đăng ký email, quên mật khẩu khi cờ tương ứng `true`. Lỗi mạng/`false` → giữ đăng nhập username như cũ.
2. Đăng ký: `email/register` → lưu `challengeId` + `resendAvailableAt` → màn nhập 6 số (đếm ngược tới `expiresAt` và `resendAvailableAt`) → `email/verify` → lưu session như login thường.
3. Gửi lại: `otp/resend` rồi **thay challengeId** bằng giá trị mới; đang trong 60 giây thì disable nút (hoặc đọc `Retry-After`).
4. Quên mật khẩu: `password/forgot` (luôn thành công, hiển thị "Nếu email tồn tại, mã đã được gửi") → `password/verify-otp` → `password/reset` → về màn đăng nhập (không có token để lưu).
5. Google: dùng `google_sign_in` để lấy `idToken` (cấu hình `serverClientId` = Web client ID mà backend đã liệt kê); gửi `{idToken}` tới `/auth/google`. Không gửi email/id. `409 ACCOUNT_EXISTS_LINK_REQUIRED` → hướng dẫn đăng nhập cũ rồi liên kết trong Cài đặt (`/auth/google/link`).
6. Hiển thị lỗi theo `code` (bảng mục 4), không theo `message`. Không bao giờ log mã OTP / idToken / resetToken.
7. `docs/auth-v2/CONTRACT.md` và `lib/data/remote/auth_v2_api.dart` bên Flutter do Codex quản lý — đối chiếu với tài liệu này; endpoint khác tên so với phác thảo `/email/send-otp` ban đầu vì contract Flutter `gamehub-auth-v2` đã được giữ nguyên.

## 9. Cấu hình & triển khai (Render)

| Biến môi trường | Bắt buộc | Ghi chú |
|---|---|---|
| `Auth__OtpKey` | có | ≥ 32 byte ngẫu nhiên (`render.yaml` dùng `generateValue`). **Đổi khóa = mọi OTP đang chờ mất hiệu lực** |
| `Auth__Google__ClientIds__0` (`__1`…) | cho Google | OAuth client ID (Web + Android…) được chấp nhận làm `aud` |
| `Email__Provider` | có | `Resend` (khuyến nghị, HTTPS) hoặc `Smtp`. **Render gói free chặn cổng SMTP đi ra** |
| `Email__FromAddress` | có | Địa chỉ gửi đã xác minh domain (Resend) / tài khoản SMTP |
| `Email__FromName` | không | Mặc định `Game Hub` |
| `Email__ResendApiKey` | nếu Resend | Bí mật — nhập trên Dashboard |
| `Email__SmtpHost/Port/User/Password/StartTls` | nếu Smtp | Bí mật — nhập trên Dashboard |
| `Email__TimeoutSeconds` | không | Mặc định 15 |
| `Auth__MaxSendsPerEmailPerHour` / `Auth__MaxSendsPerIpPerHour` | không | 5 / 20 |

Checklist trước khi deploy (chưa làm — cần bạn duyệt):
1. Tạo Google OAuth Web client + (Android client với SHA-1) → điền `Auth__Google__ClientIds__0`.
2. Tạo tài khoản Resend, xác minh domain gửi → điền `Email__FromAddress`, `Email__ResendApiKey`.
3. Xác nhận `Cors__Origins__0` trỏ đúng origin Flutter Web; HTTPS do Render xử lý; `/health` đã là health check.
4. Migration `AddAuthV2PostgreSql` chạy tự động qua `Database__MigrateOnStartup` (chỉ thêm bảng/chỉ mục). **Trước khi chạy trên DB có dữ liệu**: kiểm tra không có hai tài khoản cùng email (chỉ mục unique sẽ báo lỗi nếu có) — `SELECT "NormalizedEmail", count(*) FROM "Users" WHERE "NormalizedEmail" IS NOT NULL GROUP BY 1 HAVING count(*)>1;`
5. Chạy `GAMEHUB_TEST_EMAIL_TO=<hộp thư của bạn>` cùng `Email__*` để chạy test gửi email thật (`RealEmailTests`).
6. Gọi `GET /api/v1/auth/capabilities` trên staging và chỉ bật feature flag V2 ở Flutter khi cả ba cờ `true` và đã thử đủ luồng thật.
