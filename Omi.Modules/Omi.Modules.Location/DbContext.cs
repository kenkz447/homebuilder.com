using Microsoft.EntityFrameworkCore;
using Omi.Data;
using Omi.Modular;
using Omi.Modules.Location.Entities;

namespace Omi.Modules.ModuleBase
{
    public class LocationDbContext : ApplicationDbContext
    {
        public LocationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {

        }

        public DbSet<GeographicaLocation> GeographicaLocation { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.RegisterCustomMappings<LocationModelBuilder>();
            base.OnModelCreating(builder);
        }
    }
}
