using Data.DTOs;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;

namespace WebAdminAPI.Controllers;

[ApiController]
[Route("api/login")]
public class AuthenticateController : ControllerBase
{
    private readonly IAuthenticateService _authenticteService;

    public AuthenticateController(IAuthenticateService authenticateService)
    {
        _authenticteService = authenticateService;
    }

    [HttpPost]
    public async Task<IActionResult> Authenticate([FromBody] UserLogin userLogin)
    {
        try
        {
            var sessionToken = await _authenticteService.AuthenticateAsync(userLogin);
            return Ok(sessionToken);
        }
        catch (Exception ex)
        {
            return StatusCode(403, new { message = "Error al iniciar sesión.", details = ex.Message });
        }
        
    }
}
