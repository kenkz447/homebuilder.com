using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyModel;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Omi.Modular
{
    public static class Services
    {
        public static IServiceCollection AddOmiModular(this IServiceCollection services)
        {
            services.LoadOmiModules();


            return services;
        }

        private static IServiceCollection LoadOmiModules(this IServiceCollection services)
        {
            // Using Singleton here, it will use for dbcontext
            var moduleManager = ModuleManager.GetInstance();

            var serviceProvider = services.BuildServiceProvider();

            using (var serviceScope = serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                foreach (var module in moduleManager.Modules)
                {
                    var types = module.Assembly.GetTypes();
                    var moduleInitializerType = types.Where(x => typeof(IModuleInitializer).IsAssignableFrom(x))?.FirstOrDefault();

                    if (moduleInitializerType != null)
                    {
                        var moduleInitializer = (IModuleInitializer)Activator.CreateInstance(moduleInitializerType);
                        moduleInitializer.Init(services);
                    }
                }
            }

            return services;
        }
    }
}
