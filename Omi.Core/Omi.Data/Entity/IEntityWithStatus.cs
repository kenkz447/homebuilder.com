using System;

namespace Omi.Data.Entity
{
    public interface IEntityWithStatus
    {
        int Status { get; set; }
    }
}
