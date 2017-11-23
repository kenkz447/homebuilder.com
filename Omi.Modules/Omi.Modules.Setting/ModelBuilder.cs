using Microsoft.EntityFrameworkCore;
using Omi.Modular;
using Omi.Modules.Setting.Entities;

namespace Omi.Modules.Setting
{
    public class SettingModelBuilder : ICustomModelBuilder
    {
        public void Build(ModelBuilder builder)
        {
            builder.Entity<SettingEntity>()
                .HasAlternateKey(o => o.Name);
        }
    }
}
