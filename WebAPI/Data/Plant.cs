using System.ComponentModel.DataAnnotations.Schema;

namespace Data;

public class Plant
{
    public int Id { get; set; }
    public string Name { get; set; }
    
    [Column(TypeName = "json")]
    public Dictionary<string, object> Monograph { get; set; }
}