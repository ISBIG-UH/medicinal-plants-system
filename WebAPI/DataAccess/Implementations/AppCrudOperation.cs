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
        public async Task AddAsync(AppDto appDto)
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
                    
                if (plant != null)
                {
                    var existingRegister = await _context.PlantApps
                        .FirstOrDefaultAsync(pa => pa.PlantId == plant.Id && pa.AppId == app.Id);

                    if (existingRegister == null)
                    {
                        var register = new PlantApp
                        {
                            PlantId = plant.Id,
                            Plant = plant,
                            AppId = app.Id,
                            App = app
                        };

                        _context.PlantApps.Add(register);
                        await _context.SaveChangesAsync();
                    }
                    else
                    {
                        Console.WriteLine($"🔄 El registro con PlantId: {plant.Id} y AppId: {app.Id} ya existe.");
                    }
                }
                else
                {
                    Console.WriteLine($"❌ No se encontró la planta");
                }
            }

            await _context.SaveChangesAsync();
        }


        // DELETE
        public async Task DeleteAsync(int id)
        {
            var app = await _context.Apps.FirstOrDefaultAsync(p => p.Id == id);

            _context.Apps.Remove(app);
            await _context.SaveChangesAsync();
        }


        public async Task UpdateAsync(AppDto appDto)
        {
            await DeleteAsync(appDto.id);
            await AddAsync(appDto);
        }

    }
}