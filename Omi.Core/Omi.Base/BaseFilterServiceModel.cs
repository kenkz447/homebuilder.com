using System;
using System.Collections.Generic;
using System.Text;

namespace Omi.Base
{
    public class BaseFilterServiceModel<TType>
    {
        public IEnumerable<TType> Ids { get; set; }

        public IEnumerable<EntityStatus> EntityStatues { get; set; }
    }
}
