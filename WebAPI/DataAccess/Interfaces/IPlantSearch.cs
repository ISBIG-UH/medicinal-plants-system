using Data;
using DataAccess.AuxClasses;

namespace DataAccess.Interfaces
{
    public interface IPlantSearch : ISearch<string, IEnumerable<(string PlantName, List<TermValue> TermValues)>>
    {
        Task<IEnumerable<Plant>> GetPlantsAsync(IEnumerable<string> plantsName);
    }
}
