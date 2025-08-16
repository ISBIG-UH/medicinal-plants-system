using BotaniQ.Data.Enums;

namespace BotaniQ.Data.Models;

public class Plant
{
    public int Id { get; set; }
    
    [MaxLength(100)]
    public string CommonName { get; set; }
    
    [Column(TypeName = "json")]
    public Dictionary<string, object>? Monograph { get; set; }

    public virtual ICollection<PlantTerm> PlantTerms { get; set; } = new List<PlantTerm>();
    public virtual ICollection<PlantApp> PlantApps { get; set; } = new List<PlantApp>();
    public virtual PlantVector PlantVector { get; set; }
    
    public PlantState State { get; set; }
}