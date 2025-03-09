using BQ.Authorization.Model;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BQ.Authorization;

public class IdentityDbContext : IdentityDbContext<User, Role, string>
{
    protected IdentityDbContext(DbContextOptions options) : base(options) { }
}