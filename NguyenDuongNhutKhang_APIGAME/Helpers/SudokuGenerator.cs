using System.Numerics;
using System.Security.Cryptography;

namespace NguyenDuongNhutKhang_APIGAME.Helpers;

/// <summary>
/// Sinh đề Sudoku cho trận online: hoán vị một lưới đã giải (đổi nhãn số, hàng trong dải, dải, cột trong chồng, chồng),
/// rồi xoá dần ô theo thứ tự ngẫu nhiên — chỉ xoá khi đề vẫn còn đúng một lời giải.
/// </summary>
public static class SudokuGenerator
{
    /// <summary>Số ô trống mục tiêu theo độ khó.</summary>
    public static int TargetBlanks(string difficulty) => difficulty switch { "easy" => 40, "medium" => 48, _ => 54 };

    /// <summary>Trả (đề, lời giải): chuỗi 81 ký tự, '0' là ô trống.</summary>
    public static (string Puzzle, string Solution) Generate(string difficulty)
    {
        var solution = RandomSolvedGrid();
        var puzzle = (int[])solution.Clone();
        var order = Enumerable.Range(0, 81).OrderBy(_ => RandomNumberGenerator.GetInt32(int.MaxValue)).ToArray();
        var blanks = 0;
        var target = TargetBlanks(difficulty);
        foreach (var cell in order)
        {
            if (blanks >= target) break;
            var keep = puzzle[cell];
            puzzle[cell] = 0;
            if (CountSolutions(puzzle, 2) == 1) blanks++;
            else puzzle[cell] = keep;
        }
        return (string.Concat(puzzle), string.Concat(solution));
    }

    private static int[] RandomSolvedGrid()
    {
        var digits = Shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        var rows = Shuffle([0, 1, 2]).SelectMany(band => Shuffle([0, 1, 2]).Select(r => band * 3 + r)).ToArray();
        var cols = Shuffle([0, 1, 2]).SelectMany(stack => Shuffle([0, 1, 2]).Select(c => stack * 3 + c)).ToArray();
        var grid = new int[81];
        for (var r = 0; r < 9; r++)
        for (var c = 0; c < 9; c++)
        {
            int br = rows[r], bc = cols[c];
            // Mẫu chuẩn: (3·(r mod 3) + r/3 + c) mod 9 luôn là một lưới hợp lệ.
            grid[r * 9 + c] = digits[(br % 3 * 3 + br / 3 + bc) % 9];
        }
        return grid;
    }

    private static int[] Shuffle(int[] a)
    {
        for (var i = a.Length - 1; i > 0; i--)
        {
            var j = RandomNumberGenerator.GetInt32(i + 1);
            (a[i], a[j]) = (a[j], a[i]);
        }
        return a;
    }

    /// <summary>Đếm lời giải (dừng ở <paramref name="limit"/>) bằng quay lui với bitmask, ưu tiên ô ít lựa chọn nhất.</summary>
    public static int CountSolutions(int[] grid, int limit)
    {
        var g = (int[])grid.Clone();
        var rows = new int[9];
        var cols = new int[9];
        var boxes = new int[9];
        for (var i = 0; i < 81; i++)
        {
            if (g[i] == 0) continue;
            var bit = 1 << g[i];
            int r = i / 9, c = i % 9, b = r / 3 * 3 + c / 3;
            if ((rows[r] & bit) != 0 || (cols[c] & bit) != 0 || (boxes[b] & bit) != 0) return 0;
            rows[r] |= bit; cols[c] |= bit; boxes[b] |= bit;
        }
        var count = 0;
        Solve();
        return count;

        void Solve()
        {
            int best = -1, bestMask = 0, bestCount = 10;
            for (var i = 0; i < 81; i++)
            {
                if (g[i] != 0) continue;
                int r = i / 9, c = i % 9, b = r / 3 * 3 + c / 3;
                var mask = ~(rows[r] | cols[c] | boxes[b]) & 0x3FE;
                var n = BitOperations.PopCount((uint)mask);
                if (n == 0) return;
                if (n < bestCount) { best = i; bestMask = mask; bestCount = n; if (n == 1) break; }
            }
            if (best < 0) { count++; return; }
            int br = best / 9, bc = best % 9, bb = br / 3 * 3 + bc / 3;
            for (var d = 1; d <= 9 && count < limit; d++)
            {
                var bit = 1 << d;
                if ((bestMask & bit) == 0) continue;
                g[best] = d; rows[br] |= bit; cols[bc] |= bit; boxes[bb] |= bit;
                Solve();
                g[best] = 0; rows[br] &= ~bit; cols[bc] &= ~bit; boxes[bb] &= ~bit;
            }
        }
    }
}
