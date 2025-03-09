using BBWM.Core.Membership.DTO;
using BQ.Authorization.Services.Interfaces;
using Data.DTOs;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;

namespace WebAdminAPI.Controllers;

[ApiController]
[Route("api/login")]
public class AuthenticateController : ControllerBase
{
    private readonly IAuthenticateService _authenticteService;
    private readonly IUserService _userService;

    public AuthenticateController(IAuthenticateService authenticateService, IUserService userService)
    {
        _authenticteService = authenticateService;
        _userService = userService;
    }

    [HttpPost]
    public async Task<IActionResult> Authenticate([FromBody] LoginDTO loginDto)
    {
        try
        {
            return Ok(await _userService.Login(loginDto));
        }
        catch (Exception ex)
        {
            return StatusCode(403, new { message = "Error al iniciar sesión.", details = ex.Message });
        }
        
    }
}
