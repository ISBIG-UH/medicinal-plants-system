using BQ.Authorization.Data.DTO;
using BQ.Authorization.Data.Enum;
using BQ.Authorization.Data.Model;
using BQ.Authorization.Jwt;
using BQ.Authorization.Services.Interfaces;
using BQ.Core.Exceptions;
using BQ.Core.Services;
using CQ.Core;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;

using Microsoft.EntityFrameworkCore;

namespace BQ.Authorization.Services;

public class UserService : DataService<User, UserDto, string>, IUserService
{
    
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;
    private readonly IJwtService _jwtService;
    private readonly RoleManager<Role> _roleManager;

    public UserService(
        ICrudService crudService,
        UserManager<User> userManager,
        SignInManager<User> signInManager,
        RoleManager<Role> roleManager,
        IJwtService jwtService
        )
        : base(crudService)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _jwtService = jwtService;
        _roleManager = roleManager;
    }

    public async Task<UserDto> Create(UserDto dto, CancellationToken ct)
    {
        dto = BeforeUserSave(dto);
        var user = _crudService.Mapper.Map<User>(dto);
        await _userManager.CreateAsync(user);

        await AfterUserSave(user, dto, ct);
        return await Get(user.Id, ct);
    }

    public UserDto BeforeUserSave(UserDto dto)
    {
        dto.Email = dto.Email.Trim();
        dto.UserName = dto.UserName?.Trim();
        dto.FirstName = dto.FirstName?.Trim();
        dto.LastName = dto.LastName?.Trim();
        dto.PhoneNumber = dto.PhoneNumber?.Trim();

        return dto;
    }
    
    private async Task AfterUserSave(User user, UserDto dto, CancellationToken cancellationToken)
    {
        await UpdateUserRoles(user, dto.Roles.Select(x => x.Id), cancellationToken);
    }
    
    private async Task UpdateUserRoles(User user, IEnumerable<string> newRolesIds, CancellationToken cancellationToken)
    {
        newRolesIds = newRolesIds.ToList();
        var existingRoles = _crudService.Context.Set<UserRole>()
            .Include(x => x.Role)
            .Where(x => x.UserId == user.Id);

        foreach (var existingRole in existingRoles)
        {
            if (newRolesIds.All(x => x != existingRole.RoleId))
            {
                await _userManager.RemoveFromRoleAsync(user, existingRole.Role.Name);
            }
        }

        foreach (var newRoleId in newRolesIds)
        {
            if (await existingRoles.AllAsync(x => x.RoleId != newRoleId, cancellationToken))
            {
                var role = await _roleManager.FindByIdAsync(newRoleId);
                await _userManager.AddToRoleAsync(user, role.Name);
            }
        }
    }

    public async Task<UserDto> Register(UserDto dto, CancellationToken ct)
    {
        var role = await _crudService.Context.Set<Role>().FirstOrDefaultAsync(x => x.Name == Roles.DataCuratorRole);

        dto.Roles = new List<RoleDto>() { new RoleDto() { Id = role.Id } };
        return await Invite(dto, ct);
    }

    public async Task Confirm(AccountConfirmationDto dto, CancellationToken ct = default)
    {
        var user = await _userManager.FindByIdAsync(dto.UserId);
        
        if (user is null)
            throw new BusinessException("El usuario no existe");
        
        if (user.EmailConfirmed)
            throw new BusinessException("La cuenta ya ha sido confirmada");

        if (user.ActivationToken != dto.Token || DateTime.Today > user.ActivationTokenExpiration)
            throw new BusinessException("El código de invitación ya ha expirado");

        if (dto.Password != dto.PasswordConfirmation)
            throw new BusinessException("Las contraseñas provistas no coinciden");

        user.EmailConfirmed = true;
        user.ActivationToken = null;
        user.ActivationTokenExpiration = null;

        var result = await _userManager.AddPasswordAsync(user, dto.Password);
        
        if (!result.Succeeded)
            throw new BusinessException("La contraseña provista no cumple los requisitos de seguridad establecidos.");
        
        await _userManager.UpdateAsync(user);
    }

    public async Task<UserDto> Invite(UserDto dto, CancellationToken cancellationToken = default)
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
       
        GenerateUserConfirmationToken(createdUser);
        await _userManager.UpdateAsync(createdUser);
        
        return await Get(createdUser.Id, cancellationToken);
    }

    public async Task<AuthResultDto> Login(LoginDto dto, CancellationToken ct = default)
    {
        var user = await _userManager.Users
            .Include(u => u.UserRoles)
            .FirstOrDefaultAsync(u => u.Email == dto.Email, ct);

        if (user == null)
        {
            throw new BusinessException("User not found");
        }
        
        ValidateAccountStatus(user.AccountStatus);
        
        // We use SignInAsync instead of PasswordSignInAsync because SignInAsync contains custom logging logic
        var result = await _signInManager.PasswordSignInAsync(user, dto.Password, true, false);

        UserDto loggedUser = null;
        
        if (result.Succeeded)
        {
            loggedUser = await Get(user.Id, ct);
        }
        else
        {
            throw new BusinessException("Credenciales incorrectas");
        }

        
       
        
        return new AuthResultDto { UserId = loggedUser.Id, LoggedUser = loggedUser, SessionToken = ""};
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

    private void GenerateUserConfirmationToken(User user)
    {
        user.ActivationToken = Guid.NewGuid().ToString();
        user.ActivationTokenExpiration = DateTime.Today.ToUniversalTime() + TimeSpan.FromDays(7);
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
        public static readonly string EmailExist = "Un usuario con este email ya existe.";
        public static readonly string UserNotActivatedForEmail = "User with email u.Email is not activated";
        public static readonly string UserAlreadyActivated = "User is already active.";
        public static readonly string WrongRecoveryCode = "Wrong recovery code";
        public static readonly string UndefinedEmail = "The email cannot be sent. Email address is undefined.";
    }