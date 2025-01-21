using Data.DTOs;

namespace Services.Interfaces;

public interface IAppService
{
    Task<AppDto> GetAppAsync(int id);

    Task AddAppAsync(AppDto appDto);

    Task DeleteAppAsync(int id);

    Task UpdateAppAsync(AppDto appDto);
}