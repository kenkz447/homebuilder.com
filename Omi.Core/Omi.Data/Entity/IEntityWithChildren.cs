using System;
using System.Collections.Generic;
using System.Text;

namespace Omi.Data.Entity
{
    public interface IEntityWithChildren<TEnumerable, TEntity>
        where TEnumerable : IEnumerable<TEntity>
    {
        TEnumerable Children { get; set; }
    }
}
