using System.Text.Json;
using System.Text.RegularExpressions;
using Data;

namespace DataAccess.TextProcessing
{
    public class TextProcessor
    {
        // for each document, the total number of words is stored, and for each word, the count of its occurrences
        public Dictionary<string, (int TotalWords, Dictionary<string, int> TokenOccurrences)> DataProcessor { get; private set; }
        
        // for each term, the list of documents in which it appears is stored
        public Dictionary<string, List<string>> TermDocumentRelationship { get; private set; }

        private List<string> stopWords { get; set; }

        public TextProcessor()
        {
            DataProcessor = new Dictionary<string, (int, Dictionary<string, int>)>();
            TermDocumentRelationship = new Dictionary<string, List<string>>();

            string basePath = AppDomain.CurrentDomain.BaseDirectory;

            string stopWordsFilePath = Path.Combine(basePath, "Resources", "stop_words.json");
            var stopWordsJson = File.ReadAllText(stopWordsFilePath);
            stopWords = JsonSerializer.Deserialize<List<string>>(stopWordsJson) ?? new List<string>();

        }
        public void ProcessPlantMonographs(IEnumerable<Plant> plants)
        {
            foreach (var item in plants)
            {
                var tokenCounter = new Dictionary<string, int>();
                
                string normalizedPlantName = item.Name.ToLower();
                tokenCounter[normalizedPlantName] = 1;
                int totalWords = 1;

                if (!TermDocumentRelationship.ContainsKey(normalizedPlantName))
                {
                    TermDocumentRelationship[normalizedPlantName] = new List<string>();
                }
                if (!TermDocumentRelationship[normalizedPlantName].Contains(item.Name))
                {
                    TermDocumentRelationship[normalizedPlantName].Add(item.Name);
                }

                foreach (var (property, value) in item.Monograph)
                {
                    string text = value is string stringValue
                        ? stringValue.ToLower() 
                        : value is IEnumerable<object> objectCollection
                            ? string.Join(" ", objectCollection.Select(o => o?.ToString().ToLower()).ToList())
                            : string.Empty;

                    totalWords += TokenizeAndCount(text, tokenCounter, item.Name);
                }

                DataProcessor[item.Name] = (totalWords, tokenCounter);
            }

        }

        // this method tokenizes the input text, counts the frequency of each token,
        // and updates the term-document relationship, associating each term with the documents (plant names) in which it appears.
        private int TokenizeAndCount(string text, Dictionary<string, int> tokenCounter, string plantName)
        {
            int totalWords = 0;
            var tokens = text.Split(new[] { ' ', ',', '.', ';', ':', '(', ')'}, StringSplitOptions.RemoveEmptyEntries);

            foreach (var token in tokens)
            {
                if (!stopWords.Contains(token) && Regex.IsMatch(token, @"^[a-záéíóúñ]{3,}$"))
                {
                    if (tokenCounter.ContainsKey(token))
                    {
                        tokenCounter[token]++;
                        totalWords++;
                    }
                    else
                    {
                        tokenCounter[token] = 1;
                        totalWords++;
                    }

                    if (!TermDocumentRelationship.ContainsKey(token))
                    {
                        TermDocumentRelationship[token] = new List<string>(); 
                    }

                    if (!TermDocumentRelationship[token].Contains(plantName))
                    {
                        TermDocumentRelationship[token].Add(plantName); 
                    }
                }
            }

            return totalWords;
        }
    }
}
