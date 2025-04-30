using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace BQ.Core.Linkers;

public interface IServiceLinker
{
    void ConfigureServices(IServiceCollection services, IConfiguration configuration);
}