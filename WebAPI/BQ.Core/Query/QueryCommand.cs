namespace BQ.Core.Query;

public class QueryCommand
{
    /// <summary>
    /// Name of the field to sort by.
    /// </summary>
    public string? SortingField { get; set; }

    /// <summary>
    /// Sorting direction.
    /// </summary>
    public SortingDirection? SortingDirection { get; set; }

    /// <summary>
    /// Number of records to skip.
    /// </summary>
    public int? Skip { get; set; }

    /// <summary>
    /// Number of records to take.
    /// </summary>
    public int? Take { get; set; }
    
    public List<Filter>? Filters { get; set; }
}