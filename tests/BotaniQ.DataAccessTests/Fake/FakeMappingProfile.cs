using AutoMapper;

namespace BotaniQ.DataAccessTests.Fake;

public class FakeMappingProfile : Profile
{
    public FakeMappingProfile()
    {
        _ = CreateMap<FakeEntity, FakeDto>().ReverseMap();
    }
}