using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using Data;


namespace WebAPI.Controllers;

[ApiController]
[Route("api/search")]
public class QueryController : ControllerBase
{
    private readonly IQuerySearch<string, Plant> _plantQueryService;

    public QueryController(IQuerySearch<string, Plant> plantQueryService)
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

