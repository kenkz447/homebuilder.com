using Omi.Modular;
using Microsoft.Extensions.DependencyInjection;
using Omi.Modules.Location.DbSeed;
using Omi.Modules.Location.Services;
using Omi.Modules.ModuleBase;
using Omi.Extensions;
using System;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;

namespace Omi.Modules.Location
{
    public class LocationInitializer : IModuleInitializer
    {
        public int LoadOrder { get; set; }
        public LocationInitializer()
        {
            LoadOrder = 0;
        }

        public async void Init(IServiceCollection services)
        {
            services.AddDbContext<LocationDbContext>();
            services.AddScoped<LocationService>();

            var serviceProvider = services.BuildServiceProvider();

            var configuration = serviceProvider.GetRequiredService<IConfiguration>();
            var isMigration = configuration.GetValue<bool>("Migration");
            if(!isMigration) {
                var dbContext = serviceProvider.GetService<LocationDbContext>();
                await dbContext.Seed(new List<Type>
                {
                   typeof(LocationSeed)
                }); 
            }
        }
    }
}