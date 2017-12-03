using System;
using System.Collections.Generic;
using System.Text;

namespace Omi.Modules.Ecommerce.Product.ViewModels
{
    public class ProductGetViewModel
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public int GetMode { get; set; }
        public bool IsEditModel { get; set; }
        public IEnumerable<long> TaxonomyIds { get; set; }
    }
}
