using System;
using System.ComponentModel.DataAnnotations;

namespace Omi.Data.Entity
{
    public abstract class BaseEntityDetail<TEntityId, TEntity> : 
        IBaseEntity,
        IEntityWithLanguage
    {
        [Key]
        public long Id { get; set; }

        public string Language { get; set; }

        public TEntityId EntityId { get; set; }
        public TEntity Entity { get; set; }

        public string CreateByUserId { get; set; }
        public DateTime? CreateDate { get; set; }

        public virtual ApplicationUser CreateByUser { get; set; }
    }
}