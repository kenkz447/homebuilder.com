using Omi.Modular;
using Microsoft.Extensions.DependencyInjection;

namespace Omi.Modules.ModuleBase
{
    public class ModuleBaseInitializer : IModuleInitializer
    {
        public int LoadOrder { get; set; }
        public ModuleBaseInitializer()
        {
            LoadOrder = 0;
        }

        public void Init(IServiceCollection services)
        {
            services.AddDbContext<ModuleBaseDbContext>();
        }
    }
}