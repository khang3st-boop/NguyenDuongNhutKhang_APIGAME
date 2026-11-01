using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NguyenDuongNhutKhang_APIGAME.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DailyChallenges",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Date = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    Game = table.Column<string>(type: "nvarchar(16)", maxLength: 16, nullable: false),
                    Seed = table.Column<long>(type: "bigint", nullable: false),
                    Mode = table.Column<string>(type: "nvarchar(32)", maxLength: 32, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DailyChallenges", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MatchRooms",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Code = table.Column<string>(type: "nvarchar(8)", maxLength: 8, nullable: false),
                    Game = table.Column<string>(type: "nvarchar(16)", maxLength: 16, nullable: false),
                    Mode = table.Column<string>(type: "nvarchar(32)", maxLength: 32, nullable: false),
                    Capacity = table.Column<int>(type: "int", nullable: false),
                    Source = table.Column<string>(type: "nvarchar(8)", maxLength: 8, nullable: false),
                    Status = table.Column<string>(type: "nvarchar(16)", maxLength: 16, nullable: false),
                    HostId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ConfigJson = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: false),
                    AssistLocked = table.Column<bool>(type: "bit", nullable: false),
                    CaroMovesJson = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: false),
                    TurnDeadline = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ReadyDeadline = table.Column<DateTime>(type: "datetime2", nullable: true),
                    StartedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    EndedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    WinnerId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    EndReason = table.Column<string>(type: "nvarchar(32)", maxLength: 32, nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MatchRooms", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TokenVersion = table.Column<int>(type: "int", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(1024)", maxLength: 1024, nullable: true),
                    SecurityStamp = table.Column<string>(type: "nvarchar(1024)", maxLength: 1024, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(1024)", maxLength: 1024, nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "bit", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RoleClaims_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Challenges",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FromUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ToUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Game = table.Column<string>(type: "nvarchar(16)", maxLength: 16, nullable: false),
                    Mode = table.Column<string>(type: "nvarchar(32)", maxLength: 32, nullable: false),
                    Capacity = table.Column<int>(type: "int", nullable: false),
                    MatchRoomId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(16)", maxLength: 16, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ExpiresAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RespondedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Challenges", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Challenges_Users_FromUserId",
                        column: x => x.FromUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Challenges_Users_ToUserId",
                        column: x => x.ToUserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ChatMessages",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MatchRoomId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SenderId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ClientId = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: true),
                    Text = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: false),
                    SentAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChatMessages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ChatMessages_MatchRooms_MatchRoomId",
                        column: x => x.MatchRoomId,
                        principalTable: "MatchRooms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ChatMessages_Users_SenderId",
                        column: x => x.SenderId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Friendships",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RequesterId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AddresseeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(16)", maxLength: 16, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RespondedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Friendships", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Friendships_Users_AddresseeId",
                        column: x => x.AddresseeId,
                        principalTable: "Users",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Friendships_Users_RequesterId",
                        column: x => x.RequesterId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GameResults",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ClientId = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: false),
                    SessionId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Game = table.Column<string>(type: "nvarchar(16)", maxLength: 16, nullable: false),
                    Mode = table.Column<string>(type: "nvarchar(32)", maxLength: 32, nullable: false),
                    Outcome = table.Column<string>(type: "nvarchar(8)", maxLength: 8, nullable: false),
                    Score = table.Column<int>(type: "int", nullable: false),
                    DurationMs = table.Column<long>(type: "bigint", nullable: false),
                    Moves = table.Column<int>(type: "int", nullable: false),
                    Errors = table.Column<int>(type: "int", nullable: false),
                    Hints = table.Column<int>(type: "int", nullable: false),
                    Assisted = table.Column<bool>(type: "bit", nullable: false),
                    Rankable = table.Column<bool>(type: "bit", nullable: false),
                    DailyDate = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    ChallengeCode = table.Column<string>(type: "nvarchar(12)", maxLength: 12, nullable: true),
                    DetailsJson = table.Column<string>(type: "nvarchar(4000)", maxLength: 4000, nullable: true),
                    PlayedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ReceivedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GameResults", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GameResults_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GameSessions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Game = table.Column<string>(type: "nvarchar(16)", maxLength: 16, nullable: false),
                    Mode = table.Column<string>(type: "nvarchar(32)", maxLength: 32, nullable: false),
                    Status = table.Column<string>(type: "nvarchar(16)", maxLength: 16, nullable: false),
                    StateJson = table.Column<string>(type: "nvarchar(max)", maxLength: 16000, nullable: true),
                    DailyDate = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    StartedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ResultId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GameSessions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GameSessions_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GameStatistics",
                columns: table => new
                {
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Game = table.Column<string>(type: "nvarchar(16)", maxLength: 16, nullable: false),
                    GamesPlayed = table.Column<int>(type: "int", nullable: false),
                    Wins = table.Column<int>(type: "int", nullable: false),
                    Losses = table.Column<int>(type: "int", nullable: false),
                    Draws = table.Column<int>(type: "int", nullable: false),
                    TotalDurationMs = table.Column<long>(type: "bigint", nullable: false),
                    BestTimeMs = table.Column<long>(type: "bigint", nullable: true),
                    TotalMoves = table.Column<long>(type: "bigint", nullable: false),
                    BestMoves = table.Column<int>(type: "int", nullable: true),
                    BestScore = table.Column<int>(type: "int", nullable: false),
                    CurrentStreak = table.Column<int>(type: "int", nullable: false),
                    BestStreak = table.Column<int>(type: "int", nullable: false),
                    LastPlayedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GameStatistics", x => new { x.UserId, x.Game });
                    table.ForeignKey(
                        name: "FK_GameStatistics_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Leaderboards",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Board = table.Column<string>(type: "nvarchar(24)", maxLength: 24, nullable: false),
                    Game = table.Column<string>(type: "nvarchar(16)", maxLength: 16, nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    BestScore = table.Column<int>(type: "int", nullable: false),
                    BestTimeMs = table.Column<long>(type: "bigint", nullable: true),
                    GamesPlayed = table.Column<int>(type: "int", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Leaderboards", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Leaderboards_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MatchmakingTickets",
                columns: table => new
                {
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Game = table.Column<string>(type: "nvarchar(16)", maxLength: 16, nullable: false),
                    Mode = table.Column<string>(type: "nvarchar(32)", maxLength: 32, nullable: false),
                    Region = table.Column<string>(type: "nvarchar(8)", maxLength: 8, nullable: false),
                    Widen = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ExpiresAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    MatchRoomId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MatchmakingTickets", x => x.UserId);
                    table.ForeignKey(
                        name: "FK_MatchmakingTickets_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MatchParticipants",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MatchRoomId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Seat = table.Column<int>(type: "int", nullable: false),
                    Ready = table.Column<bool>(type: "bit", nullable: false),
                    Progress = table.Column<int>(type: "int", nullable: false),
                    Assisted = table.Column<bool>(type: "bit", nullable: false),
                    Forfeited = table.Column<bool>(type: "bit", nullable: false),
                    FinishTimeMs = table.Column<long>(type: "bigint", nullable: true),
                    Moves = table.Column<int>(type: "int", nullable: true),
                    Verified = table.Column<bool>(type: "bit", nullable: true),
                    JoinedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FinishedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MatchParticipants", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MatchParticipants_MatchRooms_MatchRoomId",
                        column: x => x.MatchRoomId,
                        principalTable: "MatchRooms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MatchParticipants_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "MatchResults",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MatchRoomId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Rank = table.Column<int>(type: "int", nullable: false),
                    Outcome = table.Column<string>(type: "nvarchar(8)", maxLength: 8, nullable: false),
                    TimeMs = table.Column<long>(type: "bigint", nullable: true),
                    Valid = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MatchResults", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MatchResults_MatchRooms_MatchRoomId",
                        column: x => x.MatchRoomId,
                        principalTable: "MatchRooms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MatchResults_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "PlayerPresences",
                columns: table => new
                {
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Games = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: false),
                    Capacities = table.Column<string>(type: "nvarchar(8)", maxLength: 8, nullable: false),
                    Region = table.Column<string>(type: "nvarchar(8)", maxLength: 8, nullable: true),
                    ShowStats = table.Column<bool>(type: "bit", nullable: false),
                    LastSeenAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlayerPresences", x => x.UserId);
                    table.ForeignKey(
                        name: "FK_PlayerPresences_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RefreshTokens",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TokenHash = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ExpiresAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RevokedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ReplacedById = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RefreshTokens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RefreshTokens_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RubikChallengeCodes",
                columns: table => new
                {
                    Code = table.Column<string>(type: "nvarchar(12)", maxLength: 12, nullable: false),
                    CreatorId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Scramble = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Note = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ExpiresAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RubikChallengeCodes", x => x.Code);
                    table.ForeignKey(
                        name: "FK_RubikChallengeCodes_Users_CreatorId",
                        column: x => x.CreatorId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SyncRecords",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DeviceId = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: true),
                    Accepted = table.Column<int>(type: "int", nullable: false),
                    Duplicates = table.Column<int>(type: "int", nullable: false),
                    Rejected = table.Column<int>(type: "int", nullable: false),
                    SyncedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SyncRecords", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SyncRecords_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserBlocks",
                columns: table => new
                {
                    BlockerId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    BlockedId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserBlocks", x => new { x.BlockerId, x.BlockedId });
                    table.ForeignKey(
                        name: "FK_UserBlocks_Users_BlockedId",
                        column: x => x.BlockedId,
                        principalTable: "Users",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_UserBlocks_Users_BlockerId",
                        column: x => x.BlockerId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserClaims_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    ProviderKey = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_UserLogins_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserProfiles",
                columns: table => new
                {
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DisplayName = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    AvatarColor = table.Column<int>(type: "int", nullable: false),
                    Bio = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    ShowStats = table.Column<bool>(type: "bit", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserProfiles", x => x.UserId);
                    table.ForeignKey(
                        name: "FK_UserProfiles_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserReports",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ReporterId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TargetUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MatchRoomId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ChatMessageId = table.Column<long>(type: "bigint", nullable: true),
                    Reason = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: false),
                    Status = table.Column<string>(type: "nvarchar(16)", maxLength: 16, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserReports", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserReports_Users_ReporterId",
                        column: x => x.ReporterId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserReports_Users_TargetUserId",
                        column: x => x.TargetUserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "UserRoles",
                columns: table => new
                {
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RoleId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_UserRoles_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserRoles_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserTokens",
                columns: table => new
                {
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    LoginProvider = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    Value = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_UserTokens_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Challenges_FromUserId_Status",
                table: "Challenges",
                columns: new[] { "FromUserId", "Status" });

            migrationBuilder.CreateIndex(
                name: "IX_Challenges_Status_ExpiresAt",
                table: "Challenges",
                columns: new[] { "Status", "ExpiresAt" });

            migrationBuilder.CreateIndex(
                name: "IX_Challenges_ToUserId_Status",
                table: "Challenges",
                columns: new[] { "ToUserId", "Status" });

            migrationBuilder.CreateIndex(
                name: "IX_ChatMessages_MatchRoomId_SentAt",
                table: "ChatMessages",
                columns: new[] { "MatchRoomId", "SentAt" });

            migrationBuilder.CreateIndex(
                name: "IX_ChatMessages_SenderId",
                table: "ChatMessages",
                column: "SenderId");

            migrationBuilder.CreateIndex(
                name: "IX_DailyChallenges_Date_Game",
                table: "DailyChallenges",
                columns: new[] { "Date", "Game" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Friendships_AddresseeId_Status",
                table: "Friendships",
                columns: new[] { "AddresseeId", "Status" });

            migrationBuilder.CreateIndex(
                name: "IX_Friendships_RequesterId_AddresseeId",
                table: "Friendships",
                columns: new[] { "RequesterId", "AddresseeId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_GameResults_ChallengeCode",
                table: "GameResults",
                column: "ChallengeCode");

            migrationBuilder.CreateIndex(
                name: "IX_GameResults_Game_DailyDate_Rankable",
                table: "GameResults",
                columns: new[] { "Game", "DailyDate", "Rankable" });

            migrationBuilder.CreateIndex(
                name: "IX_GameResults_UserId_ClientId",
                table: "GameResults",
                columns: new[] { "UserId", "ClientId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_GameResults_UserId_Game_PlayedAt",
                table: "GameResults",
                columns: new[] { "UserId", "Game", "PlayedAt" });

            migrationBuilder.CreateIndex(
                name: "IX_GameSessions_UserId_Game_Status",
                table: "GameSessions",
                columns: new[] { "UserId", "Game", "Status" });

            migrationBuilder.CreateIndex(
                name: "IX_Leaderboards_Board_Game_BestScore",
                table: "Leaderboards",
                columns: new[] { "Board", "Game", "BestScore" });

            migrationBuilder.CreateIndex(
                name: "IX_Leaderboards_Board_Game_UserId",
                table: "Leaderboards",
                columns: new[] { "Board", "Game", "UserId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Leaderboards_UserId",
                table: "Leaderboards",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_MatchmakingTickets_Game_Mode_MatchRoomId",
                table: "MatchmakingTickets",
                columns: new[] { "Game", "Mode", "MatchRoomId" });

            migrationBuilder.CreateIndex(
                name: "IX_MatchParticipants_MatchRoomId_Seat",
                table: "MatchParticipants",
                columns: new[] { "MatchRoomId", "Seat" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_MatchParticipants_MatchRoomId_UserId",
                table: "MatchParticipants",
                columns: new[] { "MatchRoomId", "UserId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_MatchParticipants_UserId",
                table: "MatchParticipants",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_MatchResults_MatchRoomId_UserId",
                table: "MatchResults",
                columns: new[] { "MatchRoomId", "UserId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_MatchResults_UserId_CreatedAt",
                table: "MatchResults",
                columns: new[] { "UserId", "CreatedAt" });

            migrationBuilder.CreateIndex(
                name: "IX_MatchRooms_Code",
                table: "MatchRooms",
                column: "Code");

            migrationBuilder.CreateIndex(
                name: "IX_MatchRooms_Status_CreatedAt",
                table: "MatchRooms",
                columns: new[] { "Status", "CreatedAt" });

            migrationBuilder.CreateIndex(
                name: "IX_PlayerPresences_LastSeenAt",
                table: "PlayerPresences",
                column: "LastSeenAt");

            migrationBuilder.CreateIndex(
                name: "IX_RefreshTokens_TokenHash",
                table: "RefreshTokens",
                column: "TokenHash",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_RefreshTokens_UserId_ExpiresAt",
                table: "RefreshTokens",
                columns: new[] { "UserId", "ExpiresAt" });

            migrationBuilder.CreateIndex(
                name: "IX_RoleClaims_RoleId",
                table: "RoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "Roles",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_RubikChallengeCodes_CreatorId",
                table: "RubikChallengeCodes",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_SyncRecords_UserId_SyncedAt",
                table: "SyncRecords",
                columns: new[] { "UserId", "SyncedAt" });

            migrationBuilder.CreateIndex(
                name: "IX_UserBlocks_BlockedId",
                table: "UserBlocks",
                column: "BlockedId");

            migrationBuilder.CreateIndex(
                name: "IX_UserClaims_UserId",
                table: "UserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserLogins_UserId",
                table: "UserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserProfiles_DisplayName",
                table: "UserProfiles",
                column: "DisplayName");

            migrationBuilder.CreateIndex(
                name: "IX_UserReports_ReporterId",
                table: "UserReports",
                column: "ReporterId");

            migrationBuilder.CreateIndex(
                name: "IX_UserReports_Status_CreatedAt",
                table: "UserReports",
                columns: new[] { "Status", "CreatedAt" });

            migrationBuilder.CreateIndex(
                name: "IX_UserReports_TargetUserId",
                table: "UserReports",
                column: "TargetUserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRoles_RoleId",
                table: "UserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "Users",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "Users",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Challenges");

            migrationBuilder.DropTable(
                name: "ChatMessages");

            migrationBuilder.DropTable(
                name: "DailyChallenges");

            migrationBuilder.DropTable(
                name: "Friendships");

            migrationBuilder.DropTable(
                name: "GameResults");

            migrationBuilder.DropTable(
                name: "GameSessions");

            migrationBuilder.DropTable(
                name: "GameStatistics");

            migrationBuilder.DropTable(
                name: "Leaderboards");

            migrationBuilder.DropTable(
                name: "MatchmakingTickets");

            migrationBuilder.DropTable(
                name: "MatchParticipants");

            migrationBuilder.DropTable(
                name: "MatchResults");

            migrationBuilder.DropTable(
                name: "PlayerPresences");

            migrationBuilder.DropTable(
                name: "RefreshTokens");

            migrationBuilder.DropTable(
                name: "RoleClaims");

            migrationBuilder.DropTable(
                name: "RubikChallengeCodes");

            migrationBuilder.DropTable(
                name: "SyncRecords");

            migrationBuilder.DropTable(
                name: "UserBlocks");

            migrationBuilder.DropTable(
                name: "UserClaims");

            migrationBuilder.DropTable(
                name: "UserLogins");

            migrationBuilder.DropTable(
                name: "UserProfiles");

            migrationBuilder.DropTable(
                name: "UserReports");

            migrationBuilder.DropTable(
                name: "UserRoles");

            migrationBuilder.DropTable(
                name: "UserTokens");

            migrationBuilder.DropTable(
                name: "MatchRooms");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
