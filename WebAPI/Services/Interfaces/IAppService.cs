using Data.DTOs;

namespace Services.Interfaces;

public interface IAppService
{
    Task<AppDto> GetAppAsync(int id);

    Task AddAppAsync(AppDto appDto);
}