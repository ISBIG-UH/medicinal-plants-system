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
            if (! await _context.PlantTerms.AnyAsync())
            {
                TextProcessor textProcessor = new TextProcessor();
                var plants = await _context.Plants.ToListAsync();
                textProcessor.ProcessPlantMonographs(plants);
                
                await SeedTermsAsync(textProcessor.TermDocumentRelationship.Keys.ToList());

                var relationship = new List<PlantTerm>();
                int batchSize = 1000; 
                int counter = 0;

                foreach (var item in textProcessor.DataProcessor)
                {
                    string plantName = item.Key;
                    (int totalWords, Dictionary<string, int> TokenOccurrences) = item.Value;

                    // var plant = await _context.Plants.FirstOrDefaultAsync(p => p.Name == plantName);
                    var plant = plants.FirstOrDefault(x => x.Name == plantName);


                    foreach (var (token, count) in TokenOccurrences)
                    {   
                        var term = _context.Terms.FirstOrDefault(p => p.Name == token);
                        var register = new PlantTerm
                        {
                            PlantId = plant.Id,
                            Plant = plant,
                            TermId = term.Id,
                            Term = term,
                            TermOccurrences = count
                        };

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

                if(counter > 0)
                {
                    await _context.PlantTerms.AddRangeAsync(relationship);
                    await _context.SaveChangesAsync();
                }


                await UpdateDocumentVector(plants);

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

        private async Task UpdateDocumentVector(List<Plant> plants)
        {
            var plantTerms = await _context.PlantTerms.ToListAsync();
            var terms = await _context.Terms.Select(id => id.Id).ToListAsync();
            var termsWithIndex = terms
                .Select((Id, index) => (Id, Index: index))
                .ToList();

            DocumentVector  documentVector = new DocumentVector();

            foreach (var plant in plants)
            {
                float[] vector = documentVector.BuildDocumentVectorAsync(plant, plantTerms, termsWithIndex, plants.Count());
                plant.Vector = vector;
            }

            await _context.SaveChangesAsync();

        }

    }

}