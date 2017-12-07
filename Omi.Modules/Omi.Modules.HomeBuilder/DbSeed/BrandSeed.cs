using Microsoft.EntityFrameworkCore;
using Omi.Base;
using Omi.Extensions;
using Omi.Modules.Ecommerce.Seed;
using Omi.Modules.ModuleBase.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Omi.Modules.HomeBuilder.DbSeed
{
    public class BrandSeed : IDbSeed
    {
        public static TaxonomyEntity Curator9102 = new TaxonomyEntity
        {
            Name = "product-brand-curator",
            Details = new List<TaxonomyDetail>
            {
                new TaxonomyDetail
                {
                    Label = "Curator9102",
                    Language = "vi"
                },
            }
        };

        public async Task SeedAsync(DbContext context)
        {
            var taxonomySet = context.Set<TaxonomyEntity>();

            Curator9102.TaxonomyTypeId = BaseBrandSeed.ProductBrand.Id;
            Curator9102 = taxonomySet.SeedEntity(Curator9102);

            await context.SaveChangesAsync();
        }
    }
}
