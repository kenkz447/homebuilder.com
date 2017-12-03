using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Omi.Modules.ModuleBase.Entities;
using Omi.Extensions;
using Omi.Base;

namespace Omi.Modules.HomeBuilder.DbSeed
{
    public class ProjectStatusSeed : IDbSeed
    {
        public static TaxonomyType ProjectStatus = new TaxonomyType
        {
            Name = "project-status"
        };

        public static TaxonomyEntity UnderConstruction = new TaxonomyEntity
        {
            Name = "project-status-under-construction",
            Details = new List<TaxonomyDetail>
            {
                new TaxonomyDetail
                {
                    Label = "Đang xây dựng",
                    Language = "vi"
                }
            }
        };

        public static TaxonomyEntity Finish = new TaxonomyEntity
        {
            Name = "project-status-finish",
            Details = new List<TaxonomyDetail>
            {
                new TaxonomyDetail
                {
                    Label = "Hoàn thành",
                    Language = "vi"
                }
            }
        };

        public async Task SeedAsync(DbContext dbConext)
        {
            var entityTypeSet = dbConext.Set<TaxonomyType>();

            ProjectStatus = entityTypeSet.SeedEntity(ProjectStatus);

            UnderConstruction.TaxonomyTypeId = ProjectStatus.Id;
            Finish.TaxonomyTypeId = ProjectStatus.Id;

            var taxonomySet = dbConext.Set<TaxonomyEntity>();

            UnderConstruction = taxonomySet.SeedEntity(UnderConstruction);
            Finish = taxonomySet.SeedEntity(Finish);

            await dbConext.SaveChangesAsync();
        }
    }
}
