namespace BQ.Core.Services;

public interface IDataService<TDTO, TKey> 
    where TDTO : class
{
    Task<TDTO> Create(TDTO dto, CancellationToken ct);
    Task<TDTO> Update(TDTO dto, CancellationToken ct);
    Task Delete(TKey key, CancellationToken ct);
    Task<TDTO> Get(TKey key, CancellationToken ct);
}