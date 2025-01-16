using System.Data.Common;
using System.Numerics;
using System.Runtime.CompilerServices;
using Data;
using DataAccess.InitialDataPopulation;
using Microsoft.EntityFrameworkCore;

namespace DataAccess;

public class DocumentVector
{
    private readonly AppDbContext _context;

    public DocumentVector(AppDbContext context) 
    {
        _context = context;
    }

    public async Task BuildDocumentVectorAsync()
    {
        var plants = _context.Plants.ToList();
        var plantTerms = _context.PlantTerms.ToList();

        foreach (var plant in plants)
        {
            List<PlantTerm> relationship = plant.PlantTerms.ToList();

            int totalWords = relationship.Sum(o => o.TermOccurrences);
                                
            int[] terms = relationship.Select(p => p.TermId).ToArray();

            int lenVocabulary = _context.Terms.Count();
            float[] vector = new float[lenVocabulary];

            for (int i = 0; i < terms.Length; i++)
            {
                int itemId = terms[i];

                int totalOccuurences = plantTerms
                    .Where(pt => pt.TermId == itemId) 
                    .Count(); 

                var termOccurrences = relationship
                    .Where(p => p.TermId == itemId)  
                    .Select(p => p.TermOccurrences)  
                    .FirstOrDefault(); 

                float tf_idf = (float)CalculateTFIDF(termOccurrences, totalWords, plants.Count(), totalOccuurences);
                vector[itemId-1] = tf_idf;
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