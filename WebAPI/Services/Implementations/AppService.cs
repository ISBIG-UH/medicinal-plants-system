using BQ.Core.Exceptions;
using Data.DTOs;
using DataAccess;
using Microsoft.EntityFrameworkCore;
using Services.Interfaces;
using DataAccess.Interfaces;

namespace Services.Implementations;

public class AppService : IAppService
{
    private readonly ICrudOperation<AppDto, AppDto> _crudOperationService;
    private readonly AppDbContext _context;

    public AppService(ICrudOperation<AppDto, AppDto> crudOperationService, AppDbContext context)
    {
        _crudOperationService = crudOperationService;
        _context = context;
    }

    public async Task<AppDto> GetAppByIdAsync(int id)
    {
        if (! await _context.Apps.AnyAsync(p => p.Id == id))
        {
            throw new AppNotFoundException($"No existe una aplicación asociada a este id: '{id}'.");
        }

        return await _crudOperationService.GetAsync(id);
    }

    public async Task AddAppAsync(AppDto appDto)
    {
        if (await _context.Apps
                    .FromSqlInterpolated(
                        $"SELECT * FROM \"Apps\" WHERE unaccent(\"Name\") ILIKE unaccent({appDto.name})"
                    )
                    .AnyAsync())
        {
            throw new AppAlreadyExistsException($"Ya existe una aplicación con el nombre: '{appDto}'.");
        }

        await _crudOperationService.AddAsync(appDto);
    }

    public async Task DeleteAppAsync(int id)
    {
        if (! await _context.Apps.AnyAsync(p => p.Id == id))
        {
            throw new AppNotFoundException($"No existe una app asociada a este id: '{id}'.");
        }

        await _crudOperationService.DeleteAsync(id);
    }

    public async Task UpdateAppAsync(AppDto apptDto)
    {
        if (! await _context.Apps.AnyAsync(p => p.Id == apptDto.id))
        {
            throw new AppNotFoundException($"No existe una app asociada a este id: '{apptDto.id}'.");
        }

        await _crudOperationService.UpdateAsync(apptDto);
    }

    public async Task<IEnumerable<ItemDto>> GetAppsAsync()
    {
        var apps = await _context.Apps
                    .Select(p => new ItemDto
                    {
                        id = p.Id,
                        name = p.Name
                    })
                    .OrderBy(p => p.name)
                    .ToListAsync();
        
        return apps;
    }
}