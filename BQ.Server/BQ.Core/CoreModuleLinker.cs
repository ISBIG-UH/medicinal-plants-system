using BQ.Core.Linkers;
using BQ.Core.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace BQ.Core;

public class CoreModuleLinker : IServiceLinker
{
    public void ConfigureServices(IServiceCollection services, IConfiguration configuration)
    {
        services.AddScoped<ICrudService, CrudService>();
    }
}