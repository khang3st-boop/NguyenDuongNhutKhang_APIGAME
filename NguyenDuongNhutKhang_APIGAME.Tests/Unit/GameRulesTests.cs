using NguyenDuongNhutKhang_APIGAME.Helpers;
using NguyenDuongNhutKhang_APIGAME.Repositories;

namespace NguyenDuongNhutKhang_APIGAME.Tests.Unit;

public class RubikVerifierTests
{
    private static string Inverse(string scramble) => string.Join(' ', scramble.Split(' ', StringSplitOptions.RemoveEmptyEntries)
        .Reverse().Select(m => m.EndsWith('\'') ? m[..1] : m.EndsWith('2') ? m : m + "'"));

    [Fact]
    public void Inverse_of_scramble_solves_the_cube()
    {
        for (var i = 0; i < 20; i++)
        {
            var scramble = RubikVerifier.RandomScramble(20);
            Assert.True(RubikVerifier.Solves(scramble, Inverse(scramble)), scramble);
        }
    }

    [Theory]
    [InlineData("R", "R")]           // cùng chiều → chưa giải
    [InlineData("R U", "R' U'")]     // sai thứ tự nghịch đảo
    [InlineData("F", "")]
    public void Wrong_solution_is_rejected(string scramble, string solution) =>
        Assert.False(RubikVerifier.Solves(scramble, solution));

    [Fact]
    public void Four_quarter_turns_are_identity() => Assert.True(RubikVerifier.Solves("U U U U R2 R2", ""));

    [Theory]
    [InlineData("Q")]
    [InlineData("R3")]
    [InlineData("R U <script>")]
    public void Invalid_notation_parses_to_null(string moves) => Assert.Null(RubikVerifier.Parse(moves));

    [Fact]
    public void Random_scramble_has_requested_length_and_no_repeated_face()
    {
        var moves = RubikVerifier.RandomScramble(25).Split(' ');
        Assert.Equal(25, moves.Length);
        for (var i = 1; i < moves.Length; i++) Assert.NotEqual(moves[i - 1][0], moves[i][0]);
    }
}

public class SudokuTests
{
    [Theory]
    [InlineData("easy")]
    [InlineData("medium")]
    [InlineData("hard")]
    public void Generated_puzzle_has_unique_solution_and_target_blanks(string difficulty)
    {
        var (puzzle, solution) = SudokuGenerator.Generate(difficulty);
        Assert.Equal(81, puzzle.Length);
        Assert.True(SudokuVerifier.IsValidSolution(solution));
        Assert.True(SudokuVerifier.MatchesGivens(puzzle, solution));
        Assert.True(puzzle.Count(c => c == '0') <= SudokuGenerator.TargetBlanks(difficulty));
        Assert.True(puzzle.Count(c => c == '0') >= 30);
        Assert.Equal(1, SudokuGenerator.CountSolutions(puzzle.Select(c => c - '0').ToArray(), 2));
    }

    [Fact]
    public void Swapping_two_cells_breaks_validity()
    {
        var (_, solution) = SudokuGenerator.Generate("easy");
        var bad = solution.ToCharArray();
        (bad[0], bad[1]) = (bad[1], bad[0]);
        Assert.False(SudokuVerifier.IsValidSolution(new string(bad)));
    }

    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData("12345")]
    public void Malformed_grid_is_invalid(string? grid) => Assert.False(SudokuVerifier.IsValidSolution(grid));

    [Fact]
    public void Solution_must_keep_givens()
    {
        var (puzzle, solution) = SudokuGenerator.Generate("easy");
        var (_, other) = SudokuGenerator.Generate("easy");
        if (other != solution) Assert.False(SudokuVerifier.MatchesGivens(puzzle, other));
    }
}

public class CaroRulesTests
{
    [Fact]
    public void Five_in_a_row_wins_horizontally()
    {
        // X: 0,1,2,3,4 — O: 15,16,17,18
        var moves = new List<int> { 0, 15, 1, 16, 2, 17, 3, 18, 4 };
        var board = CaroRules.Board(moves);
        Assert.True(CaroRules.IsWin(board, 4));
        Assert.False(CaroRules.IsWin(board, 18));
    }

    [Fact]
    public void Diagonal_win_detected_from_middle_stone()
    {
        int Cell(int r, int c) => r * CaroRules.Size + c;
        var moves = new List<int>();
        for (var i = 0; i < 5; i++) { moves.Add(Cell(5 + i, 5 + i)); if (i < 4) moves.Add(Cell(0, i)); }
        var board = CaroRules.Board(moves);
        Assert.True(CaroRules.IsWin(board, Cell(7, 7)));
    }

    [Fact]
    public void Four_in_a_row_is_not_a_win()
    {
        var board = CaroRules.Board([0, 15, 1, 16, 2, 17, 3]);
        Assert.False(CaroRules.IsWin(board, 3));
    }

    [Fact]
    public void Row_does_not_wrap_around_board_edge()
    {
        // 12,13,14 (cuối hàng 0) + 15,16 (đầu hàng 1) không phải 5 liên tiếp
        var board = new int[CaroRules.Cells];
        foreach (var c in new[] { 12, 13, 14, 15, 16 }) board[c] = 1;
        Assert.False(CaroRules.IsWin(board, 14));
    }
}

public class OnlineRulesTests
{
    [Theory]
    [InlineData("rubik", "3x3", true)]
    [InlineData("sudoku", "hard", true)]
    [InlineData("puzzle", "6x6", true)]
    [InlineData("caro", "15x15", true)]
    [InlineData("caro", "3x3", false)]
    [InlineData("chess", "x", false)]
    public void Modes_are_validated(string game, string mode, bool ok) => Assert.Equal(ok, OnlineModes.IsValid(game, mode));

    [Theory]
    [InlineData("caro", 2, true)]
    [InlineData("caro", 4, false)]
    [InlineData("puzzle", 4, true)]
    [InlineData("rubik", 3, false)]
    public void Capacity_rules(string game, int capacity, bool ok) => Assert.Equal(ok, OnlineModes.CapacityAllowed(game, capacity));

    [Fact]
    public void Regions_are_coarse_and_neighbours_exist()
    {
        Assert.True(Regions.IsValid("VN-S"));
        Assert.False(Regions.IsValid("MARS"));
        foreach (var n in Regions.Find("VN-C")!.Neighbours) Assert.True(Regions.IsValid(n));
    }

    [Theory]
    [InlineData(0, 0, 1200)]
    [InlineData(3, 1, 1232)]
    [InlineData(0, 200, 100)] // sàn 100 điểm
    public void Online_rating_formula(int wins, int losses, int expected) =>
        Assert.Equal(expected, new OnlineRepository.RatingRow(Guid.Empty, wins + losses, wins, losses).Rating);
}
