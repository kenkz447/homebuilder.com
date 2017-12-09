using System;
using System.Collections.Generic;
using System.Text;

namespace Omi.Modules.Ecommerce.Product.ViewModels
{
    public class ProductGetViewModel
    {
        public string SortField { get; set; }
        public string SortOrder { get; set; }

        public string Code { get; set; }
        public string Title { get; set; }

        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 9;

        public long EntityId { get; set; }
        public string Name { get; set; }
        public int GetMode { get; set; }
        public bool IsEditModel { get; set; }
        public IEnumerable<long> TaxonomyIds { get; set; }
    }
}