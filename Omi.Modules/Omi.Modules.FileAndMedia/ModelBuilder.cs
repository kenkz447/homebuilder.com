using Microsoft.EntityFrameworkCore;
using Omi.Modular;
using Omi.Modules.FileAndMedia.Entities;

namespace Omi.Modules.FileAndMedia
{
    public class ModuleBaseModelBuilder : ICustomModelBuilder
    {
        public void Build(ModelBuilder builder)
        {
            builder.Entity<FileEntity>().HasAlternateKey(o => o.Src);
        }
    }
}