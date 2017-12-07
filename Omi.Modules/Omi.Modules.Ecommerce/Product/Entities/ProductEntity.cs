using Omi.Data.Entity;
using Omi.Modules.FileAndMedia.Base.Entity;
using Omi.Modules.ModuleBase.Base.Entity;
using System.Collections.Generic;

namespace Omi.Modules.Ecommerce.Product.Entities
{
    public class ProductEntity :
        BaseEntity,
        IEntityWithName,
        IEntityWithStatus,
        IEntityWithDetails<ProductDetail>,
        IEntityWithTaxonomies<long, ProductEntity, ProductTaxonomy>,
        IEntityWithFiles<long, ProductEntity, ProductFile>
    {
        public ProductEntity()
        {
            EntityFiles = new HashSet<ProductFile>();
        }

        public string Name { get; set; }
        public string Price { get; set; }
        public string Code { get; set; }
        public string Dimension { get; set; }
        public int Status { get; set; }

        public IEnumerable<ProductDetail> Details { get; set; }
        public IEnumerable<ProductFile> EntityFiles { get; set; }
        public IEnumerable<ProductTaxonomy> EntityTaxonomies { get; set; }
    }
}
