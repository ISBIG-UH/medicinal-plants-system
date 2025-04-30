using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace BQ.Server.Api;

public class UserController : ControllerBase
{
    [HttpGet]
    [Route("token")]
    public IActionResult GetToken()
    {
        return Ok("Token");
    } 
}