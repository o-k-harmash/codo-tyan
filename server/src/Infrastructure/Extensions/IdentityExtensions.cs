
using Microsoft.AspNetCore.Identity;

public static class IdentityExtensions
{
    public static IServiceCollection AddCustomIdentity(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddIdentityCore<ApplicationUser>(options =>
        {
            options.Password.RequireDigit = bool.Parse(configuration["Identity:Password:RequireDigit"]);
            options.Password.RequiredLength = int.Parse(configuration["Identity:Password:RequiredLength"]);
            options.Password.RequireNonAlphanumeric = bool.Parse(configuration["Identity:Password:RequireNonAlphanumeric"]);
            options.Password.RequireUppercase = bool.Parse(configuration["Identity:Password:RequireUppercase"]);
            options.Password.RequireLowercase = bool.Parse(configuration["Identity:Password:RequireLowercase"]);
        })
        .AddSignInManager()
        .AddEntityFrameworkStores<AppDbContext>();

        return services;
    }
}

