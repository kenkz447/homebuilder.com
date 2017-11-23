using Omi.Modular;
using Microsoft.Extensions.DependencyInjection;
using Omi.Modules.Setting.Services;

namespace Omi.Modules.Setting
{
    public class SettingInitializer : IModuleInitializer
    {
        public void Init(IServiceCollection services)
        {
            services.AddDbContext<SettingDbContext>();
            services.AddScoped<SettingService>();
        }
    }
}