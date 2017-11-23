using Omi.Modular;
using Microsoft.Extensions.DependencyInjection;

namespace Omi.Modules.ModuleBase
{
    public class ModuleBaseInitializer : IModuleInitializer
    {
        public void Init(IServiceCollection services)
        {
            services.AddDbContext<ModuleBaseDbContext>();
        }
    }
}