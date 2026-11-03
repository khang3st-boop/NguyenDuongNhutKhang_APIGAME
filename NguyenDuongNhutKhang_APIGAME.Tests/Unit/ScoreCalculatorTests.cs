using NguyenDuongNhutKhang_APIGAME.Helpers;

namespace NguyenDuongNhutKhang_APIGAME.Tests.Unit;

/// <summary>Điểm phải trùng với app Flutter và server Java cũ (Scoring.java).</summary>
public class ScoreCalculatorTests
{
    [Theory]
    // Xếp hình 3×3, 42 giây, không sai, không gợi ý: 500 + 30·9 − 42.
    [InlineData("puzzle", "3x3", "win", 42_000, 9, 0, 0, 728)]
    [InlineData("puzzle", "6x6", "win", 300_000, 40, 4, 1, 500 + 30 * 36 - 300 - 20 - 50)]
    // Sudoku: base theo độ khó − 2·giây − 50·lỗi − 100·gợi ý, tối thiểu 100.
    [InlineData("sudoku", "easy", "win", 300_000, 0, 1, 1, 1000 - 600 - 50 - 100)]
    [InlineData("sudoku", "hard", "win", 600_999, 0, 0, 0, 3500 - 1200)]
    [InlineData("sudoku", "medium", "win", 2_000_000, 0, 0, 0, 100)]
    // Rubik: max(100, 5000 − 5·giây − 10·nước) − 150·gợi ý.
    [InlineData("rubik", "scramble", "win", 60_000, 50, 0, 0, 5000 - 300 - 500)]
    [InlineData("rubik", "scramble", "win", 60_000, 50, 0, 2, 5000 - 300 - 500 - 300)]
    [InlineData("rubik", "scramble", "loss", 60_000, 50, 0, 0, 0)]
    // Caro: base theo mức AI + max(0, 300 − 3·nước); hoà = base/3; thua = 0.
    [InlineData("caro", "hard-x", "win", 90_000, 20, 0, 0, 1000 + 240)]
    [InlineData("caro", "medium-o", "draw", 90_000, 100, 0, 0, 200)]
    [InlineData("caro", "easy-x", "loss", 90_000, 20, 0, 0, 0)]
    [InlineData("caro", "easy-x", "win", 90_000, 20, 0, 1, 300 + 240 - 100)]
    public void Matches_client_and_java_formula(string game, string mode, string outcome, long ms, int moves,
        int errors, int hints, int expected) =>
        Assert.Equal(expected, ScoreCalculator.Compute(game, mode, outcome, ms, moves, errors, hints));

    [Fact]
    public void Rubik_auto_solve_scores_zero() =>
        Assert.Equal(0, ScoreCalculator.Compute("rubik", "scramble", "win", 60_000, 50, 0, 0, autoSolve: true));

    [Fact]
    public void Puzzle_without_grid_mode_uses_pieces_from_details() =>
        Assert.Equal(500 + 30 * 16 - 10, ScoreCalculator.Compute("puzzle", "online", "win", 10_000, 16, 0, 0, pieces: 16));
}
