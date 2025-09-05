using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace fizzbuzz.Migrations
{
    /// <inheritdoc />
    public partial class AddIsDone : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Rules_GameId",
                table: "Rules");

            migrationBuilder.DropIndex(
                name: "IX_Answers_GameSessionId",
                table: "Answers");

            migrationBuilder.AlterColumn<string>(
                name: "Replacement",
                table: "Rules",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Username",
                table: "Players",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<bool>(
                name: "IsDone",
                table: "GameSessions",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AlterColumn<string>(
                name: "GameName",
                table: "Games",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_Rules_GameId_Divisor",
                table: "Rules",
                columns: new[] { "GameId", "Divisor" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Rules_GameId_Replacement",
                table: "Rules",
                columns: new[] { "GameId", "Replacement" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Players_Username",
                table: "Players",
                column: "Username",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Games_GameName",
                table: "Games",
                column: "GameName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Answers_GameSessionId_Number",
                table: "Answers",
                columns: new[] { "GameSessionId", "Number" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Rules_GameId_Divisor",
                table: "Rules");

            migrationBuilder.DropIndex(
                name: "IX_Rules_GameId_Replacement",
                table: "Rules");

            migrationBuilder.DropIndex(
                name: "IX_Players_Username",
                table: "Players");

            migrationBuilder.DropIndex(
                name: "IX_Games_GameName",
                table: "Games");

            migrationBuilder.DropIndex(
                name: "IX_Answers_GameSessionId_Number",
                table: "Answers");

            migrationBuilder.DropColumn(
                name: "IsDone",
                table: "GameSessions");

            migrationBuilder.AlterColumn<string>(
                name: "Replacement",
                table: "Rules",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<string>(
                name: "Username",
                table: "Players",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<string>(
                name: "GameName",
                table: "Games",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.CreateIndex(
                name: "IX_Rules_GameId",
                table: "Rules",
                column: "GameId");

            migrationBuilder.CreateIndex(
                name: "IX_Answers_GameSessionId",
                table: "Answers",
                column: "GameSessionId");
        }
    }
}
