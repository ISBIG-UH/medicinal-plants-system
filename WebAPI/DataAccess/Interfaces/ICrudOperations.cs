using Data.DTOs;

namespace DataAccess.Interfaces
{
    public interface ICrudOperation<T, TResult>
    {
        Task AddAsync(T input);

        Task DeleteAsync(int id);

        Task UpdateAsync(T input);

        Task<TResult> GetAsync(int id);
    }

    public abstract class BaseCrudOperations<T, TResult> : ICrudOperation<T, TResult>
    {
        public abstract Task AddAsync(T input);
        public abstract Task DeleteAsync(int id);
        public abstract Task UpdateAsync(T input);
        public virtual Task<TResult> GetAsync(int id) { throw new NotImplementedException();}
    }

}