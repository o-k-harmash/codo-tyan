public class Article
{
    public Guid Id { get; private set; }   // EF/PG UUID
    public string Title { get; private set; }
    public string Description { get; private set; }
    public List<Tag> Tags { get; private set; } = new();

    private Article() { }

    public Article(string title, string description, List<Tag> tags)
    {
        Title = title;
        Description = description;
        Tags = tags;
    }
}