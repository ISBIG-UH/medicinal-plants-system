using BQ.Authorization.Data.DTO;
using BQ.Core.Services;

namespace BQ.Authorization.Services.Interfaces;

public interface IUserService : IDataService<UserDto, string>
{
    Task<UserDto> Invite(UserDto dto, CancellationToken cancellationToken = default);
    Task<AuthResultDto> Login(LoginDto dto, CancellationToken ct = default);
    Task<UserDto> Register(UserDto dto, CancellationToken ct = default);
    Task Confirm(AccountConfirmationDto dto, CancellationToken ct = default);
}