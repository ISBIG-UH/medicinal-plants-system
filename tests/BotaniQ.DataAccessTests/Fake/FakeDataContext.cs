using BotaniQ.Core.Data;

namespace BotaniQ.DataAccessTests.Fake;

public class FakeDataContext : DbContext, IDbContext
{
    public FakeDataContext(DbContextOptions<FakeDataContext> options) : base(options) { }
    
    private DbSet<FakeEntity> FakeEntities { get; set; }
}