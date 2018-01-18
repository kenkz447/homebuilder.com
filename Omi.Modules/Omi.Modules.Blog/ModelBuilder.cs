using Microsoft.EntityFrameworkCore;
using Omi.Modular;
using Omi.Modules.Blog.Entities;

namespace Omi.Modules.Blog
{
    public class BlogModelBuilder : ICustomModelBuilder
    {
        public void Build(ModelBuilder builder)
        {
            builder.Entity<BlogEntity>()
                .HasIndex(o => o.Name);

            builder.Entity<BlogFile>()
                .HasKey(o => new { o.EntityId, o.FileEntityId });
        }
    }
}