namespace NguyenDuongNhutKhang_APIGAME.Helpers;

public static class AppRoles
{
    public const string User = "User";
    public const string Admin = "Admin";
    public static readonly string[] All = [User, Admin];
}

/// <summary>Bốn game của Game Hub (cùng id với app Flutter).</summary>
public static class GameIds
{
    public const string Rubik = "rubik";
    public const string Sudoku = "sudoku";
    public const string Puzzle = "puzzle";
    public const string Caro = "caro";
    public static readonly string[] All = [Rubik, Sudoku, Puzzle, Caro];

    /// <summary>Game có thử thách hằng ngày.</summary>
    public static readonly string[] Daily = [Sudoku, Puzzle];

    public static bool IsValid(string? game) => game != null && All.Contains(game);
}

public static class Outcomes
{
    public const string Win = "win";
    public const string Loss = "loss";
    public const string Draw = "draw";
    public static readonly string[] All = [Win, Loss, Draw];
}

public static class SessionStatus
{
    public const string Active = "ACTIVE";
    public const string Finished = "FINISHED";
    public const string Abandoned = "ABANDONED";
}

public static class FriendStatus
{
    public const string Pending = "PENDING";
    public const string Accepted = "ACCEPTED";
}

/// <summary>Trạng thái thách đấu Rubik bất đồng bộ — đúng chuỗi app Flutter đang hiển thị.</summary>
public static class DuelStatus
{
    public const string Open = "OPEN";
    public const string Accepted = "ACCEPTED";
    public const string Completed = "COMPLETED";
    public const string Declined = "DECLINED";
    public const string Expired = "EXPIRED";
}

public static class InviteStatus
{
    public const string Pending = "PENDING";
    public const string Accepted = "ACCEPTED";
    public const string Declined = "DECLINED";
    public const string Cancelled = "CANCELLED";
    public const string Expired = "EXPIRED";
}

public static class MatchSource
{
    public const string Room = "ROOM";
    public const string Invite = "INVITE";
    public const string Queue = "QUEUE";
}

public static class MatchStatus
{
    /// <summary>Đang chờ đủ người / mọi người bấm Sẵn sàng.</summary>
    public const string Waiting = "WAITING_READY";
    public const string Playing = "PLAYING";
    public const string Finished = "FINISHED";
    public const string Cancelled = "CANCELLED";

    public static bool IsActive(string s) => s is Waiting or Playing;
}

public static class EndReasons
{
    public const string Solved = "SOLVED";
    public const string CaroWin = "CARO_WIN";
    public const string Draw = "DRAW";
    public const string Forfeit = "FORFEIT";
    public const string Timeout = "TIMEOUT";
    public const string Disqualified = "DISQUALIFIED";
    public const string ReadyTimeout = "READY_TIMEOUT";
    public const string Cancelled = "CANCELLED";
}

/// <summary>Chế độ chơi online hợp lệ cho từng game và giới hạn thời gian một trận.</summary>
public static class OnlineModes
{
    public static readonly Dictionary<string, string[]> ByGame = new()
    {
        [GameIds.Rubik] = ["3x3"],
        [GameIds.Sudoku] = ["easy", "medium", "hard"],
        [GameIds.Puzzle] = ["3x3", "4x4", "5x5", "6x6"],
        [GameIds.Caro] = ["15x15"],
    };

    public static bool IsValid(string? game, string? mode) =>
        game != null && mode != null && ByGame.TryGetValue(game, out var modes) && modes.Contains(mode);

    /// <summary>Caro chỉ chơi 2 người; các game giải đố chơi 2 hoặc 4 người.</summary>
    public static bool CapacityAllowed(string game, int capacity) => capacity == 2 || (capacity == 4 && game != GameIds.Caro);

    public static TimeSpan TimeLimit(string game, string mode) => game switch
    {
        GameIds.Sudoku => TimeSpan.FromMinutes(mode switch { "easy" => 15, "medium" => 20, _ => 30 }),
        GameIds.Caro => TimeSpan.FromMinutes(30),
        _ => TimeSpan.FromMinutes(10),
    };

    /// <summary>Ảnh có sẵn trong app (không bao giờ dùng ảnh cá nhân cho trận online).</summary>
    public static readonly string[] PuzzleArts = ["sunset", "ocean", "garden", "aurora", "city", "space", "cube", "caro"];
}

/// <summary>Khu vực thô cho ghép trận — người chơi tự chọn, không dùng GPS. Toạ độ chỉ là tâm vùng để vẽ bản đồ.</summary>
public static class Regions
{
    public record Region(string Code, string Name, double Lat, double Lon, string[] Neighbours);

    public static readonly Region[] All =
    [
        new("VN-N", "Miền Bắc", 21.03, 105.85, ["VN-C"]),
        new("VN-C", "Miền Trung", 16.05, 108.22, ["VN-N", "VN-S"]),
        new("VN-S", "Miền Nam", 10.78, 106.70, ["VN-C"]),
        new("ASIA", "Châu Á khác", 13.75, 100.50, ["VN-N", "VN-S"]),
        new("OTHER", "Khu vực khác", 0, 0, []),
    ];

    public static Region? Find(string? code) => All.FirstOrDefault(r => r.Code == code);
    public static bool IsValid(string? code) => Find(code) != null;
}
