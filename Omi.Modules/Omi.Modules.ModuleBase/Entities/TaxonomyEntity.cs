using Omi.Data.Entity;
using Omi.Modules.ModuleBase.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Omi.Modules.ModuleBase.Entities
{
    public class TaxonomyEntity :
        BaseEntity,
        IEntityWithName,
        IEntityWithDetails<TaxonomyDetail>,
        IEntityWithChildren<IEnumerable<TaxonomyEntity>, TaxonomyEntity>
    {
        public TaxonomyEntity(): base()
        {
            Details = new HashSet<TaxonomyDetail>();
        }

        [Required]
        public string Name { get; set; }

        public long TaxonomyTypeId { get; set; }
        public long? ParentId { get; set; }

        public TaxonomyType TaxonomyType { get; set; }
        public TaxonomyEntity Parent { get; set; }

        public IEnumerable<TaxonomyDetail> Details { get; set; }
        public IEnumerable<TaxonomyEntity> Children { get; set; }
    }
}