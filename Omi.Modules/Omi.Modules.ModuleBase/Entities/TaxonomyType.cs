using Omi.Data.Entity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Omi.Modules.ModuleBase.Entities
{
    public class TaxonomyType : BaseEntity, IEntityWithName
    {
        [Required]
        public string Name { get; set; }

        public long? EntityTypeId { get; set; }

        public virtual EntityType EntityType { get; set; }
    }
}