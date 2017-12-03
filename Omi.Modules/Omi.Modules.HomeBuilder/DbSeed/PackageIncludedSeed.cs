using Microsoft.EntityFrameworkCore;
using Omi.Base;
using Omi.Extensions;
using Omi.Modules.ModuleBase.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Omi.Modules.HomeBuilder.DbSeed
{
    public class PackageIncludedSeed : IDbSeed
    {
        public static TaxonomyType PackageIncludedItem = new TaxonomyType
        {
            Name = "package-include-item"
        };

        public static TaxonomyEntity Carpentry = new TaxonomyEntity
        {
            Name = "package-carpentry",
            Details = new List<TaxonomyDetail>
            {
                new TaxonomyDetail
                {
                    Label = "Carpentry",
                    Icon = "/images/package-carpentry.png",
                    Language = "vi"
                }
            }
        };
        public static TaxonomyEntity FeatureWall = new TaxonomyEntity
        {
            Name = "package-feature-wall",
            Details = new List<TaxonomyDetail>
            {
                new TaxonomyDetail
                {
                    Label = "Feature Wall",
                    Icon = "/images/package-feature-wall.png",
                    Language = "vi"
                }
            }
        };
        public static TaxonomyEntity Plumbing = new TaxonomyEntity
        {
            Name = "package-plumbing",
            Details = new List<TaxonomyDetail>
            {
                new TaxonomyDetail
                {
                    Label = "Plumbing",
                    Icon = "/images/package-plumbing.png",
                    Language = "vi"
                }
            }
        };
        public static TaxonomyEntity ElectricalWiring = new TaxonomyEntity
        {
            Name = "package-electrical-wiring",
            Details = new List<TaxonomyDetail>
            {
                new TaxonomyDetail
                {
                    Label = "Electrical Wiring",
                    Icon = "/images/package-electric-wiring.png",
                    Language = "vi"
                }
            }
        };
        public static TaxonomyEntity Flooring = new TaxonomyEntity
        {
            Name = "package-flooring",
            Details = new List<TaxonomyDetail>
            {
                new TaxonomyDetail
                {
                    Label = "Flooring",
                    Icon = "/images/package-flooring.png",
                    Language = "vi"
                }
            }
        };
        public static TaxonomyEntity FalseCeiling = new TaxonomyEntity
        {
            Name = "package-false-ceiling",
            Details = new List<TaxonomyDetail>
            {
                new TaxonomyDetail
                {
                    Label = "False Ceiling",
                    Icon = "/images/package-false-ceiling.png",
                    Language = "vi"
                }
            }
        };
        public static TaxonomyEntity Decoration = new TaxonomyEntity
        {
            Name = "package-decoration",
            Details = new List<TaxonomyDetail>
            {
                new TaxonomyDetail
                {
                    Label = "Decoration",
                    Icon = "/images/package-decoration.png",
                    Language = "vi"
                }
            }
        };
        public static TaxonomyEntity Design = new TaxonomyEntity
        {
            Name = "package-design",
            Details = new List<TaxonomyDetail>
            {
                new TaxonomyDetail
                {
                    Label = "Design",
                    Icon = "/images/package-design.png",
                    Language = "vi"
                }
            }
        };
        public static TaxonomyEntity Painting = new TaxonomyEntity
        {
            Name = "package-painting",
            Details = new List<TaxonomyDetail>
            {
                new TaxonomyDetail
                {
                    Label = "Painting",
                    Icon = "/images/package-painting.png",
                    Language = "vi"
                }
            }
        };

        public async Task SeedAsync(DbContext context)
        {
            var entityTypeSet = context.Set<TaxonomyType>();

            var packageIncludedItem = await entityTypeSet.FirstOrDefaultAsync(o => o.Name == PackageIncludedItem.Name);
            if (packageIncludedItem == null)
                PackageIncludedItem = entityTypeSet.Add(PackageIncludedItem).Entity;
            else
                PackageIncludedItem = packageIncludedItem;

            Carpentry.TaxonomyTypeId = PackageIncludedItem.Id;
            FeatureWall.TaxonomyTypeId = PackageIncludedItem.Id;
            Plumbing.TaxonomyTypeId = PackageIncludedItem.Id;
            ElectricalWiring.TaxonomyTypeId = PackageIncludedItem.Id;
            Flooring.TaxonomyTypeId = PackageIncludedItem.Id;
            FalseCeiling.TaxonomyTypeId = PackageIncludedItem.Id;
            Decoration.TaxonomyTypeId = PackageIncludedItem.Id;
            Design.TaxonomyTypeId = PackageIncludedItem.Id;
            Painting.TaxonomyTypeId = PackageIncludedItem.Id;

            var taxonomySet = context.Set<TaxonomyEntity>();

            Carpentry = taxonomySet.SeedEntity(Carpentry);
            FeatureWall = taxonomySet.SeedEntity(FeatureWall);
            Plumbing = taxonomySet.SeedEntity(Plumbing);
            ElectricalWiring = taxonomySet.SeedEntity(ElectricalWiring);
            Flooring = taxonomySet.SeedEntity(Flooring);
            FalseCeiling = taxonomySet.SeedEntity(FalseCeiling);
            Decoration = taxonomySet.SeedEntity(Decoration);
            Design = taxonomySet.SeedEntity(Design);
            Painting = taxonomySet.SeedEntity(Painting);

            await context.SaveChangesAsync();
        }
    }
}