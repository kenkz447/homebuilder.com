using System;
using System.Collections.Generic;
using System.Text;

namespace Omi.Data.Entity
{
    public interface IEntityWithTypeId<T> : IEntity
    {
        T Id { get; set; }
    }
}
