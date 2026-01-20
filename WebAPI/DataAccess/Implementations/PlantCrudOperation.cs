using DataAccess.Interfaces;
using Microsoft.EntityFrameworkCore;
using Data;
using Data.DTOs;
using DataAccess.TextProcessing;

namespace DataAccess.Implementations
{
    public class PlantCrudOperations : BaseCrudOperations<PlantDto, PlantDto>
    {
        private readonly IPlantSearch _plantSearchService;

        private readonly AppDbContext _context;

        public PlantCrudOperations(IPlantSearch plantSearchService, AppDbContext context)
        {
            _plantSearchService = plantSearchService;

            _context = context;
        }

        // POST
        public override async Task AddAsync(PlantDto plantDto)
        {
            var plant = new Plant
            {
                Name = plantDto.name,
                Monograph = MapPropertiesToMonograph(plantDto),
                Vector = Array.Empty<float>(),
                State = "aggregated"
            };

            _context.Plants.Add(plant);
            await _context.SaveChangesAsync();
                
        }
        

        // DELETE
        public override async Task DeleteAsync(int id)
        {
            var plant = await _context.Plants.FirstOrDefaultAsync(p => p.Id == id);
            plant.State = "deleted";
            await _context.SaveChangesAsync();
        }


        // PUT
        public override async Task UpdateAsync(PlantDto plantDto)
        {
            var plant = await _context.Plants.FirstOrDefaultAsync(p => p.Id == plantDto.id);
            plant.State = "modified";

            var modifiedPlant = new ModificationPlant
            {
                PlantId = plantDto.id,
                Name = plantDto.name,
                Monograph = MapPropertiesToMonograph(plantDto)
            };

            _context.Modifications.Add(modifiedPlant);
            await _context.SaveChangesAsync();
        }


        private Dictionary<string, object> MapPropertiesToMonograph(PlantDto plantDto)
        {
            var monograph = new Dictionary<string, object>();

            var properties = typeof(PlantDto).GetProperties()
                .Skip(2); 

            foreach (var property in properties)
            {
                var value = property.GetValue(plantDto);

                if (value != null)
                {
                    if (property.PropertyType == typeof(string) && value is string stringValue)
                    {
                        monograph[property.Name] = stringValue;
                    }
                    else if (property.PropertyType == typeof(List<string>) && value is IEnumerable<string> stringCollection)
                    {
                        monograph[property.Name] = stringCollection.ToList();
                    }
                }
            }

            return monograph;
        }


        // GET
        public override async Task<PlantDto> GetAsync(int id)
        {
            var plant =  await _plantSearchService.GetPlantsAsync(new List<int> {id});
            
            if(plant.Count() > 0)
            {
                return plant.First();
            }
            else { return null; }
        }
    }
}
