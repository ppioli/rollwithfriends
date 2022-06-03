using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    public partial class REMOVEME_3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Owner",
                table: "Campaigns");

            migrationBuilder.AddColumn<int>(
                name: "Rol",
                table: "CampaignEnrollments",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Rol",
                table: "CampaignEnrollments");

            migrationBuilder.AddColumn<string>(
                name: "Owner",
                table: "Campaigns",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
