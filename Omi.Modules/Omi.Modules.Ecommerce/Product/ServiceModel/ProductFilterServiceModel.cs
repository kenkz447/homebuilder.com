using Omi.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace Omi.Modules.Ecommerce.Product.ServiceModel
{
    public class ProductFilterServiceModel : BaseFilterServiceModel<long>
    {
        public string Name { get; set; }
        public string Code { get; set; }
        public string Title { get; set; }
    }
}
