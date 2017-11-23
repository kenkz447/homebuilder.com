using Omi.Modular;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Omi.Modules.ModuleBase.Entities;
using Omi.Extensions;

namespace Omi.Modules.HomeBuilder.DbSeed
{
    public class EntityTypeSeed : IDbSeed
    {
        public static EntityType RoomType = new EntityType
        {
            Name = "project-room-type"  
        }; 

        public static EntityType RoomLayout = new EntityType
        {
            Name = "project-room-layout"
        };

        public static EntityType Perspective = new EntityType
        {
            Name = "project-perspective"
        };

        public async Task SeedAsync(DbContext dbConext)
        {
            var entityTypeSet = dbConext.Set<EntityType>();

            RoomType = entityTypeSet.SeedEntity(RoomType);
            RoomLayout = entityTypeSet.SeedEntity(RoomLayout);
            Perspective = entityTypeSet.SeedEntity(Perspective);

            await dbConext.SaveChangesAsync();
        }
    }
}
