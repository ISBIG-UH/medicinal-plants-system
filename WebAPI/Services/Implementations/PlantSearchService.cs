using System.Text.Json;
using System.Text.RegularExpressions;
using DataAccess;
using DataAccess.Interfaces;
using DataAccess.AuxClasses;
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
            
            if (searchResults is HashSet<int> searchPossibleMatches)
            {
                int totalDocumentos = _context.Plants.Count();

                // for each possible search result, we build the query vector based on each result to calculate its relevance.
                foreach (var id in searchPossibleMatches)
                {
                    float[] documentVector = (await _context.Plants
                        .Where(p => p.Id == id)
                        .Select(p => p.Vector)
                        .FirstOrDefaultAsync())?.ToArray();

                    float[] queryVector = await VectorizeQuery(tokens, totalDocumentos);

                    float similarity = queryVector.Any(item => item != 0) 
                        ? CalculateCosineSimilarity(documentVector, queryVector) 
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
            return Regex.Matches(query, @"\w+")
                        .Select(match => match.Value.ToLower())
                        .Where(token => !_stopWords.Contains(token))
                        .GroupBy(token => token)
                        .ToDictionary(group => group.Key, group => group.Count());
        }


        private async Task<float[]> VectorizeQuery(Dictionary<string, int> tokenFrequencies, int totalDocumentos)
        {
            int lenVocabulary = await _context.Terms.CountAsync();
            
            // Verificar si existen términos en la base de datos
            if (!tokenFrequencies.Keys.Any(term => _context.Terms.Any(t => t.Name == term)))
            {
                return new float[lenVocabulary];
            }

            // Crear un arreglo de vector con valores por defecto (0)
            float[] queryVector = new float[lenVocabulary];

            // Cargar todos los términos y sus correspondientes counts en una sola consulta
            var termCounts = await _context.PlantTerms
                .GroupBy(pt => pt.TermId)
                .Select(g => new { TermId = g.Key, Count = g.Count() })
                .ToListAsync();

            // Crear un diccionario para acceso rápido a la cantidad de apariciones por TermId
            var termCountDict = termCounts.ToDictionary(tc => tc.TermId, tc => tc.Count);

            // Total de tokens
            int totalTokens = tokenFrequencies.Count;

            // Iterar sobre los términos y calcular el TF-IDF
            int index = 0;
            foreach (var item in _context.Terms)
            {
                // Calcular TF (frecuencia de término)
                double tf = tokenFrequencies.ContainsKey(item.Name) ? (double)tokenFrequencies[item.Name] / totalTokens : 0;

                // Calcular IDF (frecuencia inversa de documento)
                int count = termCountDict.ContainsKey(item.Id) ? termCountDict[item.Id] : 0;
                double idf = count > 0 ? (double)Math.Log(totalDocumentos / (count + 1)) : 0;

                // Asignar el valor calculado en el vector
                queryVector[index] = (float)(tf * idf);
                index++;
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

