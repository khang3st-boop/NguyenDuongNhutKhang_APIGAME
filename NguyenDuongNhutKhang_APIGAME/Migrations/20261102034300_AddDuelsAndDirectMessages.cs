using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NguyenDuongNhutKhang_APIGAME.Migrations
{
    /// <inheritdoc />
    public partial class AddDuelsAndDirectMessages : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DirectMessages",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SenderId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RecipientId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Text = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    ClientId = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: true),
                    SentAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ReadAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DirectMessages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DirectMessages_Users_RecipientId",
                        column: x => x.RecipientId,
                        principalTable: "Users",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_DirectMessages_Users_SenderId",
                        column: x => x.SenderId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DuelChallenges",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatorId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    OpponentId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Scramble = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    AllowAssist = table.Column<bool>(type: "bit", nullable: false),
                    Message = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Status = table.Column<string>(type: "nvarchar(16)", maxLength: 16, nullable: false),
                    WinnerId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ExpiresAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorClientId = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: true),
                    CreatorDurationMs = table.Column<long>(type: "bigint", nullable: true),
                    CreatorMoves = table.Column<int>(type: "int", nullable: true),
                    CreatorAssisted = table.Column<bool>(type: "bit", nullable: true),
                    CreatorSubmittedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    OpponentClientId = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: true),
                    OpponentDurationMs = table.Column<long>(type: "bigint", nullable: true),
                    OpponentMoves = table.Column<int>(type: "int", nullable: true),
                    OpponentAssisted = table.Column<bool>(type: "bit", nullable: true),
                    OpponentSubmittedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DuelChallenges", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DuelChallenges_Users_CreatorId",
                        column: x => x.CreatorId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DuelChallenges_Users_OpponentId",
                        column: x => x.OpponentId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_DirectMessages_RecipientId_ReadAt",
                table: "DirectMessages",
                columns: new[] { "RecipientId", "ReadAt" });

            migrationBuilder.CreateIndex(
                name: "IX_DirectMessages_SenderId_ClientId",
                table: "DirectMessages",
                columns: new[] { "SenderId", "ClientId" },
                unique: true,
                filter: "[ClientId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_DirectMessages_SenderId_RecipientId_Id",
                table: "DirectMessages",
                columns: new[] { "SenderId", "RecipientId", "Id" });

            migrationBuilder.CreateIndex(
                name: "IX_DuelChallenges_CreatorId_CreatedAt",
                table: "DuelChallenges",
                columns: new[] { "CreatorId", "CreatedAt" });

            migrationBuilder.CreateIndex(
                name: "IX_DuelChallenges_OpponentId_CreatedAt",
                table: "DuelChallenges",
                columns: new[] { "OpponentId", "CreatedAt" });

            migrationBuilder.CreateIndex(
                name: "IX_DuelChallenges_Status_ExpiresAt",
                table: "DuelChallenges",
                columns: new[] { "Status", "ExpiresAt" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DirectMessages");

            migrationBuilder.DropTable(
                name: "DuelChallenges");
        }
    }
}
