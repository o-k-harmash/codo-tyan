public interface IGitHubRawService
{
    Task<string?> GetRawFileAsync( string owner, string repo, string branch, string path);
}