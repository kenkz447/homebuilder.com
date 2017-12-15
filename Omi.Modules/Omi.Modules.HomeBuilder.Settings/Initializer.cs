using Omi.Modular;
using Microsoft.Extensions.DependencyInjection;
using Omi.Modules.HomeBuilder.Settings.WebsiteSetting.Seed;
using Omi.Modules.HomeBuilder.Settings.WebsiteSetting.Services;
using Microsoft.Extensions.Configuration;
using Omi.Extensions;
using System.Collections.Generic;
using System;

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

            var configuration = serviceProvider.GetRequiredService<IConfiguration>();
            var isMigration = configuration.GetValue<bool>("Migration");
            if (!isMigration)
            {
                var dbContext = serviceProvider.GetService<HomeBuilderSettingsDbContext>();

                await dbContext.Seed(new List<Type> {
                    typeof(WebsiteSettingSeed)
                });
            }
        }
    }
}