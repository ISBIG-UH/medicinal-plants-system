
using Data;
using Microsoft.EntityFrameworkCore;

namespace DataAccess;

public class DocumentVector
{
    public DocumentVector() {}
    
    public float[] BuildDocumentVectorAsync(Plant plant, List<PlantTerm> plantTerms, List<(int Id, int Index)> termsWithIndex, int totalPlants)
    {
        var relationship = plant.PlantTerms;

        int totalWords = relationship.Sum(o => o.TermOccurrences);
                            
        int[] terms = relationship.Select(p => p.TermId).ToArray();

        float[] vector = new float[termsWithIndex.Count()];

        for (int i = 0; i < terms.Length; i++)
        {
            int itemId = terms[i];

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

        return vector;
          
    }

  
    private double CalculateTFIDF(int tokenCount, int totalWords, int totalPlants, int termOcurrences)
    {
        double tf = (double)tokenCount / totalWords;

        double idf = (double)Math.Log(totalPlants / termOcurrences + 1);

        return tf * idf;
    }
}
