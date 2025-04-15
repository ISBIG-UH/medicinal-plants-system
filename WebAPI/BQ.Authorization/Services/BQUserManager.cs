using BQ.Authorization.Extensions;
using BQ.Authorization.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace BQ.Authorization.Services;

public class BQUserManager<TUser> : UserManager<TUser> where TUser : User
{
    public BQUserManager(
        IUserStore<TUser> store,
        IOptions<IdentityOptions> optionsAccessor,
        IPasswordHasher<TUser> passwordHasher,
        IEnumerable<IUserValidator<TUser>> userValidators,
        IEnumerable<IPasswordValidator<TUser>> passwordValidators,
        ILookupNormalizer keyNormalizer,
        IdentityErrorDescriber errors,
        IServiceProvider services,
        ILogger<UserManager<TUser>> logger)
        : base(
            store,
            optionsAccessor,
            passwordHasher,
            userValidators,
            passwordValidators,
            keyNormalizer,
            errors,
            services,
            logger)
    { }
    
    public override Task<IdentityResult> CreateAsync(TUser user)
    {
        SetAuthSecurityStamp(user);
        return base.CreateAsync(user);
    }

    public override Task<IdentityResult> CreateAsync(TUser user, string password)
    {
        SetAuthSecurityStamp(user);
        return base.CreateAsync(user, password);
    }

    private void SetAuthSecurityStamp(TUser user)
    {
        ThrowIfDisposed();
        user.AuthSecurityStamp = UserManagerExtensions.NewAuthSecurityStamp();
    }
}