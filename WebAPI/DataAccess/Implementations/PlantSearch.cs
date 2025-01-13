using Data;
using DataAccess.Interfaces;
using Microsoft.EntityFrameworkCore;
using DataAccess.AuxClasses;
using Data.DTOs;
using System.Runtime.InteropServices;
using System.Dynamic;

namespace DataAccess.Implementations
{
    public class PlantSearch : IPlantSearch
    {
        private readonly AppDbContext _context;

        public PlantSearch(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<PlantDto>> GetPlantsAsync(IEnumerable<int> plantsId)
        {
            if (plantsId == null || !plantsId.Any())
            {
                return Enumerable.Empty<PlantDto>();
            }

            var plants = await _context.Plants
                .Where(plant => plantsId.Contains(plant.Id))
                .Select(plant => new
                {
                    plant.Id,
                    plant.Name,
                    plant.Monograph
                })
                .ToListAsync();

            var plantDtos = plants.Select(plant => new PlantDto
            {
                id = plant.Id,
                name = plant.Name,
                monograph = MapMonograph(plant.Monograph)
            }).ToList();

            return plantsId
                .Select(id => plantDtos.First(plant => plant.id == id)) 
                .ToList(); 
        }

        private MonographDto MapMonograph(Dictionary<string, object> monograph)
        {
            var monographDto = new MonographDto();
            var monographProperties = typeof(MonographDto).GetProperties();

            foreach (var property in monographProperties)
            {
                if (monograph.ContainsKey(property.Name))
                {
                    var value = monograph[property.Name];
                    
                    if (property.PropertyType == typeof(string) && value is string stringValue)
                    {
                        property.SetValue(monographDto, stringValue);
                    }
                    else if (value is IEnumerable<object> objectCollection)
                    {
                        var stringList = objectCollection.Select(o => o?.ToString()).ToList();
                        property.SetValue(monographDto, stringList);
                    }
                }
            }

            return monographDto;
        }

        // searches for possible matches based on user query tokens.
        public async Task<IEnumerable<(int PlantId, List<TermValue> TermValues)>> SearchAsync(IEnumerable<string> tokens)
        {
            if (tokens == null || !tokens.Any())
                return Enumerable.Empty<(int plantId, List<TermValue> termValue)>();

            var plantsWithValues = new List<(int plantId, List<TermValue> termValue)>();
            var plantsProcessed = new HashSet<int>();

            foreach (var token in tokens)
            {   
                HashSet<int> plantsId = new HashSet<int>();
                if (await _context.TermDocumentWeights
                    .FromSqlRaw(
                        "SELECT * FROM \"TermDocumentWeights\" WHERE unaccent(lower(\"Term\")) = unaccent(lower({0}))", 
                        token)
                    .AnyAsync())
                {
                    plantsId = await GetPlantsByTermAsync(token);
                }
                // if (await _context.TermDocumentWeights.AnyAsync(tdw => tdw.Term == token))
                // {
                //     // if an exact match is found, retrieve plants by the exact term
                //     plantsId = await GetPlantsByTermAsync(token);
                // }
                else
                {
                    // if no exact match is found:

                    //search possible matches to plant names by calculating the Levenshtein distance
                    var aux1 = await GetPlantsByLevenshteinAsync(token);

                    // search plants using a trigram-based on all vocabulary terms
                    var aux2 = await GetPlantsByTrigramAsync(token);

                    plantsId = aux1.Union(aux2).ToHashSet();
                }
                foreach (var id in plantsId)
                {
                    if (!plantsProcessed.Contains(id))
                    {
                        await AddPlantValuesAsync(plantsWithValues, id);
                        plantsProcessed.Add(id); 
                    }
                }
            }

            return plantsWithValues;
        }


        private async Task<HashSet<int>> GetPlantsByTermAsync(string term)
        {
            var plantsId = await _context.TermDocumentWeights
                .FromSqlRaw(
                    "SELECT DISTINCT \"PlantId\" FROM \"TermDocumentWeights\" WHERE unaccent(lower(\"Term\")) = unaccent(lower({0}))", 
                    term)
                .Select(tdw => tdw.PlantId)
                .Distinct()
                .ToHashSetAsync();

            return plantsId;
        }

        private async Task AddPlantValuesAsync(List<(int plantId, List<TermValue> termValue)> plantsWithValues, int plantId)
        {
            var plant = await _context.Plants
                .Where(p => p.Id == plantId)
                .Include(p => p.TermWeight)  
                .FirstOrDefaultAsync();

            if (plant != null)
            {
                var termValuePairs = plant.TermWeight
                    .Select(tdw => new TermValue { Term = tdw.Term, Value = tdw.Value })
                    .ToList();

                plantsWithValues.Add((plant.Id, termValuePairs));
            }
        }

        private async Task<HashSet<int>> GetPlantsByLevenshteinAsync(string token)
        {
            var threshold = 2;  
            var plants = await _context.Plants.ToListAsync();

            
            var plantsId = plants
                .AsEnumerable() 
                .Where(p => p.Name.ToLower()
                            .Split(' ')  
                            .Any(word => Math.Abs(word.Length - token.Length) <= 2 && LevenshteinDistance(token, word) <= threshold)) // Verificar cada palabra
                .Select(p => p.Id)
                .Distinct()
                .ToHashSet();

            return plantsId;
        }

        private int LevenshteinDistance(string source, string target)
        {
            var sourceLength = source.Length;
            var targetLength = target.Length;
            var distance = new int[sourceLength + 1, targetLength + 1];

            for (int i = 0; i <= sourceLength; distance[i, 0] = i++) { }
            for (int j = 0; j <= targetLength; distance[0, j] = j++) { }

            for (int i = 1; i <= sourceLength; i++)
            {
                for (int j = 1; j <= targetLength; j++)
                {
                    int cost = (target[j - 1] == source[i - 1]) ? 0 : 1;
                    distance[i, j] = Math.Min(
                        Math.Min(distance[i - 1, j] + 1, distance[i, j - 1] + 1),
                        distance[i - 1, j - 1] + cost);
                }
            }

            return distance[sourceLength, targetLength];
        }

        private async Task<HashSet<int>> GetPlantsByTrigramAsync(string token)
        {
            double similarityThreshold = 0.5; 
            var results = await _context.TermDocumentWeights
            .FromSqlRaw("SELECT * FROM \"TermDocumentWeights\" WHERE similarity(\"Term\", {0}) > {1}", token, similarityThreshold)
            .Select(tdw => tdw.PlantId)
            .ToHashSetAsync();

            return results;

        }
    }
}
