using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using Data.DTOs;
using Exceptions;

namespace WebAPI.Controllers;

[ApiController]
[Route("api/app")]
public class AppsController : ControllerBase
{
    private readonly IAppService _appService;


    public AppsController(IAppService appService)
    {
        _appService = appService;
    }

    [HttpGet("getapp")]
    public async Task<IActionResult> SearchAppById([FromQuery] int id)
    {
       try
        {
            var app = await _appService.GetAppByIdAsync(id);
            return Ok(app);
        }
        catch (AppNotFoundException ex)
        {
            return Conflict(new { message = ex.Message }); 
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Ocurrió un error al obtener la aplicación.", details = ex.Message });
        }
    }

    [HttpGet("listapps")]
    public async Task<IActionResult> SearchApp()
    {
        try
        {
            var apps = await _appService.GetAppsAsync();
            return Ok(apps);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Ocurrió un error.", details = ex.Message });
        }
    }

}

