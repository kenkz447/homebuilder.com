using Omi.Base;
using Omi.Data.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Omi.Extensions
{
    public static class IQueryableExtension
    {
        public static IQueryable<TEntity> FilterByServiceModel<TType, TEntity>(this IQueryable<TEntity> list, BaseFilterServiceModel<TType> serviceModel)
            where TEntity : IEntityWithTypeId<TType>, IEntityWithStatus
        {
            if (serviceModel.Ids != null && serviceModel.Ids.Count() != 0)
                list = list.Where(o => serviceModel.Ids.Contains(o.Id));

            if (serviceModel.EntityStatues != null)
            {
                var statues = serviceModel.EntityStatues.Select(o => (int)o);
                list = list.Where(o => statues.Contains(o.Status));
            }

            return list;
        }
    }
}