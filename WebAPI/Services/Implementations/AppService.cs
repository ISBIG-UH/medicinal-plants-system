using Data.DTOs;
using DataAccess;
using Microsoft.EntityFrameworkCore;
using Services.Interfaces;
using Exceptions;
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

    public async Task<AppDto> GetAppAsync(int id)
    {
        if (! await _context.Apps.AnyAsync(p => p.Id == id))
        {
            throw new AppNotFoundException($"No existe una aplicación asociada a este id: '{id}'.");
        }

        var app = await _crudOperationService.GetAsync(id);
        return app;
    }
}