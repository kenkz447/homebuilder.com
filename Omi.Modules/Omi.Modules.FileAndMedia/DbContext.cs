using Microsoft.EntityFrameworkCore;
using Omi.Data;
using Omi.Modular;
using Omi.Modules.FileAndMedia.Entities;
using System.Collections.Generic;

namespace Omi.Modules.FileAndMedia
{
    public class FileAndMediaDbContext : ApplicationDbContext
    {
        public FileAndMediaDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {

        }

        public DbSet<FileEntity> FileEntity { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.RegisterCustomMappings<ModuleBaseModelBuilder>();
            base.OnModelCreating(builder);
        }
    }
}
