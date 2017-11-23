using Microsoft.EntityFrameworkCore;
using Omi.Extensions;
using Omi.Modules.ModuleBase.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Omi.Modules.HomeBuilder.DbSeed
{
    class ProjectTypeSeed
    {
        public static TaxonomyType ProjectType = new TaxonomyType
        {
            Name = "project-type"
        };

        public static TaxonomyEntity Apartment = new TaxonomyEntity
        {
            Name = "project-type-apartment",
            Details = new List<TaxonomyDetail>
            {
                new TaxonomyDetail
                {
                    Label = "Căn hộ",
                    Language = "vi"
                }
            }
        };

        public async Task SeedAsync(DbContext context)
        {
            var entityTypeSet = context.Set<TaxonomyType>();
            ProjectType = entityTypeSet.SeedEntity(ProjectType);

            var taxonomySet = context.Set<TaxonomyEntity>();

            Apartment.TaxonomyTypeId = ProjectType.Id;
            Apartment = taxonomySet.SeedEntity(Apartment);

            await context.SaveChangesAsync();
        }
    }
}
