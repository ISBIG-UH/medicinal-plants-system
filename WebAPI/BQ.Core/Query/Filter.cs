namespace BQ.Core.Query;

public class Filter
{
    public string Property { get; set; }
    public FilterType Type { get; set; }
    public object Value { get; set; }
}