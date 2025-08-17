using BotaniQ.Core.Exceptions;
using BotaniQ.DataAccessTests.Fake;
using BotaniQ.DataAccessTests.Fixtures;

namespace BotaniQ.DataAccessTests.DataRepository;

public class DataRepositoryUpdateShould : IClassFixture<PostgreSqlContainerFixture>
{
    
    private readonly string _connectionString;
    
    public DataRepositoryUpdateShould(PostgreSqlContainerFixture containerFixture)
    {
        _connectionString = containerFixture.Container.GetConnectionString();
    }
    
    [Fact]
    public async Task DeleteASingleEntity()
    {
        
        var dataRepository = FakeContextHelpers.GetFakeDataService(_connectionString);
        var entities = FakeContextHelpers.CreateFakeEntity(2);
        var dto = dataRepository.Mapper.Map<FakeEntity,FakeDto>(FakeContextHelpers.CreateFakeEntity()[0]);

        await dataRepository.Context.Database.BeginTransactionAsync();

        await dataRepository.Context.AddRangeAsync(entities);
        await dataRepository.Context.SaveChangesAsync();
        
        dataRepository.Context.ChangeTracker.Clear();
        
        await dataRepository.Update<FakeEntity, FakeDto, int>(dto, ct: default);

        var result = await dataRepository.Context.Set<FakeEntity>()
            .Where(x => x.Id == dto.Id)
            .ToListAsync();
        
        Assert.Single(result);
        Assert.Equal(dto, dataRepository.Mapper.Map<FakeEntity,FakeDto>(result[0]), comparer: new FakeEqualityComparer());
        
        await dataRepository.Context.Database.RollbackTransactionAsync();
        
    }
    
    [Fact]
    public async Task RaiseExceptionIfNotExists()
    {
        
        int totalEntities = 10;
        
        var dataRepository = FakeContextHelpers.GetFakeDataService(_connectionString);
        var entities = FakeContextHelpers.CreateFakeEntity(totalEntities);
        var dto = dataRepository.Mapper.Map<FakeEntity,FakeDto>(FakeContextHelpers.CreateFakeEntity()[0]);
        dto.Id = 1000;
        
        await dataRepository.Context.Database.BeginTransactionAsync();

        await dataRepository.Context.AddRangeAsync(entities);
        await dataRepository.Context.SaveChangesAsync();
        
        dataRepository.Context.ChangeTracker.Clear();

        await Assert.ThrowsAsync<EntityNotFoundException>(() => dataRepository.Update<FakeEntity, FakeDto, int>(dto, ct: default));
        
        await dataRepository.Context.Database.RollbackTransactionAsync();
        
    }
}