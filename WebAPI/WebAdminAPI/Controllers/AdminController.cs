using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using Data.DTOs;
using Exceptions;

namespace WebAdminAPI.Controllers;

[ApiController]
[Route("api/monograph")]
public class AdminController : ControllerBase
{
    private readonly IAdminService _adminService;

    public AdminController(IAdminService adminService)
    {
        _adminService = adminService;
    }

    [HttpPost]
    public async Task<IActionResult> AddPlant([FromBody] PlantDto plantDto) 
    {
        try
        {
            await _adminService.AddPlantAsync(plantDto);
            return Ok(new { message = "Planta agregada exitosamente." });
        }
        catch (PlantAlreadyExistsException ex)
        {
            return Conflict(new { message = ex.Message }); 
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Ocurrió un error al agregar la planta.", details = ex.Message });
        }
    }


    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePlant(int id)
    {
        try
        {
            await _adminService.DeletePlantAsync(id);
            return Ok(new { message = "Planta eliminada exitosamente." });
        }
        catch (PlantNotFoundException ex)
        {
            return Conflict(new { message = ex.Message }); 
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Ocurrió un error al eliminar la planta.", details = ex.Message });
        }
    }

    [HttpPut]
    public async Task<IActionResult> UpdatePlant([FromBody] PlantDto plantDto)
    {
        try
        {
            await _adminService.UpdatePlantAsync(plantDto);
            return Ok(new { message = "Planta actualizada exitosamente." });
        }
        catch (PlantNotFoundException ex)
        {
            return Conflict(new { message = ex.Message }); 
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Ocurrió un error al actualizar la planta.", details = ex.Message });
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetPlantById(int id)
    {
        try
        {
            var plant = await _adminService.GetPlantByIdAsync(id);
            return Ok(plant);
        }
        catch (PlantNotFoundException ex)
        {
            return Conflict(new { message = ex.Message }); 
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Ocurrió un error al obtener la planta.", details = ex.Message });
        }

    }
}


[ApiController]
[Route("api/search")]
public class QueryController : ControllerBase
{
    private readonly IQuerySearch<string, PlantDto> _plantQueryService;

    public QueryController(IQuerySearch<string, PlantDto> plantQueryService)
    {
        _plantQueryService = plantQueryService;
    }

    [HttpGet("plants")]
    public async Task<IActionResult> SearchPlants([FromQuery] string query)
    {
        var results = await _plantQueryService.QuerySearchAsync(query);
        return Ok(results);
    }
}
