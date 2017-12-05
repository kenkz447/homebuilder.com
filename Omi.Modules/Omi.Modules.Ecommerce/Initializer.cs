using Omi.Modular;
using Microsoft.Extensions.DependencyInjection;
using Omi.Extensions;
using System;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using Omi.Modules.Ecommerce.Seed;
using Omi.Modules.Ecommerce.Product.Services;

namespace Omi.Modules.Ecommerce
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
            services.AddDbContext<EcommerceDbContext>();
            services.AddScoped<ProductService>();
            services.AddScoped<ProductTaxonomiesService>();

            var serviceProvider = services.BuildServiceProvider();

            var configuration = serviceProvider.GetRequiredService<IConfiguration>();
            var isMigration = configuration.GetValue<bool>("Migration");
            if(!isMigration) {
                var dbContext = serviceProvider.GetService<EcommerceDbContext>();
                await dbContext.Seed(new List<Type>
                {
                    typeof(BaseBrandSeed),
                    typeof(BaseProductTypeSeed)
                }); 
            }
        }
    }
}