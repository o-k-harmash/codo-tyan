using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class ArticlesController: ControllerBase
{
    private readonly AppDbContext _dbContext;

    public ArticlesController(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    public async Task<PaginatedArticlesDto> GetArticles(
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
            .Select(a => new ArticleDto(
                a.Id.ToString(),
                a.Title,
                a.Description,
                a.Tags.Select(t => t.Id).ToArray()
            ))
            .ToArrayAsync();

        return new PaginatedArticlesDto(totalPages, articles);
    }
}