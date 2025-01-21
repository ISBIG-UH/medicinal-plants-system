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

        public async Task PostAsync(AppDto appDto)
        {

        }

        public async Task DeleteAsync(int id)
        {

        }

        public async Task UpdateAsync(AppDto appDto)
        {
            
        }

    }
}