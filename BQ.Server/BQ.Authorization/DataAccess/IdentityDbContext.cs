using System.Reflection;
using BQ.Authorization.Data.Model;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BQ.Authorization.DataAccess;

public class IdentityDbContext : IdentityDbContext<User, Role, string>
{
    
    public DbSet<Company> Companies { get; set; }
    
    protected IdentityDbContext(DbContextOptions options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        
    }
}