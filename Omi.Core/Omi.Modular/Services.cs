using AutoMapper;
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
            var serviceProvider = services.BuildServiceProvider();

            // Using Singleton here
            var moduleManager = ModuleManager.GetInstance();

            // Init Automapper profile list
            var autoMapperProfiles = new List<Type>();

            foreach (var module in moduleManager.Modules)
            {
                var types = module.Assembly.GetTypes();

                var moduleInitializerType = types.Where(x => typeof(IModuleInitializer).IsAssignableFrom(x)).FirstOrDefault();

                if (moduleInitializerType != null)
                {
                    var moduleInitializer = (IModuleInitializer)Activator.CreateInstance(moduleInitializerType);
                    moduleInitializer.Init(services);
                }

                // Get module's AutoMapper profiles
                autoMapperProfiles.AddRange(types.Where(x => typeof(Profile).IsAssignableFrom(x)));
            }

            // Using initialize to register all AutoMapper Profile
            Mapper.Initialize(cfg =>
            {
                foreach (var profile in autoMapperProfiles)
                {
                    cfg.AddProfile(profile);
                }
            });

            return services;
        }
    }
}
