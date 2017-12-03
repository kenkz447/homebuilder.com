using Microsoft.EntityFrameworkCore;
using Omi.Base;
using Omi.Extensions;
using Omi.Modules.ModuleBase.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Omi.Modules.HomeBuilder.DbSeed
{
    public class DesignThemeSeed : IDbSeed
    {
        public static TaxonomyType DesignTheme = new TaxonomyType
        {
            Name = "package-design-theme"
        };

        public static TaxonomyEntity Classic = new TaxonomyEntity
        {
            Name = "design-theme-classic",
            Details = new List<TaxonomyDetail>
            {
                new TaxonomyDetail
                {
                    Label = "Cổ điển",
                    Language = "vi"
                }
            }
        };
        public static TaxonomyEntity Modern = new TaxonomyEntity
        {
            Name = "design-theme-modern",
            Details = new List<TaxonomyDetail>
            {
                new TaxonomyDetail
                {
                    Label = "Hiện đại",
                    Language = "vi"
                }
            }
        };

        public async Task SeedAsync(DbContext context)
        {
            var entityTypeSet = context.Set<TaxonomyType>();
            DesignTheme = entityTypeSet.SeedEntity(DesignTheme);

            Classic.TaxonomyTypeId = DesignTheme.Id;
            Modern.TaxonomyTypeId = DesignTheme.Id;

            var taxonomySet = context.Set<TaxonomyEntity>();

            Classic = taxonomySet.SeedEntity(Classic);
            Modern = taxonomySet.SeedEntity(Modern);

            await context.SaveChangesAsync();
        }
    }
}