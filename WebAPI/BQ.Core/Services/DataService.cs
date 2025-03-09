using BQ.Core.Data.Interfaces;
using BQ.Core.DataAccess.Interfaces;

namespace BQ.Core.Services;

public class DataService<TEntity, TDTO, TKey> : IDataService<TDTO, TKey>
    where TEntity : class, IEntity<TKey>
    where TDTO : class, IDTO<TKey>
    where TKey : IEquatable<TKey>
{

    private readonly ICrudService _crudService;

    public DataService(ICrudService crudService)
    {
        _crudService = crudService;
    }

    public Task<TDTO> Create(TDTO dto, CancellationToken ct)
        => _crudService.Create<TEntity, TDTO>(dto, ct);

    public Task<TDTO> Update(TDTO dto, CancellationToken ct)
        => _crudService.Update<TEntity, TDTO, TKey>(dto, ct);

    public Task Delete(TKey key, CancellationToken ct)
        => _crudService.Delete<TEntity, TKey>(key, ct);

    public Task<TDTO> Get(TKey key, CancellationToken ct)
        => _crudService.Get<TEntity, TDTO, TKey>(key, ct);
}