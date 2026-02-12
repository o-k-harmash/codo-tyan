using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CodoTyan.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InitialMigration4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "user_id",
                table: "user_logins",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_user_logins_user_id",
                table: "user_logins",
                column: "user_id",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_user_logins_users_user_id",
                table: "user_logins",
                column: "user_id",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_user_logins_users_user_id",
                table: "user_logins");

            migrationBuilder.DropIndex(
                name: "IX_user_logins_user_id",
                table: "user_logins");

            migrationBuilder.AlterColumn<string>(
                name: "user_id",
                table: "user_logins",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");
        }
    }
}
