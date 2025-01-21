using Data.DTOs;

namespace DataAccess.Interfaces
{
    public interface ICrudOperation<T, TResult>
    {
        Task PostAsync(T input);

        Task DeleteAsync(int id);

        Task UpdateAsync(T input);

        Task<TResult> GetAsync(int id);
    }
}