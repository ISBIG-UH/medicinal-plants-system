using BBWM.Core.Membership.DTO;
using BQ.Authorization.DTO;
using BQ.Core.Services;

namespace BQ.Authorization.Services.Interfaces;

public interface IUserService : IDataService<UserDTO, string>
{
    Task<UserDTO> Invite(UserDTO dto, CancellationToken cancellationToken = default);
    Task<AuthResultDTO> Login(LoginDTO dto, CancellationToken ct = default);
    Task<UserDTO> Register(UserDTO dto, CancellationToken ct = default);
}