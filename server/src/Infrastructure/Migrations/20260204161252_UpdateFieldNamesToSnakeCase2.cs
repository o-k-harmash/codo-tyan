using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CodoTyan.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdateFieldNamesToSnakeCase2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_article_tags_articles_ArticleId",
                table: "article_tags");

            migrationBuilder.DropForeignKey(
                name: "FK_article_tags_tags_TagsId",
                table: "article_tags");

            migrationBuilder.RenameColumn(
                name: "TagsId",
                table: "article_tags",
                newName: "tag_id");

            migrationBuilder.RenameColumn(
                name: "ArticleId",
                table: "article_tags",
                newName: "article_id");

            migrationBuilder.RenameIndex(
                name: "IX_article_tags_TagsId",
                table: "article_tags",
                newName: "IX_article_tags_tag_id");

            migrationBuilder.AddForeignKey(
                name: "fk_article_tags_article_id",
                table: "article_tags",
                column: "article_id",
                principalTable: "articles",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_article_tags_tag_id",
                table: "article_tags",
                column: "tag_id",
                principalTable: "tags",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_article_tags_article_id",
                table: "article_tags");

            migrationBuilder.DropForeignKey(
                name: "fk_article_tags_tag_id",
                table: "article_tags");

            migrationBuilder.RenameColumn(
                name: "tag_id",
                table: "article_tags",
                newName: "TagsId");

            migrationBuilder.RenameColumn(
                name: "article_id",
                table: "article_tags",
                newName: "ArticleId");

            migrationBuilder.RenameIndex(
                name: "IX_article_tags_tag_id",
                table: "article_tags",
                newName: "IX_article_tags_TagsId");

            migrationBuilder.AddForeignKey(
                name: "FK_article_tags_articles_ArticleId",
                table: "article_tags",
                column: "ArticleId",
                principalTable: "articles",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_article_tags_tags_TagsId",
                table: "article_tags",
                column: "TagsId",
                principalTable: "tags",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
