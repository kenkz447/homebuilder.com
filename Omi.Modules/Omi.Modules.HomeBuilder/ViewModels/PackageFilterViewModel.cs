using Omi.Modules.HomeBuilder.ServiceModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace Omi.Modules.HomeBuilder.ViewModels
{
    public class PackageFilterViewModel
    {
        public PackageFilterViewModel()
        {
            Page = 1;
            PageSize = 9;
        }

        public string SortBy { get; set; }
        public long DesignTheme { get; set; }
        public long HouseType { get; set; }
        public int BudgetMin { get; set; }
        public int BudgetMax { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }

        public PackageFilterServiceModel ToServiceModel()
            => new PackageFilterServiceModel
            {
                SortBy = SortBy,
                BudgetMax = BudgetMax,
                BudgetMin = BudgetMin,
                TaxonomyIds = new List<long>() { DesignTheme, HouseType },
                Page = Page,
                PageSize = PageSize
            };
    }
}
