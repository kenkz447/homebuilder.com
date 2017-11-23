using Omi.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace Omi.Modules.HomeBuilder.ServiceModel
{
    public class PackageFilterServiceModel : BaseFilterServiceModel
    {
        public string SortBy { get; set; }
        public int BudgetMin { get; set; }
        public int BudgetMax { get; set; }
        public List<long> TaxonomyIds { get; set; }
    }
}
