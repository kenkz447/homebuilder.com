using Omi.Data.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Omi.Modules.Setting.Entities
{
    public class SettingEntity:
        BaseEntity,
        IEntityWithName
    {
        public SettingEntity()
        {
            SettingValues = new HashSet<SettingValue>();
        }

        public string Name { get; set; }

        public IEnumerable<SettingValue> SettingValues { get; set; }
    }
}