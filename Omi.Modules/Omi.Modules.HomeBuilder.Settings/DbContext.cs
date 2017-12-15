using Microsoft.EntityFrameworkCore;
using Omi.Data;
using Omi.Modular;
using Omi.Modules.ModuleBase;
using Omi.Modules.ModuleBase.Entities;
using Omi.Modules.Setting;
using System.Collections.Generic;

namespace Omi.Modules.HomeBuilder.Settings
{
    public class HomeBuilderSettingsDbContext : ApplicationDbContext
    {
        public HomeBuilderSettingsDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.RegisterCustomMappings<HomeBuilderSettingsModelBuilder>();
            base.OnModelCreating(builder);
        }
    }
}
