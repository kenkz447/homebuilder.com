using System;
using System.Collections.Generic;
using System.Text;

namespace Omi.Modules.Setting.ServiceModels
{
    public class GetSettingServiceModel
    {
        public long Id { get; set; }

        /// <summary>
        ///  Name of setting entity your want to get
        /// </summary>
        public string Name { get; set; }
    }
}
