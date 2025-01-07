using Data;
using DataAccess.Interfaces;
using Microsoft.EntityFrameworkCore;
using DataAccess.AuxClasses;

namespace DataAccess.Implementations
{
    public class PlantSearch : IPlantSearch
    {
        private readonly AppDbContext _context;

        public PlantSearch(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Plant>> GetPlantsAsync(IEnumerable<string> plantNames)
        {
            if (plantNames == null || !plantNames.Any())
            {
                return Enumerable.Empty<Plant>();
            }

            var plants = await _context.Plants
                .Where(plant => plantNames.Contains(plant.Name))  
                .ToListAsync(); 

            return plants;         
        }

        
        // Searches for possible matches based on user query tokens.
        public async Task<IEnumerable<(string PlantName, List<TermValue> TermValues)>> SearchAsync(IEnumerable<string> tokens)
        {
            if (tokens == null || !tokens.Any())
                return Enumerable.Empty<(string plantName, List<TermValue> termValue)>();

            var plantsWithValues = new List<(string plant, List<TermValue> termValue)>();
            var plantsProcessed = new HashSet<string>();

            foreach (var token in tokens)
            {   
                List<string> plantsName = new List<string>();

                if (await _context.TermDocumentWeights.AnyAsync(tdw => tdw.Term == token))
                {
                    plantsName = await GetPlantsByTermAsync(token);
                    foreach (var item in plantsName)
                    {
                        if (!plantsProcessed.Contains(item))
                        {
                            await AddPlantValuesAsync(plantsWithValues, item);
                            plantsProcessed.Add(item); 
                        }
                    }
                }
                else
                {
                    plantsName = await GetPlantsByLevenshteinAsync(token);
                    foreach (var item in plantsName)
                    {
                        if (!plantsProcessed.Contains(item))
                        {
                            await AddPlantValuesAsync(plantsWithValues, item);
                            plantsProcessed.Add(item);  
                        }
                    }
                }
            }

            return plantsWithValues;
        }


        private async Task<List<string>> GetPlantsByTermAsync(string term)
        {
            var plant = await _context.TermDocumentWeights
                .Where(tdw => tdw.Term == term)
                .Select(tdw => tdw.PlantName)
                .Distinct()
                .ToListAsync();

            return plant;
        }

        private async Task AddPlantValuesAsync(List<(string plant, List<TermValue> termValue)> plantsWithValues, string plantName)
        {
            var termValuePairs = await _context.TermDocumentWeights
                .Where(tdw => tdw.PlantName == plantName)
                .Select(tdw => new TermValue { Term = tdw.Term, Value = tdw.Value })
                .ToListAsync();

            plantsWithValues.Add((plantName, termValuePairs));
        }

        private async Task<List<string>> GetPlantsByLevenshteinAsync(string token)
        {
            var threshold = 6;  
            var tdw = await _context.TermDocumentWeights
                .ToListAsync();

            var plants = tdw
                .AsEnumerable() 
                .Where(p => Math.Abs(p.Term.Length - token.Length) <= 6 && LevenshteinDistance(token, p.Term) <= threshold)
                .Select(p => p.PlantName)
                .Distinct()
                .ToList();

            return plants;
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
    }
}
