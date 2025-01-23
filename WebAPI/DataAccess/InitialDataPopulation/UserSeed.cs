using Services;
using Data;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.InitialDataPopulation
{
    public class UserSeed
    {
        private readonly AppDbContext _context;

        public UserSeed(AppDbContext context)
        {
            _context = context;
        }

        public async Task SeedUserAsync()
        {
            if (! await _context.Users.AnyAsync())
            {
                var salt = PasswordUtils.GenerateSalt();
                var passwordHash = PasswordUtils.HashPassword("phi1.618", salt);

                var user = new User
                {
                    Id = 1,
                    UserName = "Admin",
                    PasswordHash = passwordHash,
                    Salt = salt
                };

                _context.Users.Add(user);
                await _context.SaveChangesAsync();
            }

        }
    }
}