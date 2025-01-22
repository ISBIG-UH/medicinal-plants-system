using System.Text.Json;
using System.Text.RegularExpressions;
using Data;

namespace DataAccess.TextProcessing
{
    public class TextProcessor
    {
        // for each document, the total number of words is stored, and for each word, the count of its occurrences
        public Dictionary<string, Dictionary<string, int>> DataProcessor { get; private set; }
        
        // for each term, the list of documents in which it appears is stored
        public Dictionary<string, List<string>> TermDocumentRelationship { get; private set; }

        private List<string> stopWords { get; set; }

        public TextProcessor()
        {
            DataProcessor = new Dictionary<string, Dictionary<string, int>>();
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

                TokenizeAndCount(normalizedPlantName, tokenCounter, item.Name);

                foreach (var (property, value) in item.Monograph)
                {
                    string text = value is string stringValue
                        ? stringValue.ToLower() 
                        : value is IEnumerable<object> objectCollection
                            ? string.Join(" ", objectCollection.Select(o => o?.ToString().ToLower()).ToList())
                            : string.Empty;

                    TokenizeAndCount(text, tokenCounter, item.Name);
                }

                DataProcessor[item.Name] = tokenCounter;
            }

        }

        // this method tokenizes the input text and updates the term-document relationship, 
        // associating each term with the documents (plant names) in which it appears.
        private void TokenizeAndCount(string text, Dictionary<string, int> tokenCounter, string plantName)
        {
            var tokens = text.Split(new[] { ' ', ',', '.', ';', ':', '(', ')'}, StringSplitOptions.RemoveEmptyEntries);

            foreach (var token in tokens)
            {
                if (!stopWords.Contains(token) && Regex.IsMatch(token, @"^[a-záéíóúñ]{3,}$"))
                {
                    if (tokenCounter.ContainsKey(token))
                    {
                        tokenCounter[token]++;
                    }
                    else
                    {
                        tokenCounter[token] = 1;
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

        }
    }
}
