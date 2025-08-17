using AutoMapper;
using BotaniQ.Core.Data;

namespace BotaniQ.DataAccess;

public interface IDataRepository<TContext> where TContext : IDbContext 
{
    /// <summary>
    /// Database context that the service works with.
    /// </summary>
    TContext Context { get; }
    
    /// <summary>
    /// Entities and DTO mapper that the service works with.
    /// </summary>
    IMapper Mapper { get; }

    /// <summary>
    /// Creates entity by DTO.
    /// </summary>
    /// <typeparam name="TEntity">Entity type.</typeparam>
    /// <typeparam name="TDto">DTO type.</typeparam>
    /// <typeparam name="TKey">ID field type of entity.</typeparam>
    /// <param name="dto">DTO of entity for creating.</param>
    /// <param name="ct">Cancellation token.</param>
    /// <returns>DTO of created entity.</returns>
    Task<TDto> Create<TEntity, TDto, TKey>(TDto dto, CancellationToken ct)
        where TEntity : class, IEntity<TKey> where TDto : class, IDto<TKey> where TKey : IEquatable<TKey>;
    
    /// <summary>
    /// Updates entity by DTO.
    /// </summary>
    /// <typeparam name="TEntity">Entity type.</typeparam>
    /// <typeparam name="TDto">DTO type.</typeparam>
    /// <typeparam name="TKey">ID field type of entity.</typeparam>
    /// <param name="dto">DTO of entity for updating.</param>
    /// <param name="ct">Cancellation token.</param>
    /// <returns>DTO of updated entity.</returns>
    Task<TDto> Update<TEntity, TDto, TKey>(TDto dto, CancellationToken ct)
        where TKey : IEquatable<TKey>
        where TEntity : class, IEntity<TKey>
        where TDto : class, IDto<TKey>;
    
    /// <summary>
    /// Gets entity by ID.
    /// </summary>
    /// <typeparam name="TEntity">Entity type.</typeparam>
    /// <typeparam name="TDto">DTO type.</typeparam>
    /// <typeparam name="TKey">ID field type of entity.</typeparam>
    /// <param name="id">ID of requested entity.</param>
    /// <param name="ct">Cancellation token.</param>
    /// <returns>DTO of requested entity.</returns>
    Task<TDto> Get<TEntity, TDto, TKey>(TKey id, CancellationToken ct = default)
        where TKey : IEquatable<TKey>
        where TEntity : class, IEntity<TKey>
        where TDto : class, IDto<TKey>;

    /// <summary>
    /// Gets entity by ID with ability to customize query.
    /// </summary>
    /// <remarks>
    /// <i>Code sample:
    /// <code>
    /// dataService.Get&lt;User, UserDTO, string&gt;(id, query => query.Include(o => o.Company), ct);
    /// </code></i>
    /// </remarks>
    /// <typeparam name="TEntity">Entity type.</typeparam>
    /// <typeparam name="TDto">DTO type.</typeparam>
    /// <typeparam name="TKey">ID field type of entity.</typeparam>
    /// <param name="id">ID of requested entity.</param>
    /// <param name="setQuery">Function method which customizes query.</param>
    /// <param name="ct">Cancellation token.</param>
    /// <returns>DTO of requested entity.</returns>
    Task<TDto> Get<TEntity, TDto, TKey>(TKey id, Func<IQueryable<TEntity>, IQueryable<TEntity>> setQuery, CancellationToken ct = default)
        where TKey : IEquatable<TKey>
        where TEntity : class, IEntity<TKey>
        where TDto : class, IDto<TKey>;
    
    
    
    /// <summary>
    /// Gets all entities.
    /// </summary>
    /// <typeparam name="TEntity">Entity type.</typeparam>
    /// <typeparam name="TDto">DTO type.</typeparam>
    /// <param name="ct">Cancellation token.</param>
    /// <returns>A list of all entities DTOs.</returns>
    Task<IEnumerable<TDto>> GetAll<TEntity, TDto>(CancellationToken ct = default)
        where TEntity : class
        where TDto : class;

    /// <summary>
    /// Gets all entities with ability to customize query.
    /// </summary>
    /// <remarks>
    /// <i>Code sample:
    /// <code>
    /// dataService.GetAll&lt;Order, OrderDTO&gt;(query => query.Include(o => o.OrderDetails), ct);
    /// </code></i>
    /// </remarks>
    /// <typeparam name="TEntity">Entity type.</typeparam>
    /// <typeparam name="TDto">DTO type.</typeparam>
    /// <param name="setQuery">Function method which customizes query.</param>
    /// <param name="ct">Cancellation token.</param>
    /// <returns>A list of all entities DTOs.</returns>
    Task<IEnumerable<TDto>> GetAll<TEntity, TDto>(
        Func<IQueryable<TEntity>, IQueryable<TEntity>> setQuery, CancellationToken ct = default)
        where TEntity : class
        where TDto : class;
    
    
    /// <summary>
    /// Deletes entity by ID.
    /// </summary>
    /// <typeparam name="TEntity">Entity type.</typeparam>
    /// <typeparam name="TKey">ID field type of entity.</typeparam>
    /// <param name="id">ID of entity.</param>
    /// <param name="ct">Cancellation token.</param>
    Task Delete<TEntity, TKey>(TKey id, CancellationToken ct = default)
        where TKey : IEquatable<TKey>
        where TEntity : class, IEntity<TKey>;
    
}
