using Microsoft.AspNetCore.Identity;

public class ApplicationUserLogin : IdentityUserLogin<string>
{
    public ApplicationUser? User { get; set; }
}