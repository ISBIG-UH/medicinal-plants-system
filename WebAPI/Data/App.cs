namespace Data;

public class App
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string[] Sys { get; set; }
    
    public virtual ICollection<PlantApp> PlantApps { get; set; } = new List<PlantApp>();
}