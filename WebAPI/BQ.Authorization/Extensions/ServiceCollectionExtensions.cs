using System.Reflection;
using BQ.Authorization.Model;
using BQ.Authorization.Services;
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
            .AddIdentityCore<User>(options =>
            {
                options.Password.RequireDigit = true;
                options.Password.RequiredLength = 8;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = true;
                options.Password.RequireLowercase = true;
                options.Password.RequiredUniqueChars = 0;
            })
            .AddRoles<Role>()
            .AddUserManager<BQUserManager<User>>()
            .AddEntityFrameworkStores<TContext>()
            .AddSignInManager();
        
    }
    public static void OnAuthorizationModelCreating(this ModelBuilder builder) =>
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
}