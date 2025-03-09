using Microsoft.Extensions.DependencyInjection;

namespace BQ.Core.Linkers;

public interface ISeedLinker
{
    public Task SeedInitialData(IServiceScope serviceScope);
}