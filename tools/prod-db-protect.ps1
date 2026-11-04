<#
 Bảo vệ DB Production .NET (gamehub-dotnet-db) TRƯỚC khi áp Auth V2. CHỈ ĐỌC trên Production.
 Chạy từ thư mục gốc repo:   pwsh tools/prod-db-protect.ps1 -Step Preflight|Backup|Verify|Restore
 Chuỗi kết nối được nhập bằng Read-Host -AsSecureString: không hiện trên màn hình, không ghi file, không vào lịch sử lệnh.
 Production: chỉ psql với default_transaction_read_only=on và pg_dump (đọc). KHÔNG BAO GIỜ restore vào Production.
#>
param(
  [Parameter(Mandatory)][ValidateSet('Preflight', 'Backup', 'Verify', 'Restore')][string]$Step,
  [string]$Dump = "$PSScriptRoot/../TestResults/gamehub_prod_pre_authv2.dump"
)
$ErrorActionPreference = 'Stop'
if (-not $PSScriptRoot) { throw 'Phải chạy bằng -File tools\prod-db-protect.ps1 (không dán từng dòng): $PSScriptRoot rỗng làm sai đường dẫn backup.' }
function Test-Exit([string]$what) { if ($LASTEXITCODE -ne 0) { throw "$what thất bại (exit $LASTEXITCODE)." } }

function Read-PgUrl([string]$prompt) {
  $s = Read-Host $prompt -AsSecureString
  $b = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($s)
  try { $u = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($b) } finally { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($b) }
  $uri = [Uri]$u
  $ui = $uri.UserInfo.Split(':', 2)
  [pscustomobject]@{
    Host = $uri.Host; Port = $(if ($uri.Port -gt 0) { $uri.Port } else { 5432 })
    User = [Uri]::UnescapeDataString($ui[0]); Password = [Uri]::UnescapeDataString($ui[1])
    Db = $uri.AbsolutePath.Trim('/')
  }
}
function Use-Pg($c, [string]$db) {
  $env:PGHOST = $c.Host; $env:PGPORT = "$($c.Port)"; $env:PGUSER = $c.User
  $env:PGPASSWORD = $c.Password; $env:PGDATABASE = $db; $env:PGSSLMODE = 'require'
}
function Clear-Pg { 'PGHOST', 'PGPORT', 'PGUSER', 'PGPASSWORD', 'PGDATABASE', 'PGSSLMODE', 'PGOPTIONS' | ForEach-Object { Remove-Item "Env:$_" -ErrorAction SilentlyContinue } }
function Need($tool) { if (-not (Get-Command $tool -ErrorAction SilentlyContinue)) { throw "Thiếu '$tool'. Xem Docs/staging/PRODUCTION_BACKUP_GUIDE.md mục B (cài PostgreSQL Client 17)." } }

try {
  switch ($Step) {
    'Preflight' {
      Need psql
      $c = Read-PgUrl 'Dán External Database URL của gamehub-dotnet-db (ẩn)'
      Use-Pg $c $c.Db
      $env:PGOPTIONS = '-c default_transaction_read_only=on'   # mọi ghi đều bị từ chối
      Write-Host "Máy chủ: $($c.Host)  CSDL: $($c.Db)  (chế độ chỉ đọc)"
      psql -X -v ON_ERROR_STOP=1 -c 'SHOW server_version;' -c 'SHOW default_transaction_read_only;'
      Write-Host '--- preflight_AddAuthV2.sql (mong đợi: truy vấn 1 = 0 dòng, truy vấn 2 = 0 dòng, truy vấn 3 dừng ở InitialPostgreSql) ---'
      psql -X -v ON_ERROR_STOP=1 -f "$PSScriptRoot/../Docs/staging/preflight_AddAuthV2.sql"
    }
    'Backup' {
      Need pg_dump
      $c = Read-PgUrl 'Dán External Database URL của gamehub-dotnet-db (ẩn)'
      Use-Pg $c $c.Db
      if (Test-Path $Dump) { throw "Đã có $Dump. Đổi tên hoặc chuyển file cũ đi, script không ghi đè backup." }
      New-Item -ItemType Directory -Force (Split-Path $Dump) | Out-Null
      Write-Host "pg_dump $(pg_dump --version)"
      pg_dump --format=custom --no-owner --no-privileges --file $Dump
      if ($LASTEXITCODE -ne 0) { Remove-Item $Dump -ErrorAction SilentlyContinue; throw "pg_dump thất bại (exit $LASTEXITCODE); đã bỏ file dở dang." }
      $f = Get-Item $Dump
      Write-Host ("Đã tạo {0} ({1:N0} byte). Thư mục TestResults đã bị gitignore; KHÔNG commit file này." -f $f.FullName, $f.Length)
      Write-Host ("SHA-256: " + (Get-FileHash $Dump -Algorithm SHA256).Hash)
    }
    'Verify' {
      Need pg_restore
      pg_restore --list $Dump | Select-Object -First 15
      $n = (pg_restore --list $Dump | Measure-Object -Line).Lines
      Write-Host "File dump đọc được; $n mục trong danh mục."
      if (pg_restore --list $Dump | Select-String 'TABLE DATA public Users') { Write-Host 'Có dữ liệu bảng Users.' } else { throw 'Không thấy dữ liệu bảng Users trong dump.' }
    }
    'Restore' {
      Need pg_restore; Need psql
      if (-not (Test-Path $Dump)) { throw "Không thấy file dump $Dump." }
      Write-Host 'Khôi phục vào DB THỬ NGHIỆM do bạn chỉ định. Tuyệt đối không dùng Production.'
      $t = Read-PgUrl 'Dán URL DB THỬ (localhost hoặc Neon staging) (ẩn)'
      # Chặn nhầm sang Production: host Render, tên DB Production, hoặc host không phải Neon.
      if ($t.Host -like '*render.com*' -or $t.Host -like 'dpg-*' -or $t.Db -eq 'gamehub_dotnet' -or $t.User -eq 'gamehub_dotnet') { throw 'Từ chối: đây là Render/Production.' }
      $isLocal = $t.Host -in 'localhost', '127.0.0.1', '::1'
      if (-not $isLocal -and $t.Host -notlike '*.neon.tech') { throw "Từ chối: '$($t.Host)' không phải localhost hay host Neon (*.neon.tech)." }
      $typed = Read-Host "Gõ lại CHÍNH XÁC host đích để xác nhận ($($t.Host))"
      if ($typed -ne $t.Host) { throw 'Host xác nhận không khớp. Dừng, không làm gì.' }
      Use-Pg $t $t.Db
      $name = 'gh_restore_check'
      $exists = psql -X -t -A -c "SELECT 1 FROM pg_database WHERE datname = '$name';"
      if ($exists -match '1') { throw "Database '$name' đã tồn tại trên đích. Tự xoá thủ công nếu chắc chắn đó là bản thử cũ, rồi chạy lại." }
      psql -X -v ON_ERROR_STOP=1 -c "CREATE DATABASE $name;"
      Test-Exit 'CREATE DATABASE'
      Use-Pg $t $name
      pg_restore --no-owner --no-privileges --exit-on-error --dbname $name $Dump
      Test-Exit 'pg_restore'
      psql -X -c 'SELECT COUNT(*) AS users FROM "Users";' -c 'SELECT "MigrationId" FROM "__EFMigrationsHistory" ORDER BY 1;'
      Write-Host "Đã khôi phục thử vào '$name'. So số Users với Production, rồi xoá: DROP DATABASE $name WITH (FORCE);"
    }
  }
} finally { Clear-Pg }
