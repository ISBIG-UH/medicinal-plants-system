using BotaniQ.Core.Exceptions;
using BotaniQ.DataAccessTests.Fake;
using BotaniQ.DataAccessTests.Fixtures;

namespace BotaniQ.DataAccessTests.DataRepository;

public class DataRepositoryGetShould : IClassFixture<PostgreSqlContainerFixture>
{
    
    private readonly string _connectionString;
    
    public DataRepositoryGetShould(PostgreSqlContainerFixture containerFixture)
    {
        _connectionString = containerFixture.Container.GetConnectionString();
    }

    [Fact]
    public async Task RetrieveASingleEntity()
    {

        int totalEntities = 10;
        int entityIndex = (int)Random.Shared.NextInt64(0, totalEntities - 1);
        
        var dataRepository = FakeContextHelpers.GetFakeDataService(_connectionString);
        var entities = FakeContextHelpers.CreateFakeEntity(totalEntities);

        await dataRepository.Context.Database.BeginTransactionAsync();

        await dataRepository.Context.AddRangeAsync(entities);
        await dataRepository.Context.SaveChangesAsync();
        
        dataRepository.Context.ChangeTracker.Clear();

        var result = await dataRepository.Get<FakeEntity, FakeDto, int>(entities[entityIndex].Id, ct: default);
        
        Assert.Equal(result, dataRepository.Mapper.Map<FakeEntity, FakeDto>(entities[entityIndex]), new FakeEqualityComparer());
        
        await dataRepository.Context.Database.RollbackTransactionAsync();
        
    }
    
    
    [Fact]
    public async Task RaiseExceptionIfNotExists()
    {

        int totalEntities = 10;
        
        var dataRepository = FakeContextHelpers.GetFakeDataService(_connectionString);
        var entities = FakeContextHelpers.CreateFakeEntity(totalEntities);

        await dataRepository.Context.Database.BeginTransactionAsync();

        await dataRepository.Context.AddRangeAsync(entities);
        await dataRepository.Context.SaveChangesAsync();
        
        dataRepository.Context.ChangeTracker.Clear();

        await Assert.ThrowsAsync<EntityNotFoundException>(() => dataRepository.Get<FakeEntity, FakeDto, int>(1000, ct: default));
        
        await dataRepository.Context.Database.RollbackTransactionAsync();
        
    }
    
}