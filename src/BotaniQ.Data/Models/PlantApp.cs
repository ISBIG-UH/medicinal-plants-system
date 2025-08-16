namespace BotaniQ.Data.Models;

public class PlantApp
{
    public int Id { get; set; }
    
    public int PlantId { get; set; }
    public Plant Plant { get; set; }

    public int AppId { get; set; }
    public Application Application { get; set; }
}