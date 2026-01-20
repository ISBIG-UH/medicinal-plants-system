namespace BQ.Authorization.Jwt;

public interface IJwtService
{
    JwtInfo GenerateToken(string username);
}
