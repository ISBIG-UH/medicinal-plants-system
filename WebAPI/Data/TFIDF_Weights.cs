using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Data;

public class TFIDF_Weights
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public string Term { get; set; }
    public int TermCount { get; set; }

    [ForeignKey("Plant")]
    public string PlantName { get; set; }

    public int TotalWords { get; set; }

    public float Value { get; set; }

    public virtual Plant Plant { get; set; }
   
}