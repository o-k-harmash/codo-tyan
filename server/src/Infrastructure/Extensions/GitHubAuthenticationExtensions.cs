using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text.Json;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.AspNetCore.Identity;

public static class GitHubAuthenticationExtensions
{
    public static IServiceCollection AddGitHubAuth(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddAuthentication(options =>
        {
            options.DefaultScheme = IdentityConstants.ExternalScheme;
            options.DefaultChallengeScheme = "GitHub";
        })
        .AddCookie(IdentityConstants.ExternalScheme)
        .AddOAuth("GitHub", options =>
        {
            options.ClientId = configuration["GitHub:ClientId"];
            options.ClientSecret = configuration["GitHub:ClientSecret"];
            options.CallbackPath = new PathString(configuration["GitHub:CallbackPath"]);
            options.AuthorizationEndpoint = configuration["GitHub:AuthorizationEndpoint"];
            options.TokenEndpoint = configuration["GitHub:TokenEndpoint"];
            options.UserInformationEndpoint = configuration["GitHub:UserInformationEndpoint"];
            options.Scope.Add("user:email");

            options.ClaimActions.MapJsonKey(ClaimTypes.NameIdentifier, "id");
            options.ClaimActions.MapJsonKey(ClaimTypes.Name, "login");
            options.ClaimActions.MapJsonKey(ClaimTypes.Email, "email");
            options.ClaimActions.MapJsonKey("avatar_url", "avatar_url");

            options.SignInScheme = IdentityConstants.ExternalScheme;

            options.Events = new OAuthEvents
            {
                OnCreatingTicket = async context =>
                {
                    var request = new HttpRequestMessage(HttpMethod.Get, context.Options.UserInformationEndpoint);
                    request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", context.AccessToken);
                    request.Headers.Add("User-Agent", "ASP.NET Core OAuth");

                    var response = await context.Backchannel.SendAsync(request);
                    response.EnsureSuccessStatusCode();

                    using var user = JsonDocument.Parse(await response.Content.ReadAsStringAsync());
                    context.RunClaimActions(user.RootElement);
                    context.Properties.Items["LoginProvider"] = context.Options.ClaimsIssuer ?? "GitHub";
                }
            };
        });

        return services;
    }
}
