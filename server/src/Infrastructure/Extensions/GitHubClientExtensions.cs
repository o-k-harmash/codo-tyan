public static class GitHubClientExtensions
{
    public static IServiceCollection AddGitHubRawClient(
        this IServiceCollection services,
        IConfiguration config)
    {
        var baseUrl = config["GITHUB_BASE_URL"] ?? "https://raw.githubusercontent.com/";

        services.AddHttpClient<IGitHubRawService, GitHubRawService>(client =>
        {
            client.BaseAddress = new Uri(baseUrl);
            client.Timeout = TimeSpan.FromSeconds(5);

            client.DefaultRequestHeaders.Accept.ParseAdd("application/vnd.github.raw+json");
        });

        return services;
    }
}