namespace BotaniQ.Data.Models;

public class PlantModification
{
    public int Id { get; set; }
    
    public int PlantId { get; set; }
    public Plant Plant { get; set; }
    
    [MaxLength(100)]
    public string CommonName { get; set; }
    
    [Column(TypeName = "json")]
    public Dictionary<string, object> Monograph { get; set; }
    
}