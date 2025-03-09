using AutoMapper;
using BQ.Core.Data;
using BQ.Core.Data.Interfaces;
using BQ.Core.DataAccess.Interfaces;
using BQ.Core.Query;
using Microsoft.EntityFrameworkCore;

namespace BQ.Core.Services;


public partial interface ICrudService<TContext>
    where TContext : IDbContext
{

    TContext Context { get; }
    IMapper Mapper { get; }
    
    Task<TDTO> Create<TEntity, TDTO>(TDTO dto, CancellationToken ct)
        where TEntity : class
        where TDTO : class;

    Task<TDTO> Update<TEntity, TDTO, TKey>(TDTO dto, CancellationToken ct)
        where TKey : IEquatable<TKey>
        where TEntity : class, IEntity<TKey>
        where TDTO : class, IDTO<TKey>;
    
    Task<TDTO> Update<TEntity, TDTO>(TDTO dto, CancellationToken ct)
        where TEntity : class, IEntity
        where TDTO : class, IDTO;
    
    Task<TDTO> Get<TEntity, TDTO, TKey>(TKey id, CancellationToken ct = default)
        where TKey : IEquatable<TKey>
        where TEntity : class, IEntity<TKey>
        where TDTO : class, IDTO<TKey>;
    
    Task<TDTO> Get<TEntity, TDTO, TKey>(TKey id, Func<IQueryable<TEntity>, IQueryable<TEntity>> setQuery, CancellationToken ct = default)
        where TKey : IEquatable<TKey>
        where TEntity : class, IEntity<TKey>
        where TDTO : class, IDTO<TKey>;
    
    Task<IEnumerable<TDTO>> GetAll<TEntity, TDTO>(CancellationToken ct = default)
        where TEntity : class
        where TDTO : class;
    
    Task Delete<TEntity, TKey>(TKey id, CancellationToken ct = default)
        where TKey : IEquatable<TKey>
        where TEntity : class, IEntity<TKey>;
    
    Task Delete<TEntity>(int id, CancellationToken ct = default)
        where TEntity : class, IEntity;
    
}

public interface ICrudService : ICrudService<IDbContext> { }