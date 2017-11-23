using Omi.Data.Entity;
using Omi.Modules.ModuleBase.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Omi.Modules.ModuleBase.Base.Entity
{
    public interface IEntityWithEntityTypeId
    {
        long EntityTypeId { get; set; }

        EntityType EntityType { get; set; }
    }
}