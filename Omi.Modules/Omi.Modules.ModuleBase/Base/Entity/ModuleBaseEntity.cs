using Omi.Data.Entity;
using Omi.Modules.ModuleBase.Entities;
using System.Collections.Generic;

namespace Omi.Modules.ModuleBase.Base.Entity
{
    public abstract class EntityWithEntityTypeId : 
        BaseEntity,
        IEntityWithEntityTypeId
    {
        public long EntityTypeId { get; set; }
        public virtual EntityType EntityType { get; set; }
    }
}