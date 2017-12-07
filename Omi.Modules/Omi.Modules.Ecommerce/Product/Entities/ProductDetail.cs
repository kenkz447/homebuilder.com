using Omi.Data.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Omi.Modules.Ecommerce.Product.Entities
{
    public class ProductDetail : 
        EntityWithTypeId<long>,
        IEntityWithLanguage
    {
        public string Title { get; set; }
        public string Description { get; set; }

        public string Language { get; set; }

        public long EntityId { get; set; }

        public ProductEntity Entity { get; set; }
    }
}