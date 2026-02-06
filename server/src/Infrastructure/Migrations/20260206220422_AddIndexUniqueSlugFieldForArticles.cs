using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CodoTyan.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddIndexUniqueSlugFieldForArticles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_articles_slug",
                table: "articles",
                column: "slug",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_articles_slug",
                table: "articles");
        }
    }
}
