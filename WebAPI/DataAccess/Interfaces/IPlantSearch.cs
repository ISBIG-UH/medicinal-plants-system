using Data;
using Data.DTOs;
using DataAccess.AuxClasses;

namespace DataAccess.Interfaces
{
    public interface IPlantSearch : ISearch<string, IEnumerable<(int PlantId, List<TermValue> TermValues)>>
    {
        Task<IEnumerable<PlantDto>> GetPlantsAsync(IEnumerable<int> plantsName);
    }
}
