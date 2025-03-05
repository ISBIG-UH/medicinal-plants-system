using DataAccess;
using Microsoft.EntityFrameworkCore;
using Services;

namespace WebAPI.Extensions;

public static class DatabaseExtensions
{
    
    public static void AddDatabases(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection");

        if (connectionString == null)
            throw new InvalidOperationException("No database connection string provided");
        
        services.AddDatabase(connectionString);
    } 
    
     public static void MigrateDatabases(this IApplicationBuilder app,
        IConfiguration configuration)
    {
        using var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope();
        
        // Instruction to apply new migrations on application start. In most project cases we suppose it to be
        // triggered as a part of CI/CD process. Instead, in rare cases some projects can do it only on application start.
        // (This option is defined in app settings)
        
        var runMigrationsOnStart = configuration.GetValue<bool>("RunMigrationsOnStart");
        var isMigrationsAppRun = configuration.GetValue<bool>("IsMigrationsAppRun");

        // Migrations & Seeding
        if (runMigrationsOnStart || isMigrationsAppRun)
        {
            // Main database
            var dataContext = serviceScope.ServiceProvider.GetService<AppDbContext>();
            var mainDatabase = dataContext.Database;

            mainDatabase.Migrate();
            // catch (Exception ex)
            // {
            //     var exMessage = string.Join(
            //         "\n",
            //         "Main database migration failure.",
            //         $"DATABASE NAME: {mainDatabase.GetDbConnection().Database}",
            //         $"DATABASE TYPE: {configuration.GetDatabaseConnectionSettings().DatabaseType}\n",
            //         "APPLIED MIGRATIONS:",
            //         $"[ {string.Join(",  ", mainDatabase.GetAppliedMigrations().ToArray())} ]\n",
            //         "PENDING MIGRATIONS:",
            //         $"[ {string.Join(",  ", mainDatabase.GetPendingMigrations().ToArray())} ]");
            //
            //     throw new DatabaseMigrationException(exMessage, ex) { IsMigrationsAppRun = isMigrationsAppRun };
            // }


        }
        
    }
    
     
    
}