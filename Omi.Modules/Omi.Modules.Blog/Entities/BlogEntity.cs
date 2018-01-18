using Omi.Data.Entity;
using Omi.Modules.FileAndMedia.Base.Entity;
using Omi.Modules.ModuleBase.Base.Entity;
using System;
using System.Collections.Generic;

namespace Omi.Modules.Blog.Entities
{
    public class BlogEntity :
        BaseEntity,
        IEntityWithName,
        IEntityWithStatus,
        IEntityWithDetails<BlogDetail>,
        IEntityWithFiles<long, BlogEntity, BlogFile>
    {
        public BlogEntity()
        { 
            EntityFiles = new HashSet<BlogFile>();
        }

        public string Name { get; set; }
        public int Status { get; set; }

        public DateTime? PublicDate { get; set; }

        public IEnumerable<BlogDetail> Details { get; set; }
        public IEnumerable<BlogFile> EntityFiles { get; set; }
    }
}