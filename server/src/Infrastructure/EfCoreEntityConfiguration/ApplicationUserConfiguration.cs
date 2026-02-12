using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class ApplicationUserConfiguration : IEntityTypeConfiguration<ApplicationUser>
{
    public void Configure(EntityTypeBuilder<ApplicationUser> builder)
    {
        builder.ToTable("users");

        builder.Ignore(u => u.PasswordHash);
        builder.Ignore(u => u.SecurityStamp);
        builder.Ignore(u => u.ConcurrencyStamp);
        builder.Ignore(u => u.PhoneNumber);
        builder.Ignore(u => u.PhoneNumberConfirmed);
        builder.Ignore(u => u.TwoFactorEnabled);
        builder.Ignore(u => u.LockoutEnabled);
        builder.Ignore(u => u.LockoutEnd);
        builder.Ignore(u => u.AccessFailedCount);

        builder.Property(u => u.Id)
               .HasColumnName("id");

        builder.Property(u => u.UserName)
               .HasColumnName("user_name");

        builder.Property(u => u.NormalizedUserName)
               .HasColumnName("normalized_user_name");

        builder.Property(u => u.Email)
               .HasColumnName("email");

        builder.Property(u => u.NormalizedEmail)
               .HasColumnName("normalized_email");

        builder.Property(u => u.EmailConfirmed)
               .HasColumnName("email_confirmed");

        builder.Property(u => u.Avatar)
               .HasColumnName("avatar")
               .HasColumnType("bytea");
    }
}
