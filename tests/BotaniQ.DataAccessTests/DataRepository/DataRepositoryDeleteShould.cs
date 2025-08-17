using BotaniQ.DataAccessTests.Fake;
using BotaniQ.DataAccessTests.Fixtures;

namespace BotaniQ.DataAccessTests.DataRepository;

public class DataRepositoryDeleteShould : IClassFixture<PostgreSqlContainerFixture>
{
    
    private readonly string _connectionString;
    
    public DataRepositoryDeleteShould(PostgreSqlContainerFixture containerFixture)
    {
        _connectionString = containerFixture.Container.GetConnectionString();
    }
    
    [Fact]
    public async Task DeleteASingleEntity()
    {

        int totalEntities = 10;
        int entityIndex = (int)Random.Shared.NextInt64(0, totalEntities - 1);
        
        var dataRepository = FakeContextHelpers.GetFakeDataService(_connectionString);
        var entities = FakeContextHelpers.CreateFakeEntity(totalEntities);

        await dataRepository.Context.Database.BeginTransactionAsync();

        await dataRepository.Context.AddRangeAsync(entities);
        await dataRepository.Context.SaveChangesAsync();
        
        dataRepository.Context.ChangeTracker.Clear();

        await dataRepository.Delete<FakeEntity, int>(entities[entityIndex].Id, ct: default);

        var setResult = await dataRepository.Context.Set<FakeEntity>().ToListAsync();
        var result = setResult.FirstOrDefault(x => x.Id == entities[entityIndex].Id);
        
        Assert.Equal(totalEntities - 1, setResult.Count);
        Assert.Null(result);
        
        await dataRepository.Context.Database.RollbackTransactionAsync();
        
    }
    
    [Fact]
    public async Task NotRaiseExceptionIfNotExists()
    {
        var dataRepository = FakeContextHelpers.GetFakeDataService(_connectionString);

        await dataRepository.Delete<FakeEntity, int>(1, ct: default);
    }
}