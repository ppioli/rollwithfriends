using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    public partial class MessageSource : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SourceId",
                table: "Messages",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Messages_SourceId",
                table: "Messages",
                column: "SourceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_MapEntities_SourceId",
                table: "Messages",
                column: "SourceId",
                principalTable: "MapEntities",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Messages_MapEntities_SourceId",
                table: "Messages");

            migrationBuilder.DropIndex(
                name: "IX_Messages_SourceId",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "SourceId",
                table: "Messages");
        }
    }
}
