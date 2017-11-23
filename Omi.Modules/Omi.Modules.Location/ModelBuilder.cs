using Microsoft.EntityFrameworkCore;
using Omi.Modular;
using Omi.Modules.Location.Entities;

namespace Omi.Modules.ModuleBase
{
    public class LocationModelBuilder : ICustomModelBuilder
    {
        public void Build(ModelBuilder builder)
        {
            builder.Entity<GeographicaLocation>();
        }
    }
}
