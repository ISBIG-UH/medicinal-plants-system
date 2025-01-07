namespace Services.Interfaces;

public interface IQuerySearch<T, TResult>
{
    Task<IEnumerable<TResult>> QuerySearchAsync(T query);
}
