namespace BotaniQ.Data.Models;

public class PlantVector
{
    public int Id { get; set; }
    
    public int PlantId { get; set; }
    public Plant Plant { get; set; }
    
    public float[] Vector { get; set; }
}