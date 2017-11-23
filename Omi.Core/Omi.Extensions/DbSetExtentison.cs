using Microsoft.EntityFrameworkCore;
using Omi.Data.Entity;

namespace Omi.Extensions
{
    public static class DbSetExtentison
    {
        public static T SeedEntity<T>(this DbSet<T> entitySet, T entityToSeed)
            where T : class, IEntityWithName
        {
            var entity = entitySet.FirstOrDefaultAsync(o => o.Name == entityToSeed.Name).Result;
            if (entity == null)
                return entitySet.Add(entityToSeed).Entity;

            return entity;
       }
    }
}
