using System.ComponentModel.DataAnnotations.Schema;

namespace Data;

public class TFIDF_Weights
{
    public int Id { get; set; }
    public string Term { get; set; }
    public int TermCount { get; set; }
    [ForeignKey("Plant")]
    public int PlantId { get; set; }
    public float Value { get; set; }

    public virtual Plant Plant { get; set; }

}