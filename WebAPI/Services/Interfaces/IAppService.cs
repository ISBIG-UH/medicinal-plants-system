using Data.DTOs;

namespace Services.Interfaces;

public interface IAppService
{
    Task<AppDto> GetAppByIdAsync(int id);

    Task AddAppAsync(AppDto appDto);

    Task DeleteAppAsync(int id);

    Task UpdateAppAsync(AppDto appDto);

    Task <IEnumerable<ItemDto>> GetAppsAsync();
}