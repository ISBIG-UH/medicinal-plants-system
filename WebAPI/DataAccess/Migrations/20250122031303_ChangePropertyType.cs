using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class ChangePropertyType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // add a temporary column with the new type
            migrationBuilder.AddColumn<float[]>(
                name: "Vector_Temp",
                table: "Plants",
                type: "real[]",
                nullable: true
            );

            // transform data from JSON to real[]
            migrationBuilder.Sql(@"
                UPDATE ""Plants""
                SET ""Vector_Temp"" = ARRAY(
                    SELECT jsonb_array_elements_text(""Vector""::jsonb)::real
                )
                WHERE ""Vector"" IS NOT NULL;
            ");

            // drop the original column
            migrationBuilder.DropColumn(
                name: "Vector",
                table: "Plants"
            );

            // rename the temporary column to the original column name 
            migrationBuilder.RenameColumn(
                name: "Vector_Temp",
                table: "Plants",
                newName: "Vector"
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // add the original column with the old type
            migrationBuilder.AddColumn<string>(
                name: "Vector",
                table: "Plants",
                type: "json",
                nullable: false,
                defaultValue: "[]"
            );

            // transform data back from real[] to JSON
            migrationBuilder.Sql(@"
                UPDATE ""Plants""
                SET ""Vector"" = (
                    SELECT jsonb_agg(value)
                    FROM unnest(""Vector_Temp"") AS value
                )
                WHERE ""Vector_Temp"" IS NOT NULL;
            ");
            
            // drop the temporary column
            migrationBuilder.DropColumn(
                name: "Vector_Temp",
                table: "Plants"
            );
        }


    }
}
