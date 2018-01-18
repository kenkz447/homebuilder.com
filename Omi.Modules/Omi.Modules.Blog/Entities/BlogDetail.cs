using Omi.Data.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Omi.Modules.Blog.Entities
{
    public class BlogDetail : 
        EntityWithTypeId<long>,
        IEntityWithLanguage
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Content { get; set; }

        public string Language { get; set; }

        public long EntityId { get; set; }

        public BlogEntity Entity { get; set; }
    }
}