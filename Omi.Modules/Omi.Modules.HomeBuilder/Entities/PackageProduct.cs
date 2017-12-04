using Omi.Modules.Ecommerce.Product.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Omi.Modules.HomeBuilder.Entities
{
    public class PackageProduct
    {
        public long EntityId { get; set; }
        public Package Entity { get; set; }

        public long ProductId { get; set; }
        public ProductEntity Product { get; set; }

        public int Quantity { get; set; }
    }
}
