using DataAccess;
using DataAccess.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;

[ApiController]
[Route("api/listplants")]
public class ListPlantsController : ControllerBase
{
    private readonly IAdminService _adminService;

    public ListPlantsController(IAdminService adminService)
    {
       _adminService = adminService;
    }

    [HttpGet]
    public async Task<IActionResult> ListPlants()
    {
        var results = await _adminService.GetAllPLantsAsync();
        return Ok(results);
    }
}