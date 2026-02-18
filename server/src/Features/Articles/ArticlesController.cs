using System.Text.Json;
using Markdig;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;

[ApiController]
[Route("api/[controller]")]
public class ArticlesController: ControllerBase
{
    private static readonly TimeSpan Ttl = TimeSpan.FromHours(6);

    private readonly IGitHubRawService _git;
    private readonly AppDbContext _dbContext;
    private readonly MarkdownPipeline _pipeline;
    private readonly IDistributedCache _cache;

    public ArticlesController(AppDbContext dbContext, IGitHubRawService git, MarkdownPipeline pipeline, IDistributedCache cache)
    {
        _dbContext = dbContext;
        _git = git;
        _pipeline = pipeline;
        _cache = cache;
    }

    [HttpGet]
    [Route("list")]
    public async Task<PaginatedArticleSummaryDto> GetArticles(
        [FromQuery] int page = 0,
        [FromQuery] int limit = 10,
        [FromQuery] string[]? tags = null)
    {
        IQueryable<Article> query = _dbContext.Articles;

        if (tags != null && tags.Length > 0)
        {
            query = query.Where(a => a.Tags.Any(t => tags.Contains(t.Id)));
        }

        int totalCount = await query.CountAsync();
        int totalPages = (int)Math.Ceiling(totalCount / (double)limit);

        var articles = await query
            .Skip(page * limit)
            .Take(limit)
            .Select(a => new ArticleSummaryDto(
                a.Id.ToString(),
                a.Slug,
                a.Title,
                a.Description,
                a.Tags.Select(t => t.Id).ToArray()
            ))
            .ToArrayAsync();

        return new PaginatedArticleSummaryDto(totalPages, articles);
    }

    [HttpGet]
    [Route("{slug}")]
    public async Task<ActionResult<ArticleDetailDto>> GetArticle(string slug)
    {
        var key = $"article:detail:v1:{slug}";
        var cachedJson = await _cache.GetStringAsync(key);

        if (!string.IsNullOrEmpty(cachedJson))
        {
            var cached = JsonSerializer.Deserialize<ArticleDetailDto>(cachedJson);
            if (cached != null)
            {
                return Ok(cached);
            }
        }

        var article = await _dbContext.Articles
            .AsNoTracking()
            .SingleOrDefaultAsync(a => a.Slug == slug);

        if (article == null)
        {
            return NotFound();
        }

        var markdownText = await _git.GetRawFileAsync(
            "o-k-harmash",
            "codo-tyan-articles",
            "main",
            $"{slug}.md"
        );

        if (markdownText == null)
        {
            return NotFound();
        }

        var html = Markdown.ToHtml(markdownText, _pipeline);

        var model = new ArticleDetailDto(
            article.Id.ToString(),
            article.Slug,
            article.Title,
            html
        );

        var json = JsonSerializer.Serialize(model);
        await _cache.SetStringAsync(key, json, new DistributedCacheEntryOptions
        {
            AbsoluteExpirationRelativeToNow = Ttl
        });

        return Ok(model);
    }
}