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
        private readonly ICrudOperation<PlantDto, PlantDto> _crudOperationService;
        private readonly IDocumentVector _documentVectorService;
        private readonly IPlantSearch _plantSearchService;
        private readonly AppDbContext _context;

        public AdminService(ICrudOperation<PlantDto, PlantDto> crudOperationService, IDocumentVector documentVectorService, IPlantSearch plantSearchService, AppDbContext context)
        {
            _crudOperationService = crudOperationService;
            _documentVectorService = documentVectorService;
            _plantSearchService = plantSearchService;
            _context = context;
        }

        public async Task AddPlantAsync(PlantDto plantDto)
        {
            if (await _context.Plants
                    .FromSqlRaw(@"
                        SELECT 1 FROM ""Plants""
                        WHERE unaccent(""Name"") ILIKE unaccent({0}) LIMIT 1", plantDto.name)
                    .AnyAsync())
            {
                throw new PlantAlreadyExistsException($"Ya existe una planta con el nombre '{plantDto.name}'.");
            }

            await _crudOperationService.AddAsync(plantDto);
            await _documentVectorService.BuildDocumentVectorAsync();

        }

        public async Task DeletePlantAsync(int id)
        {
            if (! await _context.Plants.AnyAsync(p => p.Id == id))
            {
                throw new PlantNotFoundException($"No existe una planta asociada a este id: '{id}'.");
            }

            await _crudOperationService.DeleteAsync(id);
            await _documentVectorService.BuildDocumentVectorAsync();

        }

        public async Task UpdatePlantAsync(PlantDto plantDto)
        {
            if (! await _context.Plants.AnyAsync(p => p.Id == plantDto.id))
            {
                throw new PlantNotFoundException($"No existe una planta asociada a este id: '{plantDto.id}'.");
            }

            await _crudOperationService.UpdateAsync(plantDto);
            await _documentVectorService.BuildDocumentVectorAsync();

        }

        public async Task<PlantDto> GetPlantByIdAsync(int id)
        {
            if (! await _context.Plants.AnyAsync(p => p.Id == id))
            {
                throw new PlantNotFoundException($"No existe una planta asociada a este id: '{id}'.");
            }

            var plant =  await _crudOperationService.GetAsync(id);
            return plant;
            
        }

        public async Task<IEnumerable<ItemDto>> GetPlantsByFirstLetterAsync(string letter)
        {
            var plants = await _context.Plants
                .FromSqlRaw(
                    @"SELECT ""Id"", ""Name"" 
                    FROM ""Plants""
                    WHERE LEFT(unaccent(""Name""), 1) ILIKE unaccent({0})", letter)
                .Select(p => new ItemDto
                {
                    id = p.Id,
                    name = p.Name
                })
                .OrderBy(p => p.name)
                .ToListAsync();


            return plants;         
        }

        public async Task<IEnumerable<string>> GetAllPLantsAsync()
        {
            var plants = await _context.Plants
                .OrderBy(p => p.Name)
                .Select(plant => plant.Name)
                .ToListAsync();

            return plants;
        }
    }
}