public class Tag
{
    public string Id { get; private set; }

    private Tag() { }

    public Tag(string id)
    {
        Id = id;
    }
}