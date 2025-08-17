using AutoMapper;
using BotaniQ.Core.Data;
using BotaniQ.Core.Exceptions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;

namespace BotaniQ.DataAccess;

public class DataRepository<TContext> : IDataRepository<TContext> where TContext : IDbContext
{
    private readonly TContext _context;
    private readonly IMapper _mapper;

    public TContext Context => _context;
    public IMapper Mapper => _mapper;
    
    public DataRepository(TContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    
    public async Task<TDto> Create<TEntity, TDto, TKey>(TDto dto, CancellationToken ct) where TEntity :  class, IEntity<TKey> where TDto : class, IDto<TKey> where TKey : IEquatable<TKey>
    {
        var old = await _context.Set<TEntity>().FirstOrDefaultAsync(x => x.Id.Equals(dto.Id), ct);
        if (old is not null)
            throw new EntityAlreadyExistsException();
        
        var entity = _mapper.Map<TEntity>(dto);
        await _context.Set<TEntity>().AddAsync(entity, ct);
   
        await _context.SaveChangesAsync(ct);
        return _mapper.Map<TDto>(entity);
    }

    public async Task<TDto> Update<TEntity, TDto, TKey>(TDto dto, CancellationToken ct) where TEntity : class, IEntity<TKey> where TDto : class, IDto<TKey> where TKey : IEquatable<TKey>
    {
        var entity = await _context.Set<TEntity>().FirstOrDefaultAsync(x => x.Id.Equals(dto.Id), ct);
        if (entity is null)
            throw new EntityNotFoundException();

        _mapper.Map(dto, entity);
        await _context.SaveChangesAsync(ct);
        return _mapper.Map<TDto>(entity);
    }

    public async Task<TDto> Get<TEntity, TDto, TKey>(TKey id, CancellationToken ct = default) where TEntity : class, IEntity<TKey> where TDto : class, IDto<TKey> where TKey : IEquatable<TKey>
    {
        var entity = await _context.Set<TEntity>().FirstOrDefaultAsync(o => o.Id.Equals(id), ct);
        if (entity is null)
            throw new EntityNotFoundException();
        
        return _mapper.Map<TDto>(entity);
    }

    public async Task<TDto> Get<TEntity, TDto, TKey>(TKey id, Func<IQueryable<TEntity>, IQueryable<TEntity>> setQuery, CancellationToken ct = default) where TEntity : class, IEntity<TKey> where TDto : class, IDto<TKey> where TKey : IEquatable<TKey>
    {
        var entity = await setQuery(_context.Set<TEntity>()).FirstOrDefaultAsync(o => o.Id.Equals(id), ct);
        if (entity is null)
            throw new EntityNotFoundException();
        
        return _mapper.Map<TDto>(entity);
    }

    public async Task<IEnumerable<TDto>> GetAll<TEntity, TDto>(CancellationToken ct = default) where TEntity : class where TDto : class
        => _mapper.Map<IEnumerable<TDto>>(await _context.Set<TEntity>().ToListAsync(ct));

    public async Task<IEnumerable<TDto>> GetAll<TEntity, TDto>(Func<IQueryable<TEntity>, IQueryable<TEntity>> setQuery, CancellationToken ct = default) where TEntity : class where TDto : class
        => _mapper.Map<IEnumerable<TDto>>(await setQuery(_context.Set<TEntity>()).ToListAsync(ct));

    public async Task Delete<TEntity, TKey>(TKey id, CancellationToken ct = default) where TEntity : class, IEntity<TKey> where TKey : IEquatable<TKey>
    {
        var entity = await _context.Set<TEntity>().FirstOrDefaultAsync(o => o.Id.Equals(id), ct);
        if (entity is not null)
        {
            _context.Set<TEntity>().Remove(entity);
            await _context.SaveChangesAsync(ct);
        }
    }
}