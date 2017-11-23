using Microsoft.EntityFrameworkCore;
using Omi.Data;
using Omi.Modular;
using Omi.Modules.Setting.Entities;

namespace Omi.Modules.Setting
{
    public class SettingDbContext : ApplicationDbContext
    {
        public SettingDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {

        }

        public DbSet<SettingEntity> SettingEntity { get; set; }
        public DbSet<SettingValue> SettingValue { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.RegisterCustomMappings<SettingModelBuilder>();
            base.OnModelCreating(builder);
        }
    }
}
