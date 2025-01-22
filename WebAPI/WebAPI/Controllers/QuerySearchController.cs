using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using Data.DTOs;


namespace WebAPI.Controllers;

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

