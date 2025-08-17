using AutoMapper;
using Bogus;
using BotaniQ.DataAccess.Mapping;
using Microsoft.Extensions.Logging;

namespace BotaniQ.DataAccessTests.Fake;

public static class FakeContextHelpers
{
    
    public static FakeDataContext GetFakeContext(string connectionString)
    {
        var context = new FakeDataContext(
            new DbContextOptionsBuilder<FakeDataContext>()
                .UseNpgsql(connectionString)
                .Options
        );

        context.Database.EnsureCreated();

        return context;
    }
    
    public static DataRepository<FakeDataContext> GetFakeDataService(string connectionString)
    {
        var context = GetFakeContext(connectionString);
        var mapper = new Mapper(
            new MapperConfiguration(
                x => x.AddProfile(new FakeMappingProfile()), 
                new LoggerFactory())
        );
        return new DataRepository<FakeDataContext>(context, mapper);
    }
    
    
    public static List<FakeEntity> CreateFakeEntity(int count = 1)
    {
        
        var dtoFactory = new Faker<FakeEntity>();
        dtoFactory
            .RuleFor(p => p.Id, f => f.IndexFaker)
            .RuleFor(p => p.IntegerField, f => f.Random.Int())
            .RuleFor(p => p.DoubleField, f => f.Random.Double())
            .RuleFor(p => p.StringField, f => f.Random.String(minLength: 5, maxLength: 10, minChar: 'a', maxChar: 'z'))
            .RuleFor(p => p.DateTimeField, f => f.Date.Recent(days: 100).Date.ToUniversalTime())
            .RuleFor(p => p.BooleanField, f => f.Random.Bool());

        dtoFactory.Generate();
        
        return dtoFactory.Generate(count);
    }
}