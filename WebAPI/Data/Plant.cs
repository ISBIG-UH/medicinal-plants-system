using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Data;

public class Plant
{
    [Key]
    public string Name { get; set; }
    
    [Column(TypeName = "json")]
    public Dictionary<string, object> Monograph { get; set; }
}