using System.ComponentModel.DataAnnotations.Schema;

namespace Data;

public class PlantTerm
{
    public int PlantId { get; set; }
    public Plant Plant { get; set; }

    public int TermId { get; set; }
    public Term Term { get; set; }

    public int TermOccurrences { get; set; }
    
}