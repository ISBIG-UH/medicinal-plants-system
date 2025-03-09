using BQ.Authorization.Enum;
using BQ.Authorization.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BQ.Authorization.ModelConfiguration;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.HasOne(x => x.Company).WithMany().HasForeignKey(x => x.CompanyId).OnDelete(DeleteBehavior.SetNull);
        builder.Property(p => p.Id).HasMaxLength(255).ValueGeneratedOnAdd();
        builder.Property(p => p.FirstName).HasMaxLength(35);
        builder.Property(p => p.LastName).HasMaxLength(35);
        builder.Property(p => p.PhoneNumber).HasMaxLength(20);
        builder.Property(p => p.AccountStatus);
        builder.Property(x => x.SecurityStamp).HasMaxLength(256);
        builder.Property(x => x.PasswordHash).HasMaxLength(256);
        builder.Property(x => x.ConcurrencyStamp).HasMaxLength(256);
    }
}
