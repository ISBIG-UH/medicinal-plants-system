using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using Data.DTOs;
using Exceptions;
using Microsoft.AspNetCore.Authorization;

namespace WebAdminAPI.Controllers;

[ApiController]
[Authorize]
[Route("api/app")]
public class AppController : ControllerBase
{
    private readonly IAppService _appService;

    public AppController(IAppService appService)
    {
        _appService = appService;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetApp(int id)
    {
        try
        {
            var app = await _appService.GetAppByIdAsync(id);
            return Ok(app);
        }
        catch (Exception ex)
        {
            if (ex.GetType().FullName == "Exceptions.AppNotFoundException")
            {
                return NotFound(new { message = ex.Message }); 
            }
            else
            {
                return StatusCode(500, new { message = "Ocurrió un error al obtener la aplicación.", details = ex.Message });
            }
        }

    }


    [HttpPost]
    public async Task<IActionResult> AddApp([FromBody] AppDto appDto)
    {
        try
        {
            await _appService.AddAppAsync(appDto);
            return Ok(new { message = "App agregada exitosamente." });
        }
        catch (Exception ex)
        {
            if (ex.GetType().FullName == "Exceptions.AppAlreadyExistsException")
            {
                return Conflict(new { message = ex.Message }); 
            }
            else
            {
                return StatusCode(500, new { message = "Ocurrió un error al agregar la app.", details = ex.Message });
            }
        }
    }


    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteApp(int id)
    {
        try
        {
            await _appService.DeleteAppAsync(id);
            return Ok(new { message = "App eliminada exitosamente." });
        }
        catch (Exception ex)
        {
            if (ex.GetType().FullName == "Exceptions.AppNotFoundException")
            {
                return NotFound(new { message = ex.Message }); 
            }
            else
            {
                return StatusCode(500, new { message = "Ocurrió un error al eliminar la app.", details = ex.Message });
            }
        }
    }


    [HttpPut]
    public async Task<IActionResult> UpdateApp([FromBody] AppDto appDto)
    {
        try
        {
            await _appService.UpdateAppAsync(appDto);
            return Ok(new { message = "App actualizada exitosamente." });
        }
        catch (Exception ex)
        {
            if (ex.GetType().FullName == "Exceptions.AppNotFoundException")
            {
                return NotFound(new { message = ex.Message }); 
            }
            else
            {
                return StatusCode(500, new { message = "Ocurrió un error al actualizar la app.", details = ex.Message });
            }
        }
    }
}


[ApiController]
[Authorize]
[Route("api/listapps")]
public class AppsController : ControllerBase
{
    private readonly IAppService _appService;

    public AppsController(IAppService appService)
    {
        _appService = appService;
    }

    [HttpGet]
    public async Task<IActionResult> GetApps()
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