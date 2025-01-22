namespace Data;

public class Term
{
    public int Id { get; set; }
    public string Name { get; set; }

    public virtual ICollection<PlantTerm> PlantTerms { get; set; } = new List<PlantTerm>();
}