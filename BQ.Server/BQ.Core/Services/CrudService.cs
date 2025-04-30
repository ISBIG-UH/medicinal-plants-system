using AutoMapper;
using BQ.Core.Data;
using BQ.Core.Data.Interfaces;
using BQ.Core.DataAccess.Interfaces;
using BQ.Core.Exceptions;
using BQ.Core.Query;
using Microsoft.EntityFrameworkCore;

namespace BQ.Core.Services;

public class CrudService<TContext> : ICrudService<TContext>
    where TContext : IDbContext
{
    
    private readonly TContext _context;
    private readonly IMapper _mapper;
    
    public TContext Context { get { return _context; } }
    public IMapper Mapper { get { return _mapper; } }
    
    public CrudService(TContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    
    public async Task<TDTO> Create<TEntity, TDTO>(TDTO dto, CancellationToken ct) 
        where TEntity : class 
        where TDTO : class
    {
        var entity = _mapper.Map<TEntity>(dto);
        await _context.Set<TEntity>().AddAsync(entity, ct);
        await _context.SaveChangesAsync(ct);
        return _mapper.Map<TDTO>(entity);
    }

    public async Task<TDTO> Update<TEntity, TDTO, TKey>(TDTO dto, CancellationToken ct) 
        where TEntity : class, IEntity<TKey> 
        where TDTO : class, IDTO<TKey> 
        where TKey : IEquatable<TKey>
    {
        var entity = await _context.Set<TEntity>().FirstOrDefaultAsync(x => x.Id.Equals(dto.Id), ct);
        if (entity is null)
            throw new EntityNotFoundException();

        _mapper.Map(dto, entity);
        await _context.SaveChangesAsync(ct);
        return _mapper.Map<TDTO>(entity);
    }

    public Task<TDTO> Update<TEntity, TDTO>(TDTO dto, CancellationToken ct) 
        where TEntity : class, IEntity 
        where TDTO : class, IDTO
        => Update<TEntity, TDTO, int>(dto, ct);

    public async Task<TDTO> Get<TEntity, TDTO, TKey>(TKey id, CancellationToken ct = default) 
        where TEntity : class, IEntity<TKey> 
        where TDTO : class, IDTO<TKey> 
        where TKey : IEquatable<TKey>
        => _mapper.Map<TDTO>(await _context.Set<TEntity>().FirstOrDefaultAsync(o => o.Id.Equals(id), ct));

    public async Task<TDTO> Get<TEntity, TDTO, TKey>(TKey id, Func<IQueryable<TEntity>, IQueryable<TEntity>> setQuery, CancellationToken ct = default) 
        where TEntity : class, IEntity<TKey> 
        where TDTO : class, IDTO<TKey> 
        where TKey : IEquatable<TKey>
        => _mapper.Map<TDTO>(await setQuery(_context.Set<TEntity>()).FirstOrDefaultAsync(o => o.Id.Equals(id), ct));
    
    public async Task<IEnumerable<TDTO>> GetAll<TEntity, TDTO>(CancellationToken ct = default) 
        where TEntity : class 
        where TDTO : class
        => _mapper.Map<IEnumerable<TDTO>>(await _context.Set<TEntity>().ToListAsync(ct));

    public async Task Delete<TEntity, TKey>(TKey id, CancellationToken ct = default) where TEntity : class, IEntity<TKey> where TKey : IEquatable<TKey>
    {
        var entity = await _context.Set<TEntity>().FirstOrDefaultAsync(o => o.Id.Equals(id), ct);
        if (entity is not null)
        {
            _context.Set<TEntity>().Remove(entity);
            await _context.SaveChangesAsync(ct);
        }
    }

    public Task Delete<TEntity>(int id, CancellationToken ct = default) where TEntity : class, IEntity
        => Delete<TEntity, int>(id, ct);
    
}

public class CrudService : CrudService<IDbContext>, ICrudService
{
    public CrudService(IDbContext context, IMapper mapper) : base(context, mapper) { }
}