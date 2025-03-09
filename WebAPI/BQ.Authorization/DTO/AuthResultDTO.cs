namespace BQ.Authorization.DTO;

public class AuthResultDTO
{
    public string UserId { get; set; }
    public UserDTO LoggedUser { get; set; }
    public string SessionToken { get; set; }
}
