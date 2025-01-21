using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class AddProprtyToAppModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PlantApps_App_AppId",
                table: "PlantApps");

            migrationBuilder.DropPrimaryKey(
                name: "PK_App",
                table: "App");

            migrationBuilder.RenameTable(
                name: "App",
                newName: "Apps");

            migrationBuilder.AddColumn<string[]>(
                name: "Sys",
                table: "Apps",
                type: "text[]",
                nullable: false,
                defaultValue: new string[0]);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Apps",
                table: "Apps",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PlantApps_Apps_AppId",
                table: "PlantApps",
                column: "AppId",
                principalTable: "Apps",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PlantApps_Apps_AppId",
                table: "PlantApps");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Apps",
                table: "Apps");

            migrationBuilder.DropColumn(
                name: "Sys",
                table: "Apps");

            migrationBuilder.RenameTable(
                name: "Apps",
                newName: "App");

            migrationBuilder.AddPrimaryKey(
                name: "PK_App",
                table: "App",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PlantApps_App_AppId",
                table: "PlantApps",
                column: "AppId",
                principalTable: "App",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
