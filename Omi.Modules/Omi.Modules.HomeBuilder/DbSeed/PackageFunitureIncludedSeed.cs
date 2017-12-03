using Microsoft.EntityFrameworkCore;
using Omi.Base;
using Omi.Extensions;
using Omi.Modules.ModuleBase.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Omi.Modules.HomeBuilder.DbSeed
{
    public class PackageFunitureIncludedSeed : IDbSeed
    {
        public static TaxonomyType PackageFunitureIncludedItem = new TaxonomyType
        {
            Name = "package-funiture-include-item"
        };

        public static TaxonomyEntity LivingRoom = new TaxonomyEntity
        {
            Name = "package-livingrom",
            Details = new List<TaxonomyDetail>
            {
                new TaxonomyDetail
                {
                    Label = "Living Room",
                    Icon = "/images/package-living-rom.png",
                    Language = "vi"
                }
            }
        };
        public static TaxonomyEntity DiningRoom = new TaxonomyEntity
        {
            Name = "package-dining-room",
            Details = new List<TaxonomyDetail>
            {
                new TaxonomyDetail
                {
                    Label = "Dining Room",
                    Icon = "/images/package-dining-room.png",
                    Language = "vi"
                }
            }
        };
        public static TaxonomyEntity BedRoom = new TaxonomyEntity
        {
            Name = "package-bed-room",
            Details = new List<TaxonomyDetail>
            {
                new TaxonomyDetail
                {
                    Label = "Bed Room",
                    Icon = "/images/package-bed-room.png",
                    Language = "vi"
                }
            }
        };
        public static TaxonomyEntity KidRoom = new TaxonomyEntity
        {
            Name = "package-kid-room",
            Details = new List<TaxonomyDetail>
            {
                new TaxonomyDetail
                {
                    Label = "Kid Room",
                    Icon = "/images/package-kid-room.png",
                    Language = "vi"
                }
            }
        };

        public async Task SeedAsync(DbContext context)
        {
            var entityTypeSet = context.Set<TaxonomyType>();

            var packageIncludedItem = await entityTypeSet.FirstOrDefaultAsync(o => o.Name == PackageFunitureIncludedItem.Name);
            if (packageIncludedItem == null)
                PackageFunitureIncludedItem = entityTypeSet.Add(PackageFunitureIncludedItem).Entity;
            else
                PackageFunitureIncludedItem = packageIncludedItem;

            LivingRoom.TaxonomyTypeId = PackageFunitureIncludedItem.Id;
            DiningRoom.TaxonomyTypeId = PackageFunitureIncludedItem.Id;
            BedRoom.TaxonomyTypeId = PackageFunitureIncludedItem.Id;
            KidRoom.TaxonomyTypeId = PackageFunitureIncludedItem.Id;

            var taxonomySet = context.Set<TaxonomyEntity>();

            LivingRoom = taxonomySet.SeedEntity(LivingRoom);
            DiningRoom = taxonomySet.SeedEntity(DiningRoom);
            BedRoom = taxonomySet.SeedEntity(BedRoom);
            KidRoom = taxonomySet.SeedEntity(KidRoom);

            await context.SaveChangesAsync();
        }
    }
}