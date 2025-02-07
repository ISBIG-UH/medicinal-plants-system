
using Data;
using DataAccess.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Implementations;

public class DocumentVector: IDocumentVector
{
    private readonly AppDbContext _context;
    public DocumentVector(AppDbContext context) 
    {
        _context = context;
    }
    
    public async Task BuildDocumentVectorAsync()
    {
        var plants = await _context.Plants.ToListAsync();
        var plantTerms = await _context.PlantTerms.ToListAsync();
        var terms = await _context.Terms.Select(id => id.Id).ToListAsync();
        var termsWithIndex = terms
            .Select((Id, index) => (Id, Index: index))
            .ToList();
        int totalPlants = plants.Count();

        foreach (var plant in plants)
        {
            var relationship = plant.PlantTerms;

            int totalWords = relationship.Sum(o => o.TermOccurrences);
                                
            int[] arrayTerms = relationship.Select(p => p.TermId).ToArray();

            float[] vector = new float[termsWithIndex.Count()];

            for (int i = 0; i < arrayTerms.Length; i++)
            {
                int itemId = arrayTerms[i];

                int totalOccuurences =  plantTerms
                    .Where(pt => pt.TermId == itemId) 
                    .Count(); 

                var termOccurrences = relationship
                    .Where(p => p.TermId == itemId)  
                    .Select(p => p.TermOccurrences)  
                    .FirstOrDefault(); 

                float tf_idf = (float)CalculateTFIDF(termOccurrences, totalWords, totalPlants, totalOccuurences);
                var position = termsWithIndex.FirstOrDefault(p => p.Id == itemId);
                vector[position.Index] = tf_idf;
            }

            plant.Vector = vector;
        
        }

        await _context.SaveChangesAsync();
          
    }

  
    private double CalculateTFIDF(int tokenCount, int totalWords, int totalPlants, int termOcurrences)
    {
        double tf = (double)tokenCount / totalWords;

        double idf = (double)Math.Log(totalPlants / termOcurrences + 1);

        return tf * idf;
    }
}
