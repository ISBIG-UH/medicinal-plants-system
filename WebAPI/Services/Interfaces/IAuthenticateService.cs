using Data;
using Data.DTOs;

namespace Services.Interfaces;

public interface IAuthenticateService
{
    Task<UserSessionDto> AuthenticateAsync(UserLogin userLogin);
}
