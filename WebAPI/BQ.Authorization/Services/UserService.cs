using BBWM.Core.Membership.DTO;
using BQ.Authorization.DTO;
using BQ.Authorization.Enum;
using BQ.Authorization.Model;
using BQ.Authorization.Services.Interfaces;
using BQ.Core.Exceptions;
using BQ.Core.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;

using Microsoft.EntityFrameworkCore;

namespace BQ.Authorization.Services;

public class UserService : DataService<User, UserDTO, string>, IUserService
{
    
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;

    public UserService(
        ICrudService crudService,
        UserManager<User> userManager,
        SignInManager<User> signInManager)
        : base(crudService)
    {
        _userManager = userManager;
        _signInManager = signInManager;
    }

    
    public async Task<UserDTO> Invite(UserDTO dto, CancellationToken cancellationToken = default)
    {
        var existingUser = await _userManager.FindByEmailAsync(dto.Email);
        if (existingUser is not null)
            throw new BusinessException(existingUser.AccountStatus == AccountStatus.Suspended
                ? UserErrorMessages.EmailExistForDeleted
                : UserErrorMessages.EmailExist);

        dto.UserName = dto.Email;
        dto.AccountStatus = AccountStatus.Invited;
        
        var savingResult = await Create(dto, cancellationToken);

        var createdUser = await _userManager.FindByIdAsync(savingResult.Id);
        await _userManager.UpdateAsync(createdUser);

        return await Get(createdUser.Id, cancellationToken);
    }

    public async Task<AuthResultDTO> Login(LoginDTO dto, CancellationToken ct = default)
    {
        var user = await _userManager.Users
            .Include(u => u.Roles)
            .FirstOrDefaultAsync(u => u.Email == dto.Email, ct);

        if (user == null)
        {
            throw new BusinessException("User not found");
        }
        
        ValidateAccountStatus(user.AccountStatus);
        


        // We use SignInAsync instead of PasswordSignInAsync because SignInAsync contains custom logging logic
        await _signInManager.PasswordSignInAsync(user, dto.Password, true, false);

        var loggedUser = await Get(user.Id, ct);

        return new AuthResultDTO { UserId = user.Id, LoggedUser = loggedUser };
    }
    
    private static void ValidateAccountStatus(AccountStatus accountStatus)
    {
        switch (accountStatus)
        {
            // Check that user is invited
            case AccountStatus.Invited:
                throw new BusinessException("An invitation has not been accepted yet.");
                throw new BusinessException("Email address is not verified yet.");
            // Check that user is not suspended
            case AccountStatus.Suspended:
                throw new BusinessException("Account is suspended.");
        }
    }
}

public static class UserErrorMessages
    {
        public static readonly string LoginFailureGeneralized = "Incorrect user name or password.";
        public static readonly string LoginFailureOrOtherCredentials = "Incorrect user name, password, or other credential.";
        public static readonly string RecoveryNotFoundForUser = "Recovery code not found for the user.";
        public static readonly string RecoveryExpired = "Recovery code has expired.";
        public static readonly string RecoveryInvalid = "Recovery code is invalid.";
        public static readonly string ActivationCompleted = "Activation already completed.";
        public static readonly string ActivationCodeInvalid = "Activation code is invalid.";
        public static readonly string InvitationNotFoundForUser = "Invitation not found for the user.";
        public static readonly string InvitationExpired = "Sorry, your link has expired. Please ask your administrator to resend the invitation.";
        public static readonly string EmailExistForDeleted = "User with this email already exists and has 'deleted' status. You should undelete the user on the user details page instead.";
        public static readonly string EmailExist = "User with this email already exists";
        public static readonly string UserNotActivatedForEmail = "User with email u.Email is not activated";
        public static readonly string UserAlreadyActivated = "User is already active.";
        public static readonly string WrongRecoveryCode = "Wrong recovery code";
        public static readonly string UndefinedEmail = "The email cannot be sent. Email address is undefined.";
    }