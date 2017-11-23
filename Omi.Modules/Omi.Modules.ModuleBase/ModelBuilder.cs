using Microsoft.EntityFrameworkCore;
using Omi.Modular;
using Omi.Modules.ModuleBase.Entities;

namespace Omi.Modules.ModuleBase
{
    public class ModuleBaseModelBuilder : ICustomModelBuilder
    {
        public void Build(ModelBuilder builder)
        {
            builder.Entity<EntityType>()
                .HasAlternateKey(o => o.Name);

            builder.Entity<TaxonomyType>()
                .HasAlternateKey(o => o.Name);

            builder.Entity<TaxonomyEntity>()
                .HasAlternateKey(o => o.Name);

            builder.Entity<TaxonomyDetail>();
        }
    }
}
