using Omi.Data.Entity;
using Omi.Modules.FileAndMedia.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Omi.Modules.FileAndMedia.Base.Entity
{
    public interface IEntityFile<TEntityId, TEntity> : IEntity
    {
        TEntityId EntityId { get; set; }
        long FileEntityId { get; set; }
        int UsingType { get; set; }
        TEntity Entity { get; set; }
        FileEntity FileEntity { get; set; }
    }
}