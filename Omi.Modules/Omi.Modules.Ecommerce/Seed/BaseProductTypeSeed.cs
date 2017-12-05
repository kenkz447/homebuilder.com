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

        public async Task SeedAsync(DbContext context)
        {
            var entityTypeSet = context.Set<TaxonomyType>();
            ProductType = entityTypeSet.SeedEntity(ProductType);
            await context.SaveChangesAsync();
        }
    }
}
