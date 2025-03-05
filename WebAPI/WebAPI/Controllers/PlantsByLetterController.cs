using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace WebAdminAPI.Controllers;

[ApiController]
[Route("api/index")]
public class PlantsByLetterController : ControllerBase
{
    private readonly IAdminService _adminService;

    public PlantsByLetterController(IAdminService adminService)
    {
        _adminService = adminService;
    }

    [HttpGet("{letter}")]
    public async Task<IActionResult> GetPlantsByLetter(string letter)
    {
        try
        {
            var plants = await _adminService.GetPlantsByFirstLetterAsync(letter);
            return Ok(plants);
        }
        catch (Exception ex)
        {
            if(ex.GetType().FullName == "Exceptions.PlantNotFoundException")
            {
                return NotFound(new { message = ex.Message }); 
            }
            else
            {
                return StatusCode(500, new { message = "Ocurrió un error.", details = ex.Message });
            }
        }
    }
}
