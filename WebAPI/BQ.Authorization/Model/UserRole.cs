using Microsoft.AspNetCore.Identity;

namespace BQ.Authorization.Model;

public class UserRole : IdentityUserRole<string>
{
    public User User { get; set; }
    public Role Role { get; set; }
}
