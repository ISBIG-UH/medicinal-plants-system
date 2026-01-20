using BQ.Authorization.Data.DTO;
using BQ.Authorization.Jwt;
using BQ.Authorization.Services.Interfaces;
using BQ.Core.Query;
using BQ.Core.Services;
using Data.DTOs;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;

namespace WebAPI.Controllers;

[ApiController]
[Route("api/user")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    
    public UserController(IUserService userService)
    {
        _userService = userService;
    }
    
    [HttpGet, Route("page")]
    public virtual async Task<IActionResult> GetPage([FromQuery] QueryCommand command, CancellationToken ct = default)
    {
        return Ok(await _userService.GetUserPage(command, ct));
    }

    

        
}