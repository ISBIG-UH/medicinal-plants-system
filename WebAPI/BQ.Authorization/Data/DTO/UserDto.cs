using BQ.Authorization.Data.Enum;
using BQ.Core.Data.Interfaces;

namespace BQ.Authorization.Data.DTO;

public class UserDto : IDTO<string>
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
    public CompanyDto? Company { get; set; }

    public Dictionary<string, string> Claims { get; set; } = new Dictionary<string, string>();
    public ICollection<RoleDto> Roles { get; set; } = new List<RoleDto>();
    public ICollection<CompanyDto> Companies { get; set; } = new List<CompanyDto>();
}