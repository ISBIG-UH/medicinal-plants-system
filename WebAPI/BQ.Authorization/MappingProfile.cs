using AutoMapper;
using BQ.Authorization.DTO;
using BQ.Authorization.Model;

namespace BQ.Authorization;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<User, UserDTO>()
            .ForMember(d => d.Roles, m => m.MapFrom(s => s.UserRoles))
            .ReverseMap()
            .ForMember(d => d.NormalizedEmail, m => m.MapFrom(s => s.Email.ToUpperInvariant()))
            .ForMember(d => d.NormalizedUserName, m => m.MapFrom(s => s.UserName.ToUpperInvariant()))
            .ForMember(d => d.Company, m => m.Ignore())
            .ForMember(d => d.UserRoles, m => m.Ignore());

        CreateMap<Role, RoleDTO>()
            .ReverseMap()
            .ForMember(d => d.NormalizedName, m => m.MapFrom(s => s.Name.ToUpperInvariant()));

        CreateMap<Company, CompanyDTO>()
            .ReverseMap();
    }
    
}