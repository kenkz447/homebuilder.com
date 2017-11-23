using Microsoft.EntityFrameworkCore;
using Omi.Data.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace Omi.Modular
{
    public static class ModelBuilderRegistration
    {
        public static ModelBuilder RegisterConvention(this ModelBuilder modelBuilder)
        {
            foreach (var entity in modelBuilder.Model.GetEntityTypes())
            {
                if (entity.ClrType.Namespace != null)
                {
                    var nameParts = entity.ClrType.Namespace.Split('.');
                    var tableName = string.Concat(nameParts[0], "_", entity.ClrType.Name);
                    modelBuilder.Entity(entity.Name).ToTable(tableName);
                }
            }
            return modelBuilder;
        }

        public static ModelBuilder RegisterEntities(this ModelBuilder modelBuilder, IEnumerable<Type> typeToRegisters)
        {
            var entityTypes = typeToRegisters.Where(x => x.GetTypeInfo().IsSubclassOf(typeof(IEntity)) && !x.GetTypeInfo().IsAbstract);
            foreach (var type in entityTypes)
            {
                modelBuilder.Entity(type);
            }
            return modelBuilder;
        }

        public static ModelBuilder RegisterCustomMappings(this ModelBuilder modelBuilder, IEnumerable<Type> typeToRegisters)
        {
            var customModelBuilderTypes = typeToRegisters.Where(x => typeof(ICustomModelBuilder).IsAssignableFrom(x));
            foreach (var builderType in customModelBuilderTypes)
            {
                if (builderType != null && builderType != typeof(ICustomModelBuilder))
                {
                    var builder = (ICustomModelBuilder)Activator.CreateInstance(builderType);
                    builder.Build(modelBuilder);
                }
            }
            return modelBuilder;
        }

        public static ModelBuilder RegisterCustomMappings<T>(this ModelBuilder modelBuilder)
            where T: ICustomModelBuilder
        {
            var builderType = typeof(T);

            var builder = (T)Activator.CreateInstance(builderType);
            builder.Build(modelBuilder);

            return modelBuilder;
        }
    }
}
