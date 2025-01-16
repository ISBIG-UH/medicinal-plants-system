using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class ExplicitConversion : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                @"ALTER TABLE ""Plants"" 
                ALTER COLUMN ""Vector"" 
                TYPE json
                USING to_json(""Vector"")");
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
