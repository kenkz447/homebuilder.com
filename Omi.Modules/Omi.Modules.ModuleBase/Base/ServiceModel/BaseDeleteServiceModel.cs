using Omi.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace Omi.Modules.ModuleBase.Base.ServiceModel
{
    public class BaseDeleteServiceModel
    {
        public long EntityId { get; set; }
        public ApplicationUser DeleteBy { get; set; }
    }
}