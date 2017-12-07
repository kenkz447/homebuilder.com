using Microsoft.EntityFrameworkCore;
using Omi.Base;
using Omi.Extensions;
using Omi.Modules.ModuleBase.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Omi.Modules.Ecommerce.Seed
{
    public class BaseProductTypeSeed : IDbSeed
    {
        public static TaxonomyType ProductType = new TaxonomyType
        {
            Name = "product-type"
        };

        public static TaxonomyEntity Uncategorized = new TaxonomyEntity
        {
            Name = "product-type-uncategorized",
            Details = new List<TaxonomyDetail>()
            {
                new TaxonomyDetail
                {
                    Label = "Uncategorized",
                    Language = "vi"
                }
            }
        };

        public async Task SeedAsync(DbContext context)
        {
            var entityTypeSet = context.Set<TaxonomyType>();
            ProductType = entityTypeSet.SeedEntity(ProductType);

            var taxonomySet = context.Set<TaxonomyEntity>();

            Uncategorized.TaxonomyTypeId = ProductType.Id;
            Uncategorized = taxonomySet.SeedEntity(Uncategorized);

            await context.SaveChangesAsync();
        }
    }
}
