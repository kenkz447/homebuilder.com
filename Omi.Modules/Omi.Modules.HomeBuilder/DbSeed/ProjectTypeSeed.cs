using Microsoft.EntityFrameworkCore;
using Omi.Extensions;
using Omi.Modular;
using Omi.Modules.ModuleBase.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Omi.Modules.HomeBuilder.DbSeed
{
    public class ProjectTypeSeed : IDbSeed
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
                    Label = "Chung cư",
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
