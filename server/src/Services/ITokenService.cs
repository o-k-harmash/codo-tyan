using Microsoft.AspNetCore.Identity;

public interface ITokenService
{
    string GenerateAccessToken(ApplicationUser user, UserLoginInfo info);
}