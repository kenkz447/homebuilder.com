using Microsoft.EntityFrameworkCore;
using Omi.Base;
using Omi.Data.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Z.EntityFramework.Plus;

namespace Omi.Extensions
{
    public static class DbContextExtension
    {
        private static bool IsIDbSeed(Type t)
            => t.GetInterface(nameof(IDbSeed)) != null;

        public static async Task Seed(this DbContext db, IEnumerable<Type> dbSeedTypes)
        {
            foreach (var dbSeedType in dbSeedTypes)
            {
                if (IsIDbSeed(dbSeedType))
                {
                    var instance = (IDbSeed)Activator.CreateInstance(dbSeedType);
                    await instance.SeedAsync(db);
                }
            }
        }

        public static async void TryUpdateList<TEntity, TKey>(this DbContext db, IEnumerable<TEntity> currentEntities, IEnumerable<TEntity> newEntities, Func<TEntity, TKey> getKey, IEnumerable<string> ExcludeProperties = null)
            where TEntity : class, IEntityWithTypeId<TKey>
        {
            var deletedEntities = currentEntities.Except(newEntities, getKey);
            db.RemoveRange(deletedEntities);

            var addedEntities = newEntities.Except(currentEntities, getKey);
            await db.AddRangeAsync(addedEntities);

            var modifiedEntities = newEntities.Except(addedEntities, getKey);

            var dbSet = db.Set<TEntity>();

            foreach (TEntity entity in modifiedEntities)
            {
                var existingItem = dbSet.Find(entity.Id);

                if (existingItem != null)
                {
                    var entityEntry = db.Entry(existingItem);

                    entityEntry.CurrentValues.SetValues(entity);

                    foreach (var property in ExcludeProperties)
                        entityEntry.Property(property).IsModified = false;
                }
            }
        }

        public static void TryUpdateManyToMany<T, TKey>(this DbContext db, IEnumerable<T> currentEntities, IEnumerable<T> newEntities, Func<T, TKey> getKey) where T : class
        {
            var deleteEntities = currentEntities.Except(newEntities, getKey);
            db.Set<T>().RemoveRange(deleteEntities);
            db.Set<T>().AddRange(newEntities.Except(currentEntities, getKey));
        }

        public static IEnumerable<T> Except<T, TKey>(this IEnumerable<T> entities, IEnumerable<T> other, Func<T, TKey> getKey)
        {
            return from entity in entities
                   join otherItem in other on getKey(entity)
                   equals getKey(otherItem) into tempEntities
                   from temp in tempEntities.DefaultIfEmpty()
                   where ReferenceEquals(null, temp) || temp.Equals(default(T))
                   select entity;
        }
    }
}