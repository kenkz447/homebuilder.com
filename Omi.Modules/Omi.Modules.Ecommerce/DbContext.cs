using Microsoft.EntityFrameworkCore;
using Omi.Data;
using Omi.Modular;
using Omi.Modules.Ecommerce.Product.Entities;
using Omi.Modules.FileAndMedia;
using Omi.Modules.ModuleBase.Entities;

namespace Omi.Modules.Ecommerce
{
    public class EcommerceDbContext : ApplicationDbContext
    {
        public EcommerceDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {

        }

        public DbSet<ProductEntity> ProductEntity { get; set; }
        public DbSet<TaxonomyEntity> TaxonomyEntity { get; set; }
        public DbSet<TaxonomyDetail> TaxonomyDetail { get; set; }
        public DbSet<TaxonomyType> TaxonomyType { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.RegisterCustomMappings<ModuleBaseModelBuilder>();
            builder.RegisterCustomMappings<EcommerceModelBuilder>();
            base.OnModelCreating(builder);
        }
    }
}