
namespace DataAccess.Interfaces
{
    public interface ISearch<T, TResult>
    {
        Task<TResult> SearchAsync(IEnumerable<T> input);
    }
}
