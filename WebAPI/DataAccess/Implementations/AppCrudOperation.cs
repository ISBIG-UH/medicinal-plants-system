using Data;
using Data.DTOs;
using DataAccess.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Implementations
{
    public class AppCrudOperations : ICrudOperation<AppDto, AppDto>
    {
        private readonly AppDbContext _context;

        public AppCrudOperations(AppDbContext context)
        {
            _context = context;
        }

        // GET
        public async Task<AppDto> GetAsync(int id)
        {
            var app = await _context.Apps
                .Include(a => a.PlantApps)           
                .ThenInclude(pa => pa.Plant)         
                .FirstOrDefaultAsync(a => a.Id == id);
            
            var appDto = new AppDto
            {
                id = app.Id,
                name = app.Name,
                plants = app.PlantApps
                    .Select(pa => pa.Plant.Name) 
                    .ToArray(),                  
                sys = app.Sys                   
            };

            return appDto;
        }


        // POST
        public async Task PostAsync(AppDto appDto)
        {
            string appDtoName = appDto.name.ToUpper();
            var newApp = new App
            {
                Name = appDtoName,
                Sys = appDto.sys  
            };

            _context.Apps.Add(newApp);
            await _context.SaveChangesAsync();

            var app = await _context.Apps.FirstOrDefaultAsync(p => p.Name == appDtoName);

            foreach (var item in appDto.plants)
            {
                var plant = await _context.Plants
                    .FromSqlInterpolated(
                        $"SELECT * FROM \"Plants\" WHERE unaccent(\"Name\") ILIKE unaccent({item})"
                    )
                    .FirstOrDefaultAsync();
                try
                {
                    var register = new PlantApp
                    {
                        PlantId = plant.Id,
                        Plant = plant,
                        AppId = app.Id,
                        App = app
                    };

                    _context.PlantApps.Add(register);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"❌ Error al encontar la planta '{item}': {ex.Message}");
                }
            }

            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {

        }

        public async Task UpdateAsync(AppDto appDto)
        {
            
        }

    }
}