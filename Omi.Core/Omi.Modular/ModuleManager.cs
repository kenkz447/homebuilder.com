using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyModel;
using System.Collections.Generic;
using System.Reflection;
using System.Linq;
using System;

namespace Omi.Modular
{
    public class ModuleManager
    {
        #region Singleton
        private static ModuleManager _instance;

        public static ModuleManager GetInstance()
            => _instance ?? (_instance = new ModuleManager());
        #endregion

        private IEnumerable<ModuleInfo> _modules;
        public IEnumerable<ModuleInfo> Modules
        {
            get
            {
                if (_modules == null)
                {
                    var _moduleAssemblies = new List<ModuleInfo>();
                    var dependencies = DependencyContext.Default.RuntimeLibraries;
                    foreach (var library in dependencies)
                    {
                        var assemblyName = new AssemblyName(library.Name);
                        try
                        {
                            var assembly = Assembly.Load(assemblyName);
                            var types = assembly.GetTypes();
                            if (types.FirstOrDefault(type => !type.IsInterface && typeof(IModuleInitializer).IsAssignableFrom(type)) != null)
                                _moduleAssemblies.Add(new ModuleInfo
                                {
                                    ModuleName = library.Name,
                                    Assembly = assembly
                                });
                        }
                        catch (Exception)
                        {
                            continue;
                        }
                    }
                    _modules = _moduleAssemblies;
                }

                return _modules;
            }
        }

        protected ModuleManager()
        {
        }
    }
}
