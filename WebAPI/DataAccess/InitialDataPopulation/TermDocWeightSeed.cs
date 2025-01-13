using Data;
using DataAccess.TextProcessing;

namespace DataAccess.InitialDataPopulation
{
    public class TermDocWeightSeed
    {
        private readonly AppDbContext _context;
       
        public TermDocWeightSeed(AppDbContext context)
        {
            _context = context;

        }

        public async Task SeedTFIDFDataAsync()
        {
            if (!_context.TermDocumentWeights.Any())
            {
                TextProcessor textProcessor = new TextProcessor();

                var plants = _context.Plants.ToList();

                textProcessor.ProcessPlantMonographs(plants);
                
                var tfidfData = new List<TFIDF_Weights>();
                int batchSize = 1000; 
                int counter = 0;

                foreach (var item in textProcessor.DataProcessor)
                {
                    try
                    {
                        string plantName = item.Key;
                        (int totalWords, Dictionary<string, int> TokenOccurrences) = item.Value;

                        var plant = _context.Plants.FirstOrDefault(p => p.Name == plantName);
                        plant.TotalWords = totalWords;

                        foreach (var (token, count) in TokenOccurrences)
                        {
                            var register = new TFIDF_Weights
                            {
                                Term = token,
                                TermCount = count,
                                PlantId = plant.Id,
                                Value = (float)CalculateTFIDF(count, totalWords, textProcessor.DataProcessor.Count, token, textProcessor.TermDocumentRelationship),
                                Plant = plant
                            };

                            plant.TermWeight.Add(register);
                            
                            tfidfData.Add(register);
                            counter++;

                            if (counter >= batchSize)
                            {
                                await InsertBatchAsync(tfidfData);
                                tfidfData.Clear(); 
                                counter = 0;
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"❌ Error al agregar la planta '{item.Key}': {ex.Message}");
                    }
                }

                if (tfidfData.Any())
                {
                    try
                    {
                        await InsertBatchAsync(tfidfData);
                        Console.WriteLine("✅ Todos los datos de termsDocuments insertados correctamente.");
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"❌ Error al guardar los datos de platermsDocumentsntas en la base de datos: {ex.Message}");
                    }
                }
            }
        }

        private double CalculateTFIDF(int tokenCount, int totalWords, int totalDocuments, string term, Dictionary<string, List<string>> termDocumentRelationship)
        {
            double tf = (double)tokenCount / totalWords;

            double idf = (double)Math.Log(totalDocuments / termDocumentRelationship[term].Count() + 1);

            return tf * idf;
        }

        private async Task InsertBatchAsync(List<TFIDF_Weights> tfidfData)
        {
            try
            {
                await _context.TermDocumentWeights.AddRangeAsync(tfidfData);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Error al insertar el lote: {ex.Message}");
            }
        }
    }
}
