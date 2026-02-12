using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class IdentityUserLoginConfiguration : IEntityTypeConfiguration<IdentityUserLogin<string>>
{
    public void Configure(EntityTypeBuilder<IdentityUserLogin<string>> builder)
    {
        builder.ToTable("user_logins");

        builder.HasKey(x => new { x.LoginProvider, x.ProviderKey });

        builder.Property(x => x.LoginProvider)
               .HasColumnName("login_provider");

        builder.Property(x => x.ProviderKey)
               .HasColumnName("provider_key");

        builder.Property(x => x.ProviderDisplayName)
               .HasColumnName("provider_display_name");

        builder.Property(x => x.UserId)
               .HasColumnName("user_id");
        
        builder.HasOne<ApplicationUser>()
            .WithMany()
            .HasForeignKey(e => e.UserId)
            .IsRequired();
    }
}
