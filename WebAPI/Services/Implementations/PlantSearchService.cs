using System.Text.Json;
using System.Text.RegularExpressions;
using DataAccess;
using DataAccess.Interfaces;
using DataAccess.AuxClasses;
using Services.Interfaces;
using Data.DTOs;


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

            List<string> tokens = ProcessQuery(query);
            
            // find possible plants that match the query
            var searchResults = await _plantSearchService.SearchAsync(tokens);

            Dictionary<int, float> plantsRelevance = new Dictionary<int, float>();
            
            if (searchResults is IEnumerable<(int Key, List<TermValue> Terms)> searchPossibleMatches)
            {
                // for each possible search result, we build the query vector based on each result to calculate its relevance.
                foreach (var (plantId, termValue) in searchPossibleMatches)
                {
                    List<string> terms = termValue.Select(tv => tv.Term).ToList();
                    List<float> documentVector = termValue.Select(tv => tv.Value).ToList();

                    List<float> queryVector = VectorizeQuery(tokens, terms);

                    float similarity = CalculateCosineSimilarity(documentVector, queryVector);

                    if(!plantsRelevance.Keys.Contains(plantId))
                    {
                        plantsRelevance[plantId] = similarity;
                    }
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

        private List<string> ProcessQuery(string query)
        {
            return Regex.Matches(query, @"\w+")
                        .Select(match => match.Value.ToLower())
                        .Where(token => !_stopWords.Contains(token))
                        .ToList();
        }

        private List<float> VectorizeQuery(List<string> tokens, List<string> terms)
        {
            var termFrequencies = new Dictionary<string, int>();

            var queryVector = new List<float>(new float[terms.Count()]);

            foreach (var token in tokens)
            {
                if (termFrequencies.ContainsKey(token))
                    termFrequencies[token]++;
                else
                    termFrequencies[token] = 1;
            }

            int totalTokens = tokens.Count();

            for (int i = 0; i < terms.Count(); i++)
            {
                string term = terms[i];
                float tf = termFrequencies.ContainsKey(term) ? (float)termFrequencies[term] / totalTokens : 0;
                
                int totalDocumentos = _context.Plants.Count();
                int termFrequency = _context.TermDocumentWeights.Count(tf => tf.Term == term);

                float idf = termFrequency > 0 ? (float)Math.Log((float)totalDocumentos / termFrequency + 1) : 0;

                queryVector[i] = tf * idf;
            }

            return queryVector;
        }

        private float CalculateCosineSimilarity(List<float> vectorA, List<float> vectorB)
        {
            if (vectorA.Count != vectorB.Count)
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

