using BQ.Core.Exceptions;
using DataAccess;
using Data.DTOs;
using Microsoft.EntityFrameworkCore;
using Services.Interfaces;
using DataAccess.Interfaces;

namespace Services.Implementations
{
    public class AdminService : IAdminService
    {
        private readonly ICrudOperation<PlantDto, PlantDto> _crudOperationService;
        private readonly AppDbContext _context;

        public AdminService(ICrudOperation<PlantDto, PlantDto> crudOperationService, AppDbContext context)
        {
            _crudOperationService = crudOperationService;
            _context = context;
        }

        public async Task AddPlantAsync(PlantDto plantDto)
        {
            if (await _context.Plants
                .FromSqlRaw(@"
                    SELECT 1 FROM ""Plants""
                    WHERE unaccent(""Name"") ILIKE unaccent({0}) AND ""State"" != 'deleted' LIMIT 1", plantDto.name)
                .AnyAsync())
            {
                throw new PlantAlreadyExistsException($"Ya existe una planta con el nombre '{plantDto.name}'.");
            }

            await _crudOperationService.AddAsync(plantDto);
        }

        public async Task DeletePlantAsync(int id)
        {
            if (! await _context.Plants.AnyAsync(p => p.Id == id))
            {
                throw new PlantNotFoundException($"No existe una planta asociada a este id: '{id}'.");
            }

            await _crudOperationService.DeleteAsync(id);
        }

        public async Task UpdatePlantAsync(PlantDto plantDto)
        {
            if (! await _context.Plants.AnyAsync(p => p.Id == plantDto.id))
            {
                throw new PlantNotFoundException($"No existe una planta asociada a este id: '{plantDto.id}'.");
            }

            await _crudOperationService.UpdateAsync(plantDto);
        }

        public async Task<PlantDto> GetPlantByIdAsync(int id)
        {
            if (!await _context.Plants.AnyAsync(p => p.Id == id))
            {
                throw new PlantNotFoundException($"No existe una planta asociada a este id: '{id}'.");
            }

            var plant = await _crudOperationService.GetAsync(id);
            if (plant == null)
            {
                throw new PlantNotFoundException($"No se pudo acceder al registro.");
            }

            return plant;
        }



        public async Task<IEnumerable<PlantDto>> GetPlantsByFirstLetterAsync(string letter)
        {
            var plants = await _context.Plants
                .FromSqlRaw(
                    @"SELECT ""Id"", ""Name"", ""Monograph"" 
                    FROM ""Plants""
                    WHERE LEFT(unaccent(""Name""), 1) ILIKE unaccent({0}) 
                    AND ""State"" = 'updated'", 
                    letter)
                .Select(p => new PlantDto()
                {
                    id = p.Id,
                    name = p.Name,
                    genus = (string)p.Monograph["genus"],
                    species = (string)p.Monograph["species"],
                    subsp = (string)p.Monograph["subsp"],
                    authors = (string)p.Monograph["authors"]
                })
                .OrderBy(p => p.name)
                .ToListAsync();


            return plants;         
        }

        public async Task<IEnumerable<string>> GetAllPLantsAsync()
        {
            var plants = await _context.Plants
                .Where(p => p.State == "updated")
                .OrderBy(p => p.Name)
                .Select(plant => plant.Name)
                .ToListAsync();
            return plants;
        }
    }
}