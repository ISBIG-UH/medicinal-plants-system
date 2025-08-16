namespace BotaniQ.Data.Models;

public class PlantTerm
{
    public int Id { get; set; }
    
    public int PlantId { get; set; }
    public Plant Plant { get; set; }

    public int TermId { get; set; }
    public Term Term { get; set; }

    public int TermOccurrences { get; set; }
}