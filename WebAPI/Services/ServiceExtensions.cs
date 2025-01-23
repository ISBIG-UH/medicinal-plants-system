using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using DataAccess;
using Services.Interfaces;
using Services.Implementations;
using DataAccess.Interfaces;
using DataAccess.Implementations;
using Data.DTOs;

namespace Services;


public static class ServiceExtensions
{
    /// <summary>
    /// Extension method to add the database context to the service collection.
    /// </summary>
    /// <param name="services">The IServiceCollection to add the database context to.</param>
    /// <param name="connectionString">The connection string for the database.</param>
    /// <returns>The updated IServiceCollection.</returns>
    public static IServiceCollection AddDatabase(this IServiceCollection services, string connectionString)
    {
        services.AddDbContext<AppDbContext>(options => options.UseNpgsql(connectionString));
        return services;
    }

    /// <summary>
    /// Extension method to add application services to the service collection.
    /// </summary>
    /// <param name="services">The IServiceCollection to add the application services to.</param>
    /// <returns>The updated IServiceCollection.</returns>
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IQuerySearch<string, PlantDto>, PlantSearchService>();
        services.AddScoped<IPlantSearch, PlantSearch>();
        services.AddScoped<IDocumentVector, DocumentVector>();
        services.AddScoped<IAppService, AppService>();
        services.AddScoped<ICrudOperation<AppDto, AppDto>, AppCrudOperations>();

        return services;
    }

    /// <summary>
    /// Extension method to add admin services to the service collection.
    /// </summary>
    /// <param name="services">The IServiceCollection to add the application services to.</param>
    /// <returns>The updated IServiceCollection.</returns>
    public static IServiceCollection AddAdminServices(this IServiceCollection services)
    {
        services.AddScoped<IUserService, UserService>();
         services.AddScoped<IQuerySearch<string, PlantDto>, PlantSearchService>();
        services.AddScoped<IPlantSearch, PlantSearch>();
        services.AddScoped<IDocumentVector, DocumentVector>();
        services.AddScoped<IAdminService, AdminService>();
        services.AddScoped<ICrudOperation<PlantDto, PlantDto>, PlantCrudOperations>();
        services.AddScoped<IPlantSearch, PlantSearch>();
        services.AddScoped<IAppService, AppService>();
        services.AddScoped<ICrudOperation<AppDto, AppDto>, AppCrudOperations>();
        services.AddScoped<IAuthenticateService, AuthenticateService>();
         

        return services;
    }
}
