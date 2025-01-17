using Data;
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
                    .AnyAsync() || await _context.Terms.AnyAsync(t => t.Name == token))
                {
                    // if an exact match is found, retrieve plants by the exact term
                    plantsId = await GetPlantsByTermAsync(token);
                }
                else
                {
                    // if no exact match is found:

                    //search possible matches to plant names by calculating the Levenshtein distance
                    var aux1 = await GetPlantsByLevenshteinAsync(token);

                    // search plants using a trigram-based on all vocabulary terms
                    var aux2 = await GetPlantsByTrigramAsync(token);

                    plantsId = aux1.Union(aux2).ToHashSet();
                }
               
                searchPossibleMatches.UnionWith(plantsId);
            }

            return searchPossibleMatches;
        }


        private async Task<HashSet<int>> GetPlantsByTermAsync(string term)
        {
            var terms = await _context.Terms
                .FromSqlRaw(
                    @"SELECT * FROM ""Terms"" WHERE unaccent(""Name"") = unaccent({0})", 
                    term)
                .Include(t => t.PlantTerms) 
                .ToListAsync();

            var plantsId = terms
                .SelectMany(t => t.PlantTerms)
                .Select(pt => pt.PlantId)
                .Distinct()
                .ToHashSet();

            return plantsId;
        }

        private async Task<HashSet<int>> GetPlantsByLevenshteinAsync(string token)
        {
            var threshold = 2;  
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
            var terms = await _context.Terms
                .FromSqlRaw(
                    "SELECT * FROM \"Terms\" WHERE similarity(\"Name\", {0}) > {1}", 
                    token, similarityThreshold)
                .Include(t => t.PlantTerms) 
                .ToListAsync();;

            var plantsId = terms
                .SelectMany(t => t.PlantTerms)
                .Select(pt => pt.PlantId)
                .Distinct()
                .ToHashSet();

            return plantsId;
        }
    }
}
