using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class ArticleConfiguration : IEntityTypeConfiguration<Article>
{
    public void Configure(EntityTypeBuilder<Article> builder)
    {
        builder.ToTable("articles");

        builder.HasKey(a => a.Id);

        builder.Property(a => a.Id)
            .HasColumnName("id")
            .HasColumnType("uuid")
            .HasDefaultValueSql("gen_random_uuid()")
            .ValueGeneratedOnAdd();

        builder.Property(a => a.Title)
            .HasColumnName("title")
            .IsRequired();
        
        builder.Property(a => a.Slug)
            .HasColumnName("slug")
            .IsRequired();

        builder.HasIndex(a => a.Slug)
            .IsUnique();

        builder.Property(a => a.Description)
            .HasColumnName("description")
            .IsRequired();

        builder.HasMany(a => a.Tags)
               .WithMany()
               .UsingEntity<Dictionary<string, object>>(
                "article_tags",
                r => r.HasOne<Tag>()
                      .WithMany()
                      .HasForeignKey("tag_id")
                      .HasConstraintName("fk_article_tags_tag_id")
                      .OnDelete(DeleteBehavior.Cascade),
                l => l.HasOne<Article>()
                      .WithMany()
                      .HasForeignKey("article_id")
                      .HasConstraintName("fk_article_tags_article_id")
                      .OnDelete(DeleteBehavior.Cascade),
                j =>
                {
                    j.HasKey("article_id", "tag_id");
                    j.ToTable("article_tags");
                });
    }
}
