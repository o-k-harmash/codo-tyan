using System.Net;

public sealed class GitHubRawService : IGitHubRawService
{
    private readonly HttpClient _http;

    public GitHubRawService(HttpClient http)
    {
        _http = http;
    }

    public async Task<string?> GetRawFileAsync(string owner, string repo, string branch, string path)
    {
        var url = $"{owner}/{repo}/{branch}/{path}";

        using var request = new HttpRequestMessage(HttpMethod.Get, url);

        using var response = await _http.SendAsync(request);

        if (response.StatusCode == HttpStatusCode.NotFound)
        {
            return null; // или throw new Exception("Not found") — зависит от UI
        }

        response.EnsureSuccessStatusCode();

        return await response.Content.ReadAsStringAsync();
    }
}