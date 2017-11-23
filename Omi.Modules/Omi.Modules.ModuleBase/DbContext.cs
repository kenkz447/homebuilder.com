using Microsoft.EntityFrameworkCore;
using Omi.Data;
using Omi.Modular;
using Omi.Modules.ModuleBase.Entities;
using System.Collections.Generic;

namespace Omi.Modules.ModuleBase
{
    public class ModuleBaseDbContext : ApplicationDbContext
    {
        public ModuleBaseDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {

        }

        public DbSet<EntityType> EntityType { get; set; }
        public DbSet<TaxonomyType> TaxonomyType { get; set; }
        public DbSet<TaxonomyEntity> TaxonomyEntity { get; set; }
        public DbSet<TaxonomyDetail> TaxonomyDetail { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.RegisterCustomMappings<ModuleBaseModelBuilder>();
            base.OnModelCreating(builder);
        }
    }
}
