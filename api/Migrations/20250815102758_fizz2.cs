using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace fizzbuzz.Migrations
{
    /// <inheritdoc />
    public partial class fizz2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SessionNumberHistories_GameSessions_GameSessionId",
                table: "SessionNumberHistories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SessionNumberHistories",
                table: "SessionNumberHistories");

            migrationBuilder.RenameTable(
                name: "SessionNumberHistories",
                newName: "Answers");

            migrationBuilder.RenameIndex(
                name: "IX_SessionNumberHistories_GameSessionId",
                table: "Answers",
                newName: "IX_Answers_GameSessionId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Answers",
                table: "Answers",
                column: "AnswerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Answers_GameSessions_GameSessionId",
                table: "Answers",
                column: "GameSessionId",
                principalTable: "GameSessions",
                principalColumn: "GameSessionId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Answers_GameSessions_GameSessionId",
                table: "Answers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Answers",
                table: "Answers");

            migrationBuilder.RenameTable(
                name: "Answers",
                newName: "SessionNumberHistories");

            migrationBuilder.RenameIndex(
                name: "IX_Answers_GameSessionId",
                table: "SessionNumberHistories",
                newName: "IX_SessionNumberHistories_GameSessionId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SessionNumberHistories",
                table: "SessionNumberHistories",
                column: "AnswerId");

            migrationBuilder.AddForeignKey(
                name: "FK_SessionNumberHistories_GameSessions_GameSessionId",
                table: "SessionNumberHistories",
                column: "GameSessionId",
                principalTable: "GameSessions",
                principalColumn: "GameSessionId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
