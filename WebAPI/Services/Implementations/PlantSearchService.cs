using System.Text.Json;
using System.Text.RegularExpressions;
using Data;
using DataAccess;
using DataAccess.Interfaces;
using DataAccess.AuxClasses;
using Services.Interfaces;


namespace Services.Implementations
{
    public class PlantSearchService : IQuerySearch<string, Plant>
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

        public async Task<IEnumerable<Plant>> QuerySearchAsync(string query)
        {
            if (string.IsNullOrWhiteSpace(query))
                return Enumerable.Empty<Plant>();

            List<string> tokens = ProcessQuery(query);
            
            // find possible plants that match the query
            var searchResults = await _plantSearchService.SearchAsync(tokens);

            Dictionary<string, float> plantsRelevance = new Dictionary<string, float>();
            
            if (searchResults is IEnumerable<(string Key, List<TermValue> Terms)> searchPossibleMatches)
            {
                // for each possible search result, we build the query vector based on each result to calculate its relevance.
                foreach (var (plant, termValue) in searchPossibleMatches)
                {
                    List<string> terms = termValue.Select(tv => tv.Term).ToList();
                    List<float> documentVector = termValue.Select(tv => tv.Value).ToList();

                    List<float> queryVector = VectorizeQuery(tokens, terms);

                    float similarity = CalculateCosineSimilarity(documentVector, queryVector);

                    if(!plantsRelevance.Keys.Contains(plant))
                    {
                        plantsRelevance[plant] = similarity;
                    }
                }

                List<string> plantsName = plantsRelevance
                    .OrderByDescending(pair => pair.Value) 
                    .Take(10)                              
                    .Select(pair => pair.Key)              
                    .ToList();                             

                return await _plantSearchService.GetPlantsAsync(plantsName);
            }

            return Enumerable.Empty<Plant>();
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

