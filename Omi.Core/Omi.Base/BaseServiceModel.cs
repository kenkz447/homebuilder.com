using System;
using System.Collections.Generic;
using System.Text;

namespace Omi.Base
{
    public abstract class BaseFilterServiceModel
    {
        public int Page { get; set; }
        public int PageSize { get; set; }
        public string SortBy { get; set; }

        public EntityStatus EntityStatus { get; set; }
    }
}
