using System.ComponentModel.DataAnnotations.Schema;

namespace Data;

public class ModificationPlant
{
    public int Id { get; set; }
    public int PlantId { get; set; }
    public string Name { get; set; }
    
    [Column(TypeName = "json")]
    public Dictionary<string, object> Monograph { get; set; }
    
}