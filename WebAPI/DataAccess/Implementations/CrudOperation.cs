using DataAccess.Interfaces;
using Microsoft.EntityFrameworkCore;
using Data;
using Data.DTOs;
using DataAccess.TextProcessing;

namespace DataAccess.Implementations
{
    public class CrudOperations : ICrudOperation
    {
        private readonly AppDbContext _context;

        public CrudOperations(AppDbContext context)
        {
            _context = context;
        }

        // POST
        public async Task PostAsync(PlantDto plantDto)
        {
            var plant = new Plant
            {
                Name = plantDto.name,
                Monograph = MapPropertiesToMonograph(plantDto),
                Vector = Array.Empty<float>()
            };

            _context.Plants.Add(plant);
            await _context.SaveChangesAsync();

            // add the new terms and the plant-term relationship to the Terms and PlantTerms tables respectively
            TextProcessor textProcessor = new TextProcessor();
            textProcessor.ProcessPlantMonographs(new List<Plant> {plant});

            foreach (var item in textProcessor.DataProcessor)
            {
                string plantName = item.Key;
                (int totalWords, Dictionary<string, int> TokenOccurrences) = item.Value;

                foreach (var (token, count) in TokenOccurrences)
                {   
                    var term = _context.Terms.FirstOrDefault(p => p.Name == token);
                    if(term == null)
                    {
                        var newTerm = new Term
                        {
                            Name = token
                        };

                        _context.Terms.Add(newTerm);
                        await _context.SaveChangesAsync();
                        term = _context.Terms.FirstOrDefault(p => p.Name == token);
                    }

                    var register = new PlantTerm
                    {
                        PlantId = plant.Id,
                        Plant = plant,
                        TermId = term.Id,
                        Term = term,
                        TermOccurrences = count
                    };

                    _context.PlantTerms.Add(register);
                }

                await _context.SaveChangesAsync();  

            }
                
        }
        

        // DELETE
        public async Task DeleteAsync(int id)
        {
            var termCounts = await _context.PlantTerms
                .Where(pt => _context.PlantTerms
                    .Where(innerPt => innerPt.PlantId == id)
                    .Select(innerPt => innerPt.TermId)
                    .Contains(pt.TermId)) 
                .GroupBy(pt => pt.TermId) 
                .Select(g => new 
                {
                    TermId = g.Key,
                    DistinctPlantCount = g.Select(pt => pt.PlantId).Distinct().Count() 
                })
                .ToListAsync();

            foreach (var item in termCounts)
            {
                if (item.DistinctPlantCount == 1)
                {
                    var term = await _context.Terms.FirstOrDefaultAsync(t => t.Id == item.TermId);
                    _context.Terms.Remove(term);
                }
            }

            await _context.SaveChangesAsync();

            var plant = await _context.Plants.FirstOrDefaultAsync(p => p.Id == id);
            _context.Plants.Remove(plant);
            await _context.SaveChangesAsync();

        }


        // PUT
        public async Task UpdateAsync(PlantDto plantDto)
        {
            await DeleteAsync(plantDto.id);
            await PostAsync(plantDto);

        }


        private Dictionary<string, object> MapPropertiesToMonograph(PlantDto plantDto)
        {
            var monograph = new Dictionary<string, object>();

            var properties = typeof(PlantDto).GetProperties()
                .Skip(1); 

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

    }
}
