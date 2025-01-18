using Data.DTOs;

namespace DataAccess.Interfaces
{
    public interface ICrudOperation
    {
        Task PostAsync(PlantDto plantDto);
    }
}