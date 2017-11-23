using Microsoft.EntityFrameworkCore;
using Omi.Data;
using Omi.Modular;
using Omi.Modules.HomeBuilder.Entities;
using Omi.Modules.ModuleBase;

namespace Omi.Modules.HomeBuilder
{
    public class HomeBuilderDbContext : ModuleBaseDbContext
    {
        public HomeBuilderDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {

        }

        public DbSet<Package> Package { get; set; }
        public DbSet<Project> Project { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.RegisterCustomMappings<HomeBuilderModelBuilder>();
            base.OnModelCreating(builder);
        }
    }
}
