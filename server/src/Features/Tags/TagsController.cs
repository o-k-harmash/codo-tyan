using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class TagsController: ControllerBase
{
    private readonly AppDbContext _dbContext;

    public TagsController(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    public async Task<string[]> GetTags()
    {
        var tags = await _dbContext.Tags.Select((tag) => tag.Id).ToArrayAsync();
        return tags;
    }
}