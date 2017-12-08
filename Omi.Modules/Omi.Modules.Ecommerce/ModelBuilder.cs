using Microsoft.EntityFrameworkCore;
using Omi.Modular;
using Omi.Modules.Ecommerce.Product.Entities;

namespace Omi.Modules.Ecommerce
{
    public class EcommerceModelBuilder : ICustomModelBuilder
    {
        public void Build(ModelBuilder builder)
        {
            builder.Entity<ProductEntity>()
                .HasIndex(o => o.Name);

            builder.Entity<ProductTaxonomy>()
                .HasKey(o => new { o.EntityId, o.TaxonomyId });

            builder.Entity<ProductFile>()
                .HasKey(o => new { o.EntityId, o.FileEntityId });
        }
    }
}