using BotaniQ.Core.Exceptions;
using BotaniQ.DataAccessTests.Fake;
using BotaniQ.DataAccessTests.Fixtures;

namespace BotaniQ.DataAccessTests.DataRepository;

public class DataRepositoryCreateShould : IClassFixture<PostgreSqlContainerFixture>
{
    
    private readonly string _connectionString;
    
    public DataRepositoryCreateShould(PostgreSqlContainerFixture containerFixture)
    {
        _connectionString = containerFixture.Container.GetConnectionString();
    }
    
    
    [Fact]
    public async Task SaveASingleEntity()
    {
        var dataRepository = FakeContextHelpers.GetFakeDataService(_connectionString);
        var dto = dataRepository.Mapper.Map<FakeEntity,FakeDto>(FakeContextHelpers.CreateFakeEntity()[0]);
        
        await dataRepository.Context.Database.BeginTransactionAsync();

        await dataRepository.Create<FakeEntity, FakeDto, int>(dto, ct: default);
        
        dataRepository.Context.ChangeTracker.Clear();

        var result = await dataRepository.Context.Set<FakeEntity>()
            .Where(x => x.Id == dto.Id)
            .ToListAsync();
        
        Assert.Single(result);
        Assert.Equal(dto, dataRepository.Mapper.Map<FakeEntity,FakeDto>(result[0]), comparer: new FakeEqualityComparer());
        
        await dataRepository.Context.Database.RollbackTransactionAsync();
    }
    

    [Fact]
    public async Task RaiseExceptionIfAlreadyExists()
    {
        var dataRepository = FakeContextHelpers.GetFakeDataService(_connectionString);
        var dto = dataRepository.Mapper.Map<FakeEntity,FakeDto>(FakeContextHelpers.CreateFakeEntity()[0]);
        
        await dataRepository.Context.Database.BeginTransactionAsync();

        await dataRepository.Create<FakeEntity, FakeDto, int>(dto, ct: default);
        
        dataRepository.Context.ChangeTracker.Clear();
        
        await Assert.ThrowsAsync<EntityAlreadyExistsException>(() => dataRepository.Create<FakeEntity, FakeDto, int>(dto, ct: default));
    
        await dataRepository.Context.Database.RollbackTransactionAsync();
    }

}