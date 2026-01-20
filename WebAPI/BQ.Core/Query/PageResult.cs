using BQ.Core.Data.Interfaces;

namespace BQ.Core.Query;

public class PageResult<TDTO> where TDTO : class
{
    public int Total { get; set; }

    public IEnumerable<TDTO> Items { get; set; }
}
