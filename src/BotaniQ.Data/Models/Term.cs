namespace BotaniQ.Data.Models;

public class Term
{
    public int Id { get; set; }
    
    [MaxLength(100)]
    public string Value { get; set; }

    public virtual ICollection<PlantTerm> PlantTerms { get; set; } = new List<PlantTerm>();
}