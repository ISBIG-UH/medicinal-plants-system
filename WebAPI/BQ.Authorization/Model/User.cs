using BQ.Authorization.Enum;
using BQ.Core.DataAccess.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace BQ.Authorization.Model;

/// <summary>
/// User class definition
/// </summary>
public class User : IdentityUser, IEntity<string>
{
    
    public string FirstName { get; set; }

    public string LastName { get; set; }
    
    public override string? PhoneNumber { get; set; }

    public AccountStatus AccountStatus { get; set; }

    public DateTimeOffset? FirstPasswordFailureDate { get; set; }
    
    public int? CompanyId { get; set; }

    public Company Company { get; set; }
    
    public ICollection<Role> Roles { get; set; } = new List<Role>();

    public string AuthSecurityStamp { get; set; }
}
