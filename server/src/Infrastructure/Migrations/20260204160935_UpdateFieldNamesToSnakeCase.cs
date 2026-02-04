using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CodoTyan.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdateFieldNamesToSnakeCase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "tags",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "articles",
                newName: "title");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "articles",
                newName: "description");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "articles",
                newName: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "id",
                table: "tags",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "title",
                table: "articles",
                newName: "Title");

            migrationBuilder.RenameColumn(
                name: "description",
                table: "articles",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "articles",
                newName: "Id");
        }
    }
}
