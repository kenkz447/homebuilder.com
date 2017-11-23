using System;

namespace Omi.Data.Entity
{
    public interface IBaseEntity : IEntityWithTypeId<long>
    {
        string CreateByUserId { get; set; }

        DateTime? CreateDate { get; set; }

        ApplicationUser CreateByUser { get; set; }
    }
}
