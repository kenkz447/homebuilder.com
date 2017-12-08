using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Omi.Modules.ModuleBase.Entities;
using Omi.Extensions;
using Omi.Base;
using System.Collections.Generic;

namespace Omi.Modules.Ecommerce.Seed
{
    public class BaseBrandSeed : IDbSeed
    {
        public static TaxonomyType ProductBrand = new TaxonomyType
        {
            Name = "ecommerce-brand"
        };

        public static TaxonomyEntity Uncategorized = new TaxonomyEntity
        {
            Name = "product-brand-uncategorized",
            Details = new List<TaxonomyDetail>()
            {
                new TaxonomyDetail
                {
                    Label = "Uncategorized",
                    Language = "vi"
                }
            }
        };

        public async Task SeedAsync(DbContext dbConext)
        {
            var taxonomyTypeSet = dbConext.Set<TaxonomyType>();
            ProductBrand = taxonomyTypeSet.SeedEntity(ProductBrand);

            var taxonomySet = dbConext.Set<TaxonomyEntity>();

            Uncategorized.TaxonomyTypeId = ProductBrand.Id;
            Uncategorized = taxonomySet.SeedEntity(Uncategorized);

            await dbConext.SaveChangesAsync();
        }
    }
}
