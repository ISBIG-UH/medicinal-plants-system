namespace BotaniQ.Data.Models;

public class Application
{
    public int Id { get; set; }
    
    [MaxLength(100)]
    public string Name { get; set; }
    
    public int? SynonymOfId { get; set; }
    public Application SynonymOf { get; set; }
    
    public virtual ICollection<PlantApp> PlantApps { get; set; } = new List<PlantApp>();
}