using BBWM.Core.Membership.DTO;
using BQ.Authorization.DTO;
using BQ.Authorization.Jwt;
using BQ.Authorization.Services.Interfaces;
using Data.DTOs;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;

namespace WebAdminAPI.Controllers;

[ApiController]
[Route("api/account")]
public class AccountController : ControllerBase
{
    private readonly IAuthenticateService _authenticteService;
    private readonly IJwtService _jwtService;
    private readonly IUserService _userService;

    public AccountController(IAuthenticateService authenticateService, IUserService userService, IJwtService jwtService)
    {
        _authenticteService = authenticateService;
        _userService = userService;
        _jwtService = jwtService;
    }
    
    [HttpPost]
    [Route("register")]
    public async Task<IActionResult> Register([FromBody] UserDTO userDto, CancellationToken ct = default)
        => Ok(await _userService.Register(userDto, ct));
    
    
    [HttpPost]
    [Route("confirm")]
    public async Task<IActionResult> Confirm([FromBody] AccountConfirmationDTO accountConfirmationDto, CancellationToken ct = default)
    {
        await _userService.Confirm(accountConfirmationDto, ct);
        return Ok();
    }

    [HttpPost]
    [Route("login")]
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

   

    [HttpGet]
    [Route("token")]
    public IActionResult GetToken()
    {
        var x = User;
        return Ok(_jwtService.GenerateToken(User.Identity.Name));
    } 
        
}
