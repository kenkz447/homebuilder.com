using Omi.Data.Entity;
using Omi.Modules.ModuleBase.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Omi.Modules.ModuleBase.Base.Entity
{
    public interface IEntityTaxonomy<TEntityId, TEntity>: IEntity
    {
        TEntityId EntityId { get; set; }
        long TaxonomyId { get; set; }

        TEntity Entity { get; set; }
        TaxonomyEntity Taxonomy { get; set; }
    }
}
