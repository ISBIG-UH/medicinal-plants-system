using System.Text.Json;
using System.Text.RegularExpressions;
using DataAccess;
using DataAccess.Interfaces;
using Services.Interfaces;
using Data.DTOs;
using Microsoft.EntityFrameworkCore;


namespace Services.Implementations
{
    public class PlantSearchService : IQuerySearch<string, PlantDto>
    {
        private readonly IPlantSearch _plantSearchService;
        private readonly List<string> _stopWords;
        private readonly AppDbContext _context;

        public PlantSearchService(IPlantSearch plantSearchService, AppDbContext context)
        {
            _plantSearchService = plantSearchService;

            string basePath = AppDomain.CurrentDomain.BaseDirectory;
            var _stopWordsFilePath = Path.Combine(basePath, "Resources", "stop_words.json");
            var stopWordsJson = File.ReadAllText(_stopWordsFilePath);
            _stopWords = JsonSerializer.Deserialize<List<string>>(stopWordsJson) ?? new List<string>();

            _context = context;
        }

        public async Task<IEnumerable<PlantDto>> QuerySearchAsync(string query)
        {
            if (string.IsNullOrWhiteSpace(query))
                return Enumerable.Empty<PlantDto>();
            
            Dictionary<string, int> tokens = ProcessQuery(query);
            
            // find possible plants that match the query
            var searchResults = await _plantSearchService.SearchAsync(tokens.Keys);

            Dictionary<int, float> plantsRelevance = new Dictionary<int, float>();
            
            if (searchResults is HashSet<int> searchPossibleMatches && searchResults.Count() > 0)
            {
                var plants = await _context.Plants.ToListAsync();
                int totalPlants = plants.Count();
                
                // get all terms and their occurrence counts in the document collection
                var termCounts = await _context.PlantTerms
                .GroupBy(pt => pt.TermId)
                .Select(g => new { TermId = g.Key, Count = g.Count() })
                .ToListAsync();
                var termCountDict = termCounts.ToDictionary(tc => tc.TermId, tc => tc.Count);

                // map list of terms and assign them to a list with their indexes
                var terms = await _context.Terms.ToListAsync();
                var termsWithIndex = terms
                    .Select((term, index) => (term.Name, term.Id, Index: index))  
                    .ToList();

                // for each possible search result, we build the query vector based on each result to calculate its relevance.
                foreach (var id in searchResults)
                {
                    float[] plantVector = plants
                        .Where(p => p.Id == id)
                        .Select(p => p.Vector)
                        .FirstOrDefault();

                    float[] queryVector = await VectorizeQuery(tokens, totalPlants, plantVector.Length, termCountDict, termsWithIndex);

                    float similarity = (queryVector.Length > 0)
                        ? CalculateCosineSimilarity(plantVector, queryVector) 
                        : 0;

                    plantsRelevance[id] = similarity;
                    
                }

                List<int> plantsId = plantsRelevance
                    .OrderByDescending(pair => pair.Value) 
                    .Take(10)                              
                    .Select(pair => pair.Key)              
                    .ToList();                             

                return await _plantSearchService.GetPlantsAsync(plantsId);
            }

            return Enumerable.Empty<PlantDto>();
        }

        private Dictionary<string, int> ProcessQuery(string query)
        {
            return Regex.Matches(query, @"\w+\*?")
                        .Select(match => match.Value.ToLower())
                        .Where(token => !_stopWords.Contains(token))
                        .GroupBy(token => token)
                        .ToDictionary(group => group.Key, group => group.Count());
        }


        private async Task<float[]> VectorizeQuery(Dictionary<string, int> tokenFrequencies, int totalDocumentos, int lenVocabulary, Dictionary<int, int> termCountDict, List<(string Name, int Id, int Index)> termsWithIndex)
        {
            if (!tokenFrequencies.Keys.Any(term => _context.Terms.Any(t => t.Name == term)))
            {
                return new float[0];
            }

            float[] queryVector = new float[lenVocabulary];

            int totalTokens = tokenFrequencies.Sum(x => x.Value);

            foreach (var item in tokenFrequencies.Keys)
            {
                var term = termsWithIndex.FirstOrDefault(t => t.Name == item);
                
                if (term.Name != null)  
                {
                    double tf = (double)tokenFrequencies[item] / totalTokens;

                    int count = termCountDict.GetValueOrDefault(term.Id, 0); 
                    double idf = (double)Math.Log(totalDocumentos / (count + 1));

                    queryVector[term.Index] = (float)(tf * idf);
                }
            }

            return queryVector;
        }


        private float CalculateCosineSimilarity(float[] vectorA, float[] vectorB)
        {
            if (vectorA.Length != vectorB.Length)
                throw new ArgumentException("Los vectores tienen que tener la misma longitud.");

            float dotProduct = vectorA.Zip(vectorB, (a, b) => a * b).Sum();

            float magnitudeA = (float)Math.Sqrt(vectorA.Sum(a => a * a));
            float magnitudeB = (float)Math.Sqrt(vectorB.Sum(b => b * b));

            if (magnitudeA == 0 || magnitudeB == 0)
                return 0;

            return dotProduct / (magnitudeA * magnitudeB);
        }
    }

}

