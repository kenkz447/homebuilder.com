using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Omi.Data;
using Omi.Modular;
using System.Linq;

namespace Omi.DatabaseDesign
{
    public class OmiDbContext : IdentityDbContext<ApplicationUser>
    {
        public OmiDbContext(DbContextOptions<OmiDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            var moduleManager = ModuleManager.GetInstance();
            var typeToRegisters = moduleManager.Modules.SelectMany(o => o.Assembly.DefinedTypes.Select(t => t.AsType()));

            builder.RegisterEntities(typeToRegisters)
                .RegisterConvention()
                .RegisterCustomMappings(typeToRegisters);

            base.OnModelCreating(builder);
        }
    }
}
