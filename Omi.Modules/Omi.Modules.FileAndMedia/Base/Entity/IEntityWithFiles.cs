using System;
using System.Collections.Generic;
using System.Text;

namespace Omi.Modules.FileAndMedia.Base.Entity
{
    public interface IEntityWithFiles<TEntityId, TEntity, TEntityFile>
        where TEntityFile : IEntityFile<TEntityId, TEntity>
    {
        IEnumerable<TEntityFile> EntityFiles { get; set; }
    }
}
