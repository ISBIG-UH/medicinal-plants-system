using Data;
using DataAccess;
using DataAccess.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;

public class PendingChangesProcessor : IHostedService
{
    private Timer _timer;
    private readonly IServiceScopeFactory _scopeFactory;

    public PendingChangesProcessor(IServiceScopeFactory scopeFactory)
    {
        _scopeFactory = scopeFactory;
    }

    public Task StartAsync(CancellationToken cancellationToken)
    {
        ScheduleTask();
        return Task.CompletedTask;
    }

    private void ScheduleTask()
    {
        DateTime now = DateTime.Now;
        DateTime nextRun = now.Date.AddHours(4);

        if (now >= nextRun)
        {
            nextRun = nextRun.AddDays(1);
        }

        TimeSpan initialDelay = nextRun - DateTime.Now;
        _timer = new Timer(PendingChangesProcessorCallback, null, initialDelay, TimeSpan.FromHours(24));
    }

    private void PendingChangesProcessorCallback(object state)
    {
        Task.Run(async () => await PendingChangesProcessorAsync());
    }

    private async Task PendingChangesProcessorAsync()
    {
        Console.WriteLine("Procesando cambios en la BD...");

        using (var scope = _scopeFactory.CreateScope())
        {
            var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            var crudOperationService = scope.ServiceProvider.GetRequiredService<ICrudOperation<Plant, Plant>>();
            var documentVectorService = scope.ServiceProvider.GetRequiredService<IDocumentVector>();

            var pendingRecords = await dbContext.Plants
                                      .Where(r => r.State != "updated")
                                      .ToListAsync();
            
            if(pendingRecords.Count() > 0)
            {
                foreach (var record in pendingRecords)
                {
                    if (record.State == "aggregated")
                    {
                        await crudOperationService.AddAsync(record);
                    }
                    else if (record.State == "deleted")
                    {
                        await crudOperationService.DeleteAsync(record.Id);
                    }
                    else if (record.State == "modified")
                    {
                        await crudOperationService.UpdateAsync(record);
                    }
                }

                await documentVectorService.BuildDocumentVectorAsync();
            }
        }
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
        _timer?.Change(Timeout.Infinite, 0);
        return Task.CompletedTask;
    }
}
