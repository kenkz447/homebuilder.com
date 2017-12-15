using Omi.Modular;
using Microsoft.Extensions.DependencyInjection;
using Omi.Modules.HomeBuilder.Settings.WebsiteSetting.Seed;
using Omi.Modules.HomeBuilder.Settings.WebsiteSetting.Services;

namespace Omi.Modules.HomeBuilder.Settings
{
    public class Initializer : IModuleInitializer
    {
        public int LoadOrder { get; set; }
        public Initializer()
        {
            LoadOrder = 1;
        }

        public async void Init(IServiceCollection services)
        {
            services.AddDbContext<HomeBuilderSettingsDbContext>();
            services.AddScoped<WebsiteSettingService>();

            var serviceProvider = services.BuildServiceProvider();

            var dbContext = serviceProvider.GetService<HomeBuilderSettingsDbContext>();

            var websiteSettingSeed = new WebsiteSettingSeed();
            await websiteSettingSeed.SeedAsync(dbContext);
        }
    }
}