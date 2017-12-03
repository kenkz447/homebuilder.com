using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Omi.Modules.ModuleBase.Entities;
using Omi.Extensions;
using Omi.Base;

namespace Omi.Modules.Ecommerce.Seed
{
    public class BaseBrandSeed : IDbSeed
    {
        public static TaxonomyType ProductBrand = new TaxonomyType
        {
            Name ="ecommerce-brand"
        };

        public async Task SeedAsync(DbContext dbConext)
        {
            var taxonomyTypeSet = dbConext.Set<TaxonomyType>();
            ProductBrand = taxonomyTypeSet.SeedEntity(ProductBrand);

            await dbConext.SaveChangesAsync();
        }
    }
}
