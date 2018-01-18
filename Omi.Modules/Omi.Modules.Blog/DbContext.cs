using Microsoft.EntityFrameworkCore;
using Omi.Data;
using Omi.Modular;
using Omi.Modules.Blog.Entities;
using Omi.Modules.FileAndMedia;
using Omi.Modules.ModuleBase.Entities;

namespace Omi.Modules.Blog
{
    public class BlogDbContext : ApplicationDbContext
    {
        public BlogDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {

        }

        public DbSet<BlogEntity> BlogEntity { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.RegisterCustomMappings<BlogModelBuilder>();
            base.OnModelCreating(builder);
        }
    }
}