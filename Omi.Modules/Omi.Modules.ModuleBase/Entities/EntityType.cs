using Omi.Data.Entity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Omi.Modules.ModuleBase.Entities
{
    public class EntityType : 
        BaseEntity,
        IEntityWithName
    {
        public EntityType()
        {
            TaxonomyTypes = new HashSet<TaxonomyType>();
        }

        [Required]
        public string Name { get; set; }

        public virtual ICollection<TaxonomyType> TaxonomyTypes { get; set; }
    }
}
