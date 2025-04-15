namespace BQ.Authorization.DTO;

public class AccountConfirmationDTO
{
    public string UserId { get; set; }
    public string Token { get; set; }
    public string Password { get; set; }
    public string PasswordConfirmation { get; set; }
}