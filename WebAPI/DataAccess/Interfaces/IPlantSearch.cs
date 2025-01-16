using Data;
using Data.DTOs;
using DataAccess.AuxClasses;

namespace DataAccess.Interfaces
{
    public interface IPlantSearch : ISearch<string, HashSet<int>>
    {
        Task<IEnumerable<PlantDto>> GetPlantsAsync(IEnumerable<int> plantsName);
    }
}
