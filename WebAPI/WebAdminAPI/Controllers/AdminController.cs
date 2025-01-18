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
        // NO SE SI AQUI SE MAPEEN LAS PROPIEDADES DIRECTAMENTE
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
}