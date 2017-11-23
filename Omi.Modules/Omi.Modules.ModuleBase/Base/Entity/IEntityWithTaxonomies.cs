using Omi.Modules.ModuleBase.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Omi.Modules.ModuleBase.Base.Entity
{
    public interface IEntityWithTaxonomies<TEntityId, TEntity, TEntityTaxomony>
        where TEntityTaxomony : IEntityTaxonomy<TEntityId, TEntity>
    {
        IEnumerable<TEntityTaxomony> EntityTaxonomies { get; set; }
    }
}
