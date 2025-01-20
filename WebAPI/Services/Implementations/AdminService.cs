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
        private readonly IDocumentVector _documentVectorService;
        private readonly IPlantSearch _plantSearchService;
        private readonly AppDbContext _context;

        public AdminService(ICrudOperation crudOperationService, IDocumentVector documentVectorService, IPlantSearch plantSearchService, AppDbContext context)
        {
            _crudOperationService = crudOperationService;
            _documentVectorService = documentVectorService;
            _plantSearchService = plantSearchService;
            _context = context;
        }

        public async Task AddPlantAsync(PlantDto plantDto)
        {
            string cleanName = plantDto.name.TrimEnd('*');

            var existPlant1 = await _context.Plants
                .FromSqlRaw(
                    "SELECT * FROM \"Plants\" WHERE unaccent(TRIM(TRAILING '*' FROM \"Name\")) = unaccent({0})",
                    cleanName)
                .AnyAsync();

            var existPlant2 = await _context.Plants
                .AnyAsync(p => EF.Functions.ILike(
                    p.Name.TrimEnd('*'), 
                    cleanName));


            if(existPlant1 || existPlant2)
            {
                throw new PlantAlreadyExistsException($"Ya existe una planta con el nombre '{plantDto.name}'.");
            }

            await _crudOperationService.PostAsync(plantDto);
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

        public async Task<IEnumerable<PlantDto>> GetPlantAsync(int id)
        {
            if (! await _context.Plants.AnyAsync(p => p.Id == id))
            {
                throw new PlantNotFoundException($"No existe una planta asociada a este id: '{id}'.");
            }

            return await _plantSearchService.GetPlantsAsync(new List<int> {id});
            
        }
    }
}