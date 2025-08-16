using Microsoft.AspNetCore.Identity;

namespace BQ.Authorization.Data.Model;

public class Role : IdentityRole
{
    public Role() {}
    
    public Role(string name)
        : base(name) {}
    
    public ICollection<UserRole> UserRoles { get; } = new List<UserRole>();
}