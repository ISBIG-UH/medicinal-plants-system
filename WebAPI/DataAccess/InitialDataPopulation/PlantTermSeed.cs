using Data;
using DataAccess.TextProcessing;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.InitialDataPopulation
{
    public class PlantTermSeed
    {
        private readonly AppDbContext _context;

        public PlantTermSeed(AppDbContext context)
        {
            _context = context;
        }

        public async Task SeedPlantTermRelationshipAsync()
        {
            if (!_context.PlantTerms.Any())
            {
                TextProcessor textProcessor = new TextProcessor();
                var plants = _context.Plants.ToList();
                textProcessor.ProcessPlantMonographs(plants);
                
                await SeedTermsAsync(textProcessor.TermDocumentRelationship.Keys.ToList());

                var relationship = new List<PlantTerm>();
                int batchSize = 2000; 
                int counter = 0;

                foreach (var item in textProcessor.DataProcessor)
                {
                    string plantName = item.Key;
                    (int totalWords, Dictionary<string, int> TokenOccurrences) = item.Value;

                    var plant = _context.Plants.FirstOrDefault(p => p.Name == plantName);

                    foreach (var (token, count) in TokenOccurrences)
                    {   
                        // bool termExists = await _context.Terms.AnyAsync(t => t.Name == token);
                        // if (!termExists)
                        // {
                        //     var newTerm = new Term
                        //     {
                        //         Name = token
                        //     };

                        //     await _context.Terms.AddAsync(newTerm);
                        //     await _context.SaveChangesAsync();
                        // }

                        var term = _context.Terms.FirstOrDefault(p => p.Name == token);
                        var register = new PlantTerm
                        {
                            PlantId = plant.Id,
                            Plant = plant,
                            TermId = term.Id,
                            Term = term,
                            TermOccurrences = count
                        };

                        plant.PlantTerms.Add(register);
                        term.PlantTerms.Add(register);
                        relationship.Add(register);
                        counter++;

                        if (counter >= batchSize)
                        {
                            await _context.PlantTerms.AddRangeAsync(relationship);
                            await _context.SaveChangesAsync();
                            relationship.Clear(); 
                            counter = 0;
                        }

                    }
                }

                if(relationship.Any())
                {
                    await _context.PlantTerms.AddRangeAsync(relationship);
                    await _context.SaveChangesAsync();
                }
                // if(counter > 0)
                // {
                //     await _context.SaveChangesAsync();
                // }

                DocumentVector  documentVector = new DocumentVector(_context);
                documentVector.BuildDocumentVectorAsync();

            }
        }

        private async Task SeedTermsAsync(List<string> vocabulary)
        {
            var data = new List<Term>();
            int batchSize = 1000; 
            int counter = 0;

            foreach (var item in vocabulary)
            {
                var register = new Term
                {
                    Name = item
                };

                data.Add(register);
                counter++;

                if (counter >= batchSize)
                {
                    await _context.Terms.AddRangeAsync(data);
                    await _context.SaveChangesAsync();
                    data.Clear(); 
                    counter = 0;
                }
            }

            if(data.Any())
            {
                await _context.Terms.AddRangeAsync(data);
                await _context.SaveChangesAsync();
            }
            
        }

    }

}