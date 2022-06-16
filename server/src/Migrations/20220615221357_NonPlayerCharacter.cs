using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Server.Migrations
{
    public partial class NonPlayerCharacter : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Sources",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    ShortName = table.Column<string>(type: "text", nullable: false),
                    OwnerId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sources", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Sources_AspNetUsers_OwnerId",
                        column: x => x.OwnerId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "NonPlayerCharacters5E",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Page = table.Column<int>(type: "integer", nullable: false),
                    SourceId = table.Column<int>(type: "integer", nullable: false),
                    Type = table.Column<string>(type: "text", nullable: false),
                    HitPointsFormula = table.Column<string>(type: "text", nullable: false),
                    HitPointsAverage = table.Column<int>(type: "integer", nullable: false),
                    ArmorClasses = table.Column<string>(type: "text", nullable: false),
                    ChallangeRating = table.Column<double>(type: "double precision", nullable: false),
                    Alignments = table.Column<string>(type: "text", nullable: false),
                    Sizes = table.Column<string>(type: "text", nullable: false),
                    SavingThrows = table.Column<string>(type: "text", nullable: false),
                    Skills = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    AvatarId = table.Column<int>(type: "integer", nullable: false),
                    Languages = table.Column<string>(type: "text", nullable: false),
                    Senses = table.Column<string>(type: "text", nullable: false),
                    PassivePerception = table.Column<int>(type: "integer", nullable: false),
                    Resistances = table.Column<string>(type: "text", nullable: false),
                    Speeds = table.Column<string>(type: "text", nullable: false),
                    Strength = table.Column<int>(type: "integer", nullable: false),
                    Dexterity = table.Column<int>(type: "integer", nullable: false),
                    Constitution = table.Column<int>(type: "integer", nullable: false),
                    Intelligence = table.Column<int>(type: "integer", nullable: false),
                    Wisdom = table.Column<int>(type: "integer", nullable: false),
                    Charisma = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NonPlayerCharacters5E", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NonPlayerCharacters5E_Files_AvatarId",
                        column: x => x.AvatarId,
                        principalTable: "Files",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_NonPlayerCharacters5E_Sources_SourceId",
                        column: x => x.SourceId,
                        principalTable: "Sources",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_NonPlayerCharacters5E_AvatarId",
                table: "NonPlayerCharacters5E",
                column: "AvatarId");

            migrationBuilder.CreateIndex(
                name: "IX_NonPlayerCharacters5E_SourceId",
                table: "NonPlayerCharacters5E",
                column: "SourceId");

            migrationBuilder.CreateIndex(
                name: "IX_Sources_OwnerId",
                table: "Sources",
                column: "OwnerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "NonPlayerCharacters5E");

            migrationBuilder.DropTable(
                name: "Sources");
        }
    }
}
