using DataAccess.Interfaces;
using Microsoft.EntityFrameworkCore;
using Data;
using DataAccess.TextProcessing;

namespace DataAccess.Implementations
{
    public class DatabaseUpdate : BaseCrudOperations<Plant, Plant>
    {
        private readonly AppDbContext _context;

        public DatabaseUpdate(AppDbContext context)
        {
            _context = context;
        }

        // POST
        public override async Task AddAsync(Plant plant)
        {
            await AddTerms(plant);
        }
        

        // DELETE
        public override async Task DeleteAsync(int id)
        {
            await DeleteTerms(id);

            var plant = await _context.Plants.FirstOrDefaultAsync(p => p.Id == id);
            _context.Plants.Remove(plant);
            await _context.SaveChangesAsync();
        }


        // PUT
        public override async Task UpdateAsync(Plant plant)
        {
            await DeleteTerms(plant.Id);

            var modificatedPlant = await _context.Modifications.FirstOrDefaultAsync(p => p.PlantId == plant.Id);
            
            if (modificatedPlant != null)
            {
                plant.Name = modificatedPlant.Name;
                
                if (modificatedPlant.Monograph != null)
                {
                    plant.Monograph = new Dictionary<string, object>(modificatedPlant.Monograph);
                }

                await AddTerms(plant);

                _context.Modifications.Remove(modificatedPlant);
                await _context.SaveChangesAsync();
            }
        }


        private async Task DeleteTerms(int id)
        {
            var termCounts = await _context.PlantTerms
                .Where(pt => _context.PlantTerms
                    .Where(innerPt => innerPt.PlantId == id)
                    .Select(innerPt => innerPt.TermId)
                    .Contains(pt.TermId)) 
                .GroupBy(pt => pt.TermId) 
                .Select(g => new 
                {
                    TermId = g.Key,
                    DistinctPlantCount = g.Select(pt => pt.PlantId).Distinct().Count() 
                })
                .ToListAsync();

            foreach (var item in termCounts)
            {
                if (item.DistinctPlantCount == 1)
                {
                    var term = await _context.Terms.FirstOrDefaultAsync(t => t.Id == item.TermId);
                    _context.Terms.Remove(term);
                }
            }

            await _context.SaveChangesAsync();  

        }


        private async Task AddTerms(Plant plant)
        {
            // add the new terms and the plant-term relationship to the Terms and PlantTerms tables respectively
            TextProcessor textProcessor = new TextProcessor();
            textProcessor.ProcessPlantMonographs(new List<Plant> {plant});

            foreach (var item in textProcessor.DataProcessor)
            {
                string plantName = item.Key;
                Dictionary<string, int> TokenOccurrences = item.Value;

                foreach (var (token, count) in TokenOccurrences)
                {   
                    var term = _context.Terms.FirstOrDefault(p => p.Name == token);
                    if(term == null)
                    {
                        var newTerm = new Term
                        {
                            Name = token
                        };

                        _context.Terms.Add(newTerm);
                        await _context.SaveChangesAsync();
                        term = _context.Terms.FirstOrDefault(p => p.Name == token);
                    }

                    if (! await _context.PlantTerms.AnyAsync(pt => pt.PlantId == plant.Id && pt.TermId == term.Id))
                    {
                        var register = new PlantTerm
                        {
                            PlantId = plant.Id,
                            Plant = plant,
                            TermId = term.Id,
                            Term = term,
                            TermOccurrences = count
                        };

                        _context.PlantTerms.Add(register);
                    }
                }

                await _context.SaveChangesAsync();  

            }
        }
    }
}
