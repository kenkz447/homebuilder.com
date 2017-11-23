using Omi.Modules.Setting.Entities;
using Omi.Modules.Setting.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;

namespace Omi.Modules.Setting.Infrastructure
{
    public static class EntitySettingUtilities
    {
        private static IEnumerable<PropertyInfo> GetSettingValueProperties(object model)
        {
            var type = model.GetType();
            var properties = type.GetProperties();

            var propertiess = properties.Where(o =>
            {
                var entitySettingValueAttribute = o.CustomAttributes.FirstOrDefault(attr => attr.AttributeType == typeof(EntitySettingValueAttribute));
                if (entitySettingValueAttribute == null)
                    return false;
                return true;
            });

            return propertiess;
        }

        /// <summary>
        /// Return value as SettingValue of all property has EntitySettingValueAttribute
        /// </summary>
        /// <param name="model">Object contains these values</param>
        /// <returns></returns>
        public static IEnumerable<SettingValue> GetSettingValues(object model)
        {
            var settingValueProperties = GetSettingValueProperties(model);

            var settingValueViewModels = settingValueProperties.Select(o => o.GetValue(model) as SettingValueViewModel);

            var settingValues = settingValueViewModels.Select(o => SettingValue.FromViewModel(o));


            return settingValues;
        }
    }
}
