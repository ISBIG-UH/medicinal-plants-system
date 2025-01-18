using DataAccess;
using Data;
using Data.DTOs;
using Exceptions;
using Microsoft.EntityFrameworkCore;
using Services.Interfaces;
using DataAccess.Interfaces;

namespace Services.Implementations
{
    public class AdminService : IAdminService
    {
        private readonly ICrudOperation _crudOperationService;
        private readonly AppDbContext _context;

        public AdminService(ICrudOperation crudOperationService, AppDbContext context)
        {
            _crudOperationService = crudOperationService;
            _context = context;
        }

        public async Task AddPlantAsync(PlantDto plantDto)
        {
            var existPlant1 = await _context.Plants
                .FromSqlRaw(
                    "SELECT * FROM \"Plants\" WHERE unaccent(\"Name\") = unaccent({0})",
                    plantDto.name)
                .AnyAsync();

            var existPlant2 = await _context.Plants
                .AnyAsync(p => EF.Functions.ILike(p.Name, plantDto.name));

            if(existPlant1 || existPlant2)
            {
                throw new PlantAlreadyExistsException($"Ya existe una planta con el nombre '{plantDto.name}'.");
            }

            await _crudOperationService.PostAsync(plantDto);
        }
    }
}