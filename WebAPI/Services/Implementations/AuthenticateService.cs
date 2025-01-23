using Services.Interfaces;
using DataAccess;
using Data.DTOs;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace Services.Implementations
{
    public class AuthenticateService : IAuthenticateService
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthenticateService(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<UserSessionDto> AuthenticateAsync(UserLogin userLogin)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == userLogin.username);
            if (user != null)
            {
                var salt = user.Salt;
                var hashPassword = PasswordUtils.HashPassword(userLogin.password, salt);

                if (hashPassword == user.PasswordHash)
                {
                    var sessionToken = GenerateSessionToken(user.UserName);
                    
                    return new UserSessionDto
                    {
                        username = user.UserName,
                        role = "Administrador",
                        sessionToken = sessionToken
                    };
                    
                }
            }

            throw new Exception($"Usted no tiene acceso al servicio solicitado");
        }

        private string GenerateSessionToken(string username)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, username),
                new Claim(ClaimTypes.Role, "Administrador")
            };

            var jwtSettings = _configuration.GetSection("Jwt");
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);


            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddMinutes(1), 
                signingCredentials: creds
            );

            var tokenHandler = new JwtSecurityTokenHandler();
            return tokenHandler.WriteToken(token); 
        }
    }
}
