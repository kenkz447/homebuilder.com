using System;
using System.Collections.Generic;
using System.Text;

namespace Omi.Data.Entity
{
    public class EntityWithTypeId<T> : IEntityWithTypeId<T>
    {
        public T Id { get; set; }
    }
}
