using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class ModifyModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                @"ALTER TABLE ""Plants"" 
                ALTER COLUMN ""Vector"" 
                TYPE jsonb 
                USING to_jsonb(""Vector"")");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                @"ALTER TABLE ""Plants"" 
                ALTER COLUMN ""Vector"" 
                TYPE real[] 
                USING ""Vector""::real[]");
        }
    }
}
