using System.Security.Cryptography;
using System.Text.RegularExpressions;

namespace NguyenDuongNhutKhang_APIGAME.Helpers;

/// <summary>Ngày theo giờ Việt Nam (UTC+7, không có giờ mùa hè) — dùng cho thử thách hằng ngày.</summary>
public static class GameClock
{
    public static readonly TimeSpan VietnamOffset = TimeSpan.FromHours(7);

    public static string Today(DateTime utcNow) =>
        new DateTimeOffset(utcNow, TimeSpan.Zero).ToOffset(VietnamOffset).ToString("yyyy-MM-dd");

    /// <summary>Thời điểm (UTC) bắt đầu ngày mới tiếp theo theo giờ Việt Nam.</summary>
    public static DateTime NextReset(DateTime utcNow)
    {
        var local = new DateTimeOffset(utcNow, TimeSpan.Zero).ToOffset(VietnamOffset);
        var next = new DateTimeOffset(local.Date.AddDays(1), VietnamOffset);
        return next.UtcDateTime;
    }
}

/// <summary>Sinh mã ngẫu nhiên an toàn (mã phòng, mã thử thách). Bỏ ký tự dễ nhầm 0/O, 1/I.</summary>
public static class CodeGenerator
{
    private const string Alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    public static string New(int length = 6) =>
        string.Create(length, 0, (span, _) =>
        {
            for (var i = 0; i < span.Length; i++) span[i] = Alphabet[RandomNumberGenerator.GetInt32(Alphabet.Length)];
        });

    public static bool LooksValid(string? code) => code != null && Regex.IsMatch(code, "^[A-Z0-9]{4,12}$");
}

/// <summary>Luật Caro 15×15, thắng khi có từ 5 quân liên tiếp (ngang, dọc, chéo).</summary>
public static class CaroRules
{
    public const int Size = 15;
    public const int Cells = Size * Size;
    public const int WinLength = 5;

    /// <summary>Lưới: 0 trống, 1 = X (nước chẵn), 2 = O (nước lẻ).</summary>
    public static int[] Board(IReadOnlyList<int> moves)
    {
        var b = new int[Cells];
        for (var i = 0; i < moves.Count; i++) b[moves[i]] = i % 2 == 0 ? 1 : 2;
        return b;
    }

    /// <summary>Quân vừa đặt ở <paramref name="cell"/> có tạo thành 5 liên tiếp không.</summary>
    public static bool IsWin(int[] board, int cell)
    {
        var stone = board[cell];
        if (stone == 0) return false;
        int r = cell / Size, c = cell % Size;
        foreach (var (dr, dc) in new[] { (0, 1), (1, 0), (1, 1), (1, -1) })
        {
            var count = 1;
            count += Count(board, r, c, dr, dc, stone);
            count += Count(board, r, c, -dr, -dc, stone);
            if (count >= WinLength) return true;
        }
        return false;
    }

    private static int Count(int[] b, int r, int c, int dr, int dc, int stone)
    {
        var n = 0;
        for (int rr = r + dr, cc = c + dc; rr is >= 0 and < Size && cc is >= 0 and < Size && b[rr * Size + cc] == stone; rr += dr, cc += dc)
            n++;
        return n;
    }
}

/// <summary>
/// Mô phỏng Rubik 3×3 ở mức nhãn dán (54 sticker) để server tự kiểm tra lời giải:
/// áp scramble rồi lời giải của người chơi, khối phải trở về trạng thái đã giải.
/// Quy ước U,R,F,D,L,B; xoay theo chiều kim đồng hồ khi nhìn thẳng vào mặt đó từ ngoài.
/// </summary>
public static class RubikVerifier
{
    private static readonly Regex MoveToken = new("^[URFDLB](2|')?$", RegexOptions.Compiled);

    private readonly record struct Sticker(int X, int Y, int Z, int Nx, int Ny, int Nz, int Color);

    /// <summary>Tách chuỗi nước đi ("R U R' U2") — null nếu có ký hiệu không hợp lệ.</summary>
    public static List<string>? Parse(string? moves, int maxMoves = 2000)
    {
        if (moves == null) return null;
        var tokens = moves.Split([' ', ',', '\n', '\t'], StringSplitOptions.RemoveEmptyEntries);
        if (tokens.Length > maxMoves || tokens.Any(t => !MoveToken.IsMatch(t))) return null;
        return [.. tokens];
    }

    public static string RandomScramble(int length = 20)
    {
        const string faces = "URFDLB";
        string[] suffix = ["", "'", "2"];
        var list = new List<string>();
        var last = -1;
        while (list.Count < length)
        {
            var f = RandomNumberGenerator.GetInt32(6);
            // Không lặp cùng mặt liên tiếp; không 3 nước liền trên cùng một trục (vd. U D U).
            if (f == last || (list.Count >= 2 && f % 3 == last % 3 && faces.IndexOf(list[^2][0]) % 3 == f % 3)) continue;
            last = f;
            list.Add(faces[f] + suffix[RandomNumberGenerator.GetInt32(3)]);
        }
        return string.Join(' ', list);
    }

