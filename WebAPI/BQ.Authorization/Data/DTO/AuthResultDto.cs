namespace BQ.Authorization.Data.DTO;

public class AuthResultDto
{
    public string UserId { get; set; }
    public UserDto LoggedUser { get; set; }
    public string SessionToken { get; set; }
}
