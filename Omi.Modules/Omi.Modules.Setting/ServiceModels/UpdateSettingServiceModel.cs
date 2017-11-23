using Omi.Data;
using Omi.Modules.Setting.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Omi.Modules.Setting.ServiceModels
{
    public class UpdateSettingServiceModel
    {
        public long Id { get; set; }
        /// <summary>
        ///  Name of setting entity your want to get
        /// </summary>
        public string Name { get; set; }

        public IEnumerable<SettingValue> SettingValues { get; set; }
        
        public ApplicationUser UpdateBy { get; set; }
    }
}
