using Microsoft.EntityFrameworkCore;
using Omi.Base;
using Omi.Extensions;
using Omi.Modules.ModuleBase.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Omi.Modules.HomeBuilder.DbSeed
{
    public class HouseStyleSeed : IDbSeed
    {
        public static TaxonomyType HouseStyle = new TaxonomyType
        {
            Name = "package-house-style"
        };

        public static TaxonomyEntity Apartment = new TaxonomyEntity
        {
            Name = "house-style-apartment",
            Details = new List<TaxonomyDetail>
            {
                new TaxonomyDetail
                {
                    Label = "Căn hộ",
                    Language = "vi"
                }
            }
        };

        public static TaxonomyEntity LandedHouse = new TaxonomyEntity
        {
            Name = "house-style-landed-house",
            Details = new List<TaxonomyDetail>
            {
                new TaxonomyDetail
                {
                    Label = "Landed House",
                    Language = "vi"
                }
            }
        };

        public async Task SeedAsync(DbContext context)
        {
            var entityTypeSet = context.Set<TaxonomyType>();

            var desingTheme = await entityTypeSet.FirstOrDefaultAsync(o => o.Name == HouseStyle.Name);
            if (desingTheme == null)
                HouseStyle = entityTypeSet.Add(HouseStyle).Entity;
            else
                HouseStyle = desingTheme;

            Apartment.TaxonomyTypeId = HouseStyle.Id;
            LandedHouse.TaxonomyTypeId = HouseStyle.Id;

            var taxonomySet = context.Set<TaxonomyEntity>();

            Apartment = taxonomySet.SeedEntity(Apartment);
            LandedHouse = taxonomySet.SeedEntity(LandedHouse);

            await context.SaveChangesAsync();
        }
    }
}