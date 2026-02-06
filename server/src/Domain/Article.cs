public class Article
{
    public Guid Id { get; private set; }   // EF/PG UUID
    public string Title { get; private set; }
    public string Slug { get; private set; }
    public string Description { get; private set; }
    public List<Tag> Tags { get; private set; } = new();

    private Article() { }

    public Article(string slug, string title, string description, List<Tag> tags)
    {
        Slug = slug;
        Title = title;
        Description = description;
        Tags = tags;
    }
}