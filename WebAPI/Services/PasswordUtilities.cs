using System;
using System.Security.Cryptography;

namespace Services;

public class PasswordUtils
{
    public static string GenerateSalt()
    {
        using (var rng = System.Security.Cryptography.RandomNumberGenerator.Create())
        {
            byte[] saltBytes = new byte[16]; 
            rng.GetBytes(saltBytes);
            return Convert.ToBase64String(saltBytes); 
        }
    }

    public static string HashPassword(string password, string salt)
    {
        byte[] saltBytes = Convert.FromBase64String(salt);
        int iterations = 100_000;

        using (var rfc2898DeriveBytes = new Rfc2898DeriveBytes(
            password,
            saltBytes,
            iterations,
            HashAlgorithmName.SHA256
        ))
        {
            byte[] hashBytes = rfc2898DeriveBytes.GetBytes(32);
            return Convert.ToBase64String(hashBytes);
        }
    }

    public static bool VerifyPassword(string enteredPassword, string storedHash, string salt)
    {
        string enteredHash = HashPassword(enteredPassword, salt);
        return storedHash == enteredHash;
    }
}
