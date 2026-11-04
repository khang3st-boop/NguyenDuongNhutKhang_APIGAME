using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NguyenDuongNhutKhang_APIGAME.Migrations
{
    /// <inheritdoc />
    public partial class AddAuthV2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "EmailIndex",
                table: "Users");

            migrationBuilder.CreateTable(
                name: "AuthChallenges",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Purpose = table.Column<string>(type: "nvarchar(16)", maxLength: 16, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(254)", maxLength: 254, nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CodeHash = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ExpiresAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ResendAvailableAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Attempts = table.Column<int>(type: "int", nullable: false),
                    MaxAttempts = table.Column<int>(type: "int", nullable: false),
                    ConsumedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    SupersededAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IpHash = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: false),
                    PendingUsername = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    PendingDisplayName = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    PendingPasswordHash = table.Column<string>(type: "nvarchar(1024)", maxLength: 1024, nullable: true),
                    ResetTokenHash = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: true),
                    ResetTokenExpiresAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ResetUsedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuthChallenges", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "UX_Users_NormalizedEmail",
                table: "Users",
                column: "NormalizedEmail",
                unique: true,
                filter: "[NormalizedEmail] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AuthChallenges_Email_Purpose_CreatedAt",
                table: "AuthChallenges",
                columns: new[] { "Email", "Purpose", "CreatedAt" });

            migrationBuilder.CreateIndex(
                name: "IX_AuthChallenges_ExpiresAt",
                table: "AuthChallenges",
                column: "ExpiresAt");

            migrationBuilder.CreateIndex(
                name: "IX_AuthChallenges_IpHash_CreatedAt",
                table: "AuthChallenges",
                columns: new[] { "IpHash", "CreatedAt" });

            migrationBuilder.CreateIndex(
                name: "IX_AuthChallenges_ResetTokenHash",
                table: "AuthChallenges",
                column: "ResetTokenHash");

            migrationBuilder.CreateIndex(
                name: "IX_AuthChallenges_UserId",
                table: "AuthChallenges",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AuthChallenges");

            migrationBuilder.DropIndex(
                name: "UX_Users_NormalizedEmail",
                table: "Users");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "Users",
                column: "NormalizedEmail");
        }
    }
}
