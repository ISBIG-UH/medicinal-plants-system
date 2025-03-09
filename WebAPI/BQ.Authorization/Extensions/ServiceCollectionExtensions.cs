using System.Reflection;
using BQ.Authorization.Model;
using CQ.Core;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace BQ.Authorization.Extensions;

public static class ServiceCollectionExtensions
{

    public static void RegisterMapping(this IServiceCollection services)
    {
        services.AddAutoMapper(Assembly.GetExecutingAssembly());
    }
    
    public static void AddSignInManager<TContext>(this IServiceCollection services)
        where TContext : DbContext
    {
        
        services.AddAuthentication("Identity.Application")
            .AddCookie("Identity.Application");
        
        services
            .AddIdentityCore<User>()
            .AddRoles<Role>()
            .AddEntityFrameworkStores<TContext>()
            .AddSignInManager();
        
    }
    public static void OnAuthorizationModelCreating(this ModelBuilder builder) =>
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
}