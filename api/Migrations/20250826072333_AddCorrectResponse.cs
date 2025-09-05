using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace fizzbuzz.Migrations
{
    /// <inheritdoc />
    public partial class AddCorrectResponse : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CorrectResponse",
                table: "Answers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CorrectResponse",
                table: "Answers");
        }
    }
}
