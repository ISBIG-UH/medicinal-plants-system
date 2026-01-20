namespace BQ.Authorization.Data.DTO;

public class AccountConfirmationDto
{
    public string UserId { get; set; }
    public string Token { get; set; }
    public string Password { get; set; }
    public string PasswordConfirmation { get; set; }
}