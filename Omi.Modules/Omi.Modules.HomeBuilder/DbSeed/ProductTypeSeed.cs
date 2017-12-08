using Microsoft.EntityFrameworkCore;
using Omi.Base;
using Omi.Extensions;
using Omi.Modules.Ecommerce.Seed;
using Omi.Modules.ModuleBase.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Omi.Modules.HomeBuilder.DbSeed
{
    public class ProductTypeSeed : IDbSeed
    {
        public static TaxonomyEntity Armchair = new TaxonomyEntity
        {
            Name = "product-type-armchair",
            Details = new List<TaxonomyDetail>
            {
                new TaxonomyDetail
                {
                    Label = "Armchair",
                    Language = "vi"
                },
                new TaxonomyDetail
                {
                    Label = "Armchair",
                    Language = "en"
                }
            }
        };

        public static TaxonomyEntity Sofa = new TaxonomyEntity
        {
            Name = "product-type-sofa",
            Details = new List<TaxonomyDetail>
            {
                new TaxonomyDetail
                {
                    Label = "Sofa",
                    Language = "vi"
                },
                new TaxonomyDetail
                {
                    Label = "Sofa",
                    Language = "en"
                }
            }
        };

        public static TaxonomyEntity Table = new TaxonomyEntity
        {
            Name = "product-type-table",
            Details = new List<TaxonomyDetail>
            {
                new TaxonomyDetail
                {
                    Label = "Table",
                    Language = "vi"
                },
                new TaxonomyDetail
                {
                    Label = "Table",
                    Language = "en"
                },
            }
        };
        public static TaxonomyEntity SideTable = new TaxonomyEntity
        {
            Name = "product-type-sidetable",
            Details = new List<TaxonomyDetail>
            {
                new TaxonomyDetail
                {
                    Label = "Side table",
                    Language = "vi"
                },
                new TaxonomyDetail
                {
                    Label = "Side table",
                    Language = "vi"
                }
            }
        };

        public async Task SeedAsync(DbContext context)
        {
            var taxonomySet = context.Set<TaxonomyEntity>();

            Armchair.TaxonomyTypeId = BaseProductTypeSeed.ProductType.Id;
            Armchair = taxonomySet.SeedEntity(Armchair);
            Table.TaxonomyTypeId = BaseProductTypeSeed.ProductType.Id;
            Table = taxonomySet.SeedEntity(Table);
            Sofa.TaxonomyTypeId = BaseProductTypeSeed.ProductType.Id;
            Sofa = taxonomySet.SeedEntity(Sofa);
            SideTable.TaxonomyTypeId = BaseProductTypeSeed.ProductType.Id;
            SideTable = taxonomySet.SeedEntity(SideTable);

            await context.SaveChangesAsync();
        }
    }
}
