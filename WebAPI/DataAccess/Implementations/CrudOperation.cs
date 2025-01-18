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

        public async Task PostAsync(PlantDto plantDto)
        {
            var plant = new Plant
            {
                Name = plantDto.name,
                Monograph = MapPropertiesToMonograph(plantDto)
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

            // recalculate vectors
            var plants = await _context.Plants.ToListAsync();
            var plantTerms = await _context.PlantTerms.ToListAsync();
            var terms = await _context.Terms.Select(id => id.Id).ToListAsync();
            var termsWithIndex = terms
                .Select((Id, index) => (Id, Index: index))
                .ToList();

            DocumentVector  documentVector = new DocumentVector();

            foreach (var item in plants)
            {
                float[] vector = documentVector.BuildDocumentVectorAsync(item, plantTerms, termsWithIndex, plants.Count());
                plant.Vector = vector;
            }

            await _context.SaveChangesAsync();
                
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
