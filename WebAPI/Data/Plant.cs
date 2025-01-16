using System.ComponentModel.DataAnnotations.Schema;

namespace Data;

public class Plant
{
    public int Id { get; set; }
    public string Name { get; set; }
    
    [Column(TypeName = "json")]
    public Dictionary<string, object> Monograph { get; set; }

    [Column(TypeName = "jsonb")]
    public float[] Vector { get; set; }


    public virtual ICollection<PlantTerm> PlantTerms { get; set; } = new List<PlantTerm>();

}