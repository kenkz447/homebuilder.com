using Microsoft.EntityFrameworkCore;
using Omi.Base;
using Omi.Data.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Omi.Data
{
    public abstract class BaseEntityService
    {
        public virtual IQueryable<T> BaseEntityFilter<T>(DbSet<T> dbSet, BaseFilterServiceModel model)
            where T : BaseEntity
        {
            var result = dbSet.AsQueryable();

            if (model.EntityStatus != default(int))
                result = result.Where(o => o.Status == (int)model.EntityStatus);

            if (model.Page != default(int))
                result = result.Skip((model.Page) * (model.PageSize - 1)).Take(model.PageSize);

            return result;
        }
    }
}
