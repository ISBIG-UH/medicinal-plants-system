using Data;
using Data.DTOs;
using DataAccess.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Implementations
{
    public class AppCrudOperations : BaseCrudOperations<AppDto, AppDto>
    {
        private readonly AppDbContext _context;

        public AppCrudOperations(AppDbContext context)
        {
            _context = context;
        }

        // GET
        public override async Task<AppDto> GetAsync(int id)
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
                    .Where(pa => pa.Plant.State == "updated")
                    .Select(p => new PlantDto()
                        {
                            id = p.Plant.Id,
                            name = p.Plant.Name,
                            genus = (string)p.Plant.Monograph["genus"],
                            species = (string)p.Plant.Monograph["species"],
                            subsp = (string)p.Plant.Monograph["subsp"],
                            authors = (string)p.Plant.Monograph["authors"]
                        }) 
                    .ToArray(),                  
                sys = app.Sys                   
            };

            return appDto;
            
            
        }


        // POST
        public override async Task AddAsync(AppDto appDto)
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

            await AddPlantAppRelations(appDto.plants, app);
        }


        // DELETE
        public override async Task DeleteAsync(int id)
        {
            var app = await _context.Apps.FirstOrDefaultAsync(p => p.Id == id);

            _context.Apps.Remove(app);
            await _context.SaveChangesAsync();
        }


        // UPDATE
        public override async Task UpdateAsync(AppDto appDto)
        {
            var relations = _context.PlantApps.Where(pa => pa.AppId == appDto.id).ToList();

            if (relations.Any())
            {
                _context.PlantApps.RemoveRange(relations);
                _context.SaveChanges();
            }

            var app = await _context.Apps.FirstOrDefaultAsync(a => a.Id == appDto.id);
            app.Name = appDto.name;
            app.Sys = appDto.sys;

            await AddPlantAppRelations(appDto.plants, app);
        }


        private async Task AddPlantAppRelations(IEnumerable<PlantDto> plants, App app)
        {
            foreach (var item in plants.Select(x => x.name))
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

    }
}