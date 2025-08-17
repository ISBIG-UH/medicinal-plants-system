using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace BotaniQ.Core.Data;

public interface IDbContext
{
    DatabaseFacade Database { get; }
    DbSet<T> Set<T>() where T : class;

    int SaveChanges();
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}