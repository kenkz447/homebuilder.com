using Omi.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace Omi.Modules.ModuleBase.Base.ServiceModel
{
    public class DeleteServiceModel
    {
        public IEnumerable<long> Ids { get; set; }
        public ApplicationUser DeleteBy { get; set; }
    }
}