using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/user")]
public class UserController : Controller
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly ITokenService _tokenService;

    public UserController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, ITokenService tokenService)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _tokenService = tokenService;
    }

    [HttpGet("login")]
    public IActionResult Login([FromQuery] string returnUrl)
    {
        if (!Url.IsLocalUrl(returnUrl))
        {
            return BadRequest("Return url must be local");
        }

        var properties = new AuthenticationProperties
        {
            RedirectUri = Url.Action(nameof(GitHubCallback)),
            Items =
            {
                { "returnUrl", returnUrl }
            }
        };

        return Challenge(properties, "GitHub");
    }

    [HttpGet("github-callback")]
    public async Task<IActionResult> GitHubCallback()
    {
        var info = await _signInManager.GetExternalLoginInfoAsync();
        if (info == null)
        {
            return BadRequest("External login failed"); 
        }

        var user = await _userManager.FindByLoginAsync(
            info.LoginProvider,
            info.ProviderKey);

        if (user == null)
        {
            var email = info.Principal.FindFirstValue(ClaimTypes.Email);
            var username = info.Principal.FindFirstValue(ClaimTypes.Name);
            var githubId = info.ProviderKey;
            var avatarUrl = info.Principal.FindFirst("avatar_url")?.Value;

            byte[]? avatarBytes = null;

            if (!string.IsNullOrEmpty(avatarUrl))
            {
                using var http = new HttpClient();
                avatarBytes = await http.GetByteArrayAsync(avatarUrl);
            }

            user = new ApplicationUser
            {
                UserName = username ?? $"github_{githubId}",
                Email = email,
                EmailConfirmed = email != null,
                Avatar = avatarBytes
            };

            var createResult = await _userManager.CreateAsync(user);
            if (!createResult.Succeeded)
            {
                return BadRequest(createResult.Errors);
            }

            var addLoginResult = await _userManager.AddLoginAsync(user, info);
            if (!addLoginResult.Succeeded)
            {
                return BadRequest(addLoginResult.Errors);
            }
        }

        var accessToken = _tokenService.GenerateAccessToken(user, info);

        Response.Cookies.Append("access_token", accessToken, new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Lax,
            Expires = DateTimeOffset.UtcNow.AddMinutes(30)
        });

        await HttpContext.SignOutAsync(IdentityConstants.ExternalScheme);

        return Redirect($"http://localhost:5173{info.AuthenticationProperties?.Items["returnUrl"]}");
    }

    [HttpGet("logout")]
    public async Task<IActionResult> Logout()
    {
        Response.Cookies.Delete("access_token", new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Lax,
        });

        return Ok();
    }

    [Authorize(AuthenticationSchemes = "JwtBearer")]
    [HttpGet("me")]
    public async Task<IActionResult> Me()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized();
        }

        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
        {
            return NotFound();
        }

        return Ok(new MeDto(user.Id, user.Email, user.FirstName, user.LastName, user.UserName, Convert.ToBase64String(user.Avatar)));
    }
}
