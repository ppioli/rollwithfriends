using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    public partial class MapEntityNpc : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MapEntities_Files_ImageId",
                table: "MapEntities");

            migrationBuilder.DropIndex(
                name: "IX_MapEntities_ImageId",
                table: "MapEntities");

            migrationBuilder.DropColumn(
                name: "Height",
                table: "MapEntities");

            migrationBuilder.DropColumn(
                name: "ImageId",
                table: "MapEntities");

            migrationBuilder.RenameColumn(
                name: "Width",
                table: "MapEntities",
                newName: "Type");

            migrationBuilder.AddColumn<string>(
                name: "Content",
                table: "MapEntities",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "MapEntities",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Content",
                table: "MapEntities");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "MapEntities");

            migrationBuilder.RenameColumn(
                name: "Type",
                table: "MapEntities",
                newName: "Width");

            migrationBuilder.AddColumn<int>(
                name: "Height",
                table: "MapEntities",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ImageId",
                table: "MapEntities",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_MapEntities_ImageId",
                table: "MapEntities",
                column: "ImageId");

            migrationBuilder.AddForeignKey(
                name: "FK_MapEntities_Files_ImageId",
                table: "MapEntities",
                column: "ImageId",
                principalTable: "Files",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
