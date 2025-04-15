using System.Security.Cryptography;
using System.Text;
using BQ.Authorization.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;

namespace BQ.Authorization.Extensions;


public static class UserManagerExtensions
{
    private static readonly RandomNumberGenerator _randomNumberGenerator = RandomNumberGenerator.Create();

    public static async Task UpdateAuthSecurityStampAsync<TUser>(this UserManager<TUser> userManager, TUser user)
        where TUser : User
    {
        user.AuthSecurityStamp = NewAuthSecurityStamp();
        await userManager.UpdateAsync(user);
    }

    internal static string NewAuthSecurityStamp()
    {
        var bytes = new byte[20];
        _randomNumberGenerator.GetBytes(bytes);
        return Convert.ToBase64String(bytes);
    }
    
}