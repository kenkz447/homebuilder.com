using System;
using System.Collections.Generic;
using System.Text;

namespace Omi.Modules.Setting.Infrastructure
{
    public class EntitySettingValueAttribute : Attribute
    {
        public string Name { get; set; }
    }
}
