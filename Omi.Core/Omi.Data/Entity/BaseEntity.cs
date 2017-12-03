using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Omi.Data.Entity
{
    public abstract class BaseEntity : IBaseEntity
    {
        public BaseEntity()
        {
            CreateDate = DateTime.Now;
        }

        [Key]
        public long Id { get; set; }

        public string DeleteByUserId { get; set; }
        public string CreateByUserId { get; set; }
        public string LastUpdateByUserId { get; set; }

        public DateTime? CreateDate { get; set; }
        public DateTime? DeleteDate { get; set; }
        public DateTime? LastUpdateDate { get; set; }

        public virtual ApplicationUser CreateByUser { get; set; }
        public virtual ApplicationUser DeleteByUser { get;set;}
        public virtual ApplicationUser LastUpdateByUser { get; set; }
    }
}
