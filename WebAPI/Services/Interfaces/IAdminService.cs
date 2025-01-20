using Data;
using Data.DTOs;

namespace Services.Interfaces;

public interface IAdminService
{
    Task AddPlantAsync(PlantDto plantDto);
    Task DeletePlantAsync(int id);
    Task UpdatePlantAsync(PlantDto plantDto);
    Task<IEnumerable<PlantDto>> GetPlantByIdAsync(int id);
    Task<IEnumerable<Dictionary<int, string>>> GetPlantsByFirstLetterAsync(string letter);
}