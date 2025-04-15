using BQ.Authorization.Enum;
using BQ.Core.Data.Interfaces;

namespace BQ.Authorization.DTO;

public class UserDTO : IDTO<string>
{
    public string? Id { get; set; }
    public string? UserName { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string FullName => $"{FirstName} {LastName}";
    public string? Email { get; set; }
    public AccountStatus AccountStatus { get; set; }
    public string? PhoneNumber { get; set; }
    
    public string? Password { get; set; }
    public string? ConfirmPassword { get; set; }

    public int? CompanyId { get; set; }
    public CompanyDTO? Company { get; set; }

    public Dictionary<string, string> Claims { get; set; } = new Dictionary<string, string>();
    public ICollection<RoleDTO> Roles { get; set; } = new List<RoleDTO>();
    public ICollection<CompanyDTO> Companies { get; set; } = new List<CompanyDTO>();
}