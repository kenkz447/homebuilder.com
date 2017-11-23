using Omi.Modular;
using Microsoft.Extensions.DependencyInjection;
using Omi.Modules.HomeBuilder.DbSeed;
using Omi.Modules.HomeBuilder.Services;
using Omi.Extensions;
using System.Collections.Generic;
using System;
using Microsoft.Extensions.Configuration;

namespace Omi.Modules.HomeBuilder
{
    public class HomeBuilderInitializer : IModuleInitializer
    {
        public async void Init(IServiceCollection services)
        {
            services.AddDbContext<HomeBuilderDbContext>();

            services.AddScoped<PackageService>();
            services.AddScoped<ProjectService>();

            var serviceProvider = services.BuildServiceProvider();

            var configuration = serviceProvider.GetRequiredService<IConfiguration>();
            var isMigration = configuration.GetValue<bool>("Migration");
            if (!isMigration)
            {
                var dbContext = serviceProvider.GetService<HomeBuilderDbContext>();

                await dbContext.Seed(new List<Type> {
                    typeof(DesignThemeSeed),
                    typeof(PackageIncludedSeed),
                    typeof(HouseStyleSeed),
                    typeof(ProjectTypeSeed),
                    typeof(ProjectStatusSeed),
                    typeof(EntityTypeSeed)
                });
            }
        }
    }
}