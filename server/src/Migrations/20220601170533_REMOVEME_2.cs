using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    public partial class REMOVEME_2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Campaigns_Scenes_SelectedSceneId",
                table: "Campaigns");

            migrationBuilder.AlterColumn<int>(
                name: "SelectedSceneId",
                table: "Campaigns",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_Campaigns_Scenes_SelectedSceneId",
                table: "Campaigns",
                column: "SelectedSceneId",
                principalTable: "Scenes",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Campaigns_Scenes_SelectedSceneId",
                table: "Campaigns");

            migrationBuilder.AlterColumn<int>(
                name: "SelectedSceneId",
                table: "Campaigns",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Campaigns_Scenes_SelectedSceneId",
                table: "Campaigns",
                column: "SelectedSceneId",
                principalTable: "Scenes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
