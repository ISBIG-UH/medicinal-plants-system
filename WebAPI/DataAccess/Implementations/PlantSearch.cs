using DataAccess.Interfaces;
using Microsoft.EntityFrameworkCore;
using Data.DTOs;

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

            var plantDtos = plants.Select(plant =>
            {
                var plantDto = new PlantDto
                {
                    id = plant.Id,
                    name = plant.Name
                };

                var mappedPlantDto = MapPropertiesFromMonograph(plant.Monograph, plantDto);

                return mappedPlantDto;
            }).ToList();

            return plantsId
                .Select(id => plantDtos.First(plant => plant.id == id))
                .ToList();
        }

        private PlantDto MapPropertiesFromMonograph(Dictionary<string, object> monograph, PlantDto plantDto)
        {
            var properties = typeof(PlantDto).GetProperties()
                .Skip(2); 

            foreach (var property in properties)
            {
                if (monograph.ContainsKey(property.Name))
                {
                    var value = monograph[property.Name];

                    if (property.PropertyType == typeof(string) && value is string stringValue)
                    {
                        property.SetValue(plantDto, stringValue);
                    }
                    else if (property.PropertyType == typeof(List<string>) && value is IEnumerable<object> objectCollection)
                    {
                        var stringList = objectCollection.Select(o => o?.ToString()).ToList();
                        property.SetValue(plantDto, stringList);
                    }
                }
            }

            return plantDto;
        }


        // searches for possible matches based on user query tokens.
        public async Task<HashSet<int>> SearchAsync(IEnumerable<string> tokens)
        {
            if (tokens == null || !tokens.Any())
                return new  HashSet<int>();

            var searchPossibleMatches = new HashSet<int>();

            foreach (var token in tokens)
            {   
                HashSet<int> plantsId = new HashSet<int>();
                if (await _context.Terms
                    .FromSqlRaw(
                        "SELECT * FROM \"Terms\" WHERE unaccent(\"Name\") = unaccent({0})", 
                        token)
                    .AnyAsync())
                {
                    // if an exact match is found, retrieve plants by the exact term
                    plantsId = await GetPlantsByTermAsync(token);
                }
               
                // if no exact match is found:

                // search possible matches to plant names by calculating the Levenshtein distance
                plantsId = plantsId.Union(await GetPlantsByLevenshteinAsync(token)).ToHashSet();
               
                // search plants using a trigram-based on all vocabulary terms
                plantsId = plantsId.Union(await GetPlantsByTrigramAsync(token)).ToHashSet();
                
               
                searchPossibleMatches.UnionWith(plantsId);
            }

            return searchPossibleMatches;
        }


        private async Task<HashSet<int>> GetPlantsByTermAsync(string term)
        {
            var plantsId = await _context.Terms
                .FromSqlRaw(
                    @"SELECT * FROM ""Terms"" WHERE unaccent(""Name"") = unaccent({0})", 
                    term)
                .Include(t => t.PlantTerms) 
                .SelectMany(t => t.PlantTerms)
                .Select(pt => pt.PlantId)
                .Distinct()
                .ToHashSetAsync();

            return plantsId;
        }


        private async Task<HashSet<int>> GetPlantsByLevenshteinAsync(string token)
        {
            var threshold = 3;  
            var plants = await _context.Plants.ToListAsync();
            
            var plantsId = plants
                .AsEnumerable() 
                .Where(p => p.Name.ToLower()
                            .Split(' ')  
                            .Any(word => Math.Abs(word.Length - token.Length) <= 2 && LevenshteinDistance(token, word) <= threshold)) 
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

            var plantsId = await _context.Terms
                .FromSqlRaw(
                    "SELECT * FROM \"Terms\" WHERE similarity(\"Name\", {0}) > {1}", 
                    token, similarityThreshold)
                .Include(t => t.PlantTerms) 
                 .SelectMany(t => t.PlantTerms)
                .Select(pt => pt.PlantId)
                .Distinct()
                .ToHashSetAsync();

            return plantsId;
        }
    }
}