    /// <summary>scramble + solution có đưa khối về trạng thái giải không.</summary>
    public static bool Solves(string scramble, string solution)
    {
        var s = Parse(scramble);
        var m = Parse(solution);
        if (s == null || m == null) return false;
        var cube = Solved();
        foreach (var t in s.Concat(m)) Apply(cube, t);
        return IsSolved(cube);
    }

    private static Sticker[] Solved()
    {
        var list = new List<Sticker>();
        (int, int, int)[] normals = [(0, 1, 0), (1, 0, 0), (0, 0, 1), (0, -1, 0), (-1, 0, 0), (0, 0, -1)]; // U R F D L B
        for (var color = 0; color < 6; color++)
        {
            var (nx, ny, nz) = normals[color];
            for (var a = -1; a <= 1; a++)
            for (var b = -1; b <= 1; b++)
            {
                var (x, y, z) = nx != 0 ? (nx, a, b) : ny != 0 ? (a, ny, b) : (a, b, nz);
                list.Add(new Sticker(x, y, z, nx, ny, nz, color));
            }
        }
        return [.. list];
    }

    private static void Apply(Sticker[] cube, string token)
    {
        var (ax, ay, az) = token[0] switch
        {
            'U' => (0, 1, 0), 'D' => (0, -1, 0), 'R' => (1, 0, 0),
            'L' => (-1, 0, 0), 'F' => (0, 0, 1), _ => (0, 0, -1),
        };
        // Chiều kim đồng hồ nhìn từ ngoài vào = quay -90° quanh pháp tuyến hướng ra ngoài.
        var quarter = token.Length == 1 ? 1 : token[1] == '2' ? 2 : 3;
        for (var q = 0; q < quarter; q++)
        for (var i = 0; i < cube.Length; i++)
        {
            var s = cube[i];
            if (s.X * ax + s.Y * ay + s.Z * az != 1) continue;
            var (x, y, z) = RotateCw(s.X, s.Y, s.Z, ax, ay, az);
            var (nx, ny, nz) = RotateCw(s.Nx, s.Ny, s.Nz, ax, ay, az);
            cube[i] = s with { X = x, Y = y, Z = z, Nx = nx, Ny = ny, Nz = nz };
        }
    }

    /// <summary>Quay vector -90° quanh trục đơn vị (ax,ay,az): v' = v·cos − (k×v)·sin + k(k·v)(1−cos) với góc −90°.</summary>
    private static (int, int, int) RotateCw(int x, int y, int z, int ax, int ay, int az)
    {
        // cos(-90°)=0, sin(-90°)=-1 → v' = (k×v)·1·(-(-1))... viết gọn: v' = −(k×v) + k(k·v)
        var dot = ax * x + ay * y + az * z;
        var cx = ay * z - az * y;
        var cy = az * x - ax * z;
        var cz = ax * y - ay * x;
        return (-cx + ax * dot, -cy + ay * dot, -cz + az * dot);
    }

    private static bool IsSolved(Sticker[] cube) =>
        cube.GroupBy(s => (s.Nx, s.Ny, s.Nz)).All(g => g.Select(s => s.Color).Distinct().Count() == 1);
}

/// <summary>Kiểm tra lưới Sudoku 9×9 đã điền đầy đủ và đúng luật (hàng, cột, khối 3×3).</summary>
public static class SudokuVerifier
{
    public static bool IsValidSolution(string? grid)
    {
        if (grid == null || grid.Length != 81 || grid.Any(ch => ch is < '1' or > '9')) return false;
        for (var i = 0; i < 9; i++)
        {
            var row = new HashSet<char>();
            var col = new HashSet<char>();
            var box = new HashSet<char>();
            for (var j = 0; j < 9; j++)
            {
                row.Add(grid[i * 9 + j]);
                col.Add(grid[j * 9 + i]);
                box.Add(grid[(i / 3 * 3 + j / 3) * 9 + i % 3 * 3 + j % 3]);
            }
            if (row.Count != 9 || col.Count != 9 || box.Count != 9) return false;
        }
        return true;
    }

    /// <summary>Lời giải phải giữ nguyên các ô đề bài (ký tự '0' hoặc '.' là ô trống).</summary>
    public static bool MatchesGivens(string puzzle, string solution) =>
        puzzle.Length == 81 && solution.Length == 81 &&
        Enumerable.Range(0, 81).All(i => puzzle[i] is '0' or '.' || puzzle[i] == solution[i]);
}

/// <summary>Điểm do server tính từ dữ liệu ván (bỏ qua điểm client gửi).</summary>
public static class ScoreCalculator
{
    public static int Compute(string game, string outcome, long durationMs, int moves, int errors, int hints)
    {
        if (game == GameIds.Caro)
            return outcome switch { Outcomes.Win => 100, Outcomes.Draw => 50, _ => 10 };
        if (outcome != Outcomes.Win) return 0;
        var seconds = (int)Math.Min(durationMs / 1000, 100_000);
        var score = game switch
        {
            GameIds.Rubik => 10_000 - seconds * 5 - moves * 10,
            GameIds.Sudoku => 10_000 - seconds * 4 - errors * 250 - hints * 400,
            _ => 10_000 - seconds * 4 - moves * 2 - hints * 400,
        };
        return Math.Max(100, score);
    }
}
