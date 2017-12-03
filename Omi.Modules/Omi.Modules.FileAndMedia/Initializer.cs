using Omi.Modular;
using Microsoft.Extensions.DependencyInjection;
using Omi.Modules.FileAndMedia.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Omi.Modules.FileAndMedia
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

            var serviceProvider = services.BuildServiceProvider();
            var configuration = serviceProvider.GetRequiredService<IConfiguration>();

            services.AddDbContext<FileAndMediaDbContext>();

            services.AddScoped<FileService>();
        }

    }
}