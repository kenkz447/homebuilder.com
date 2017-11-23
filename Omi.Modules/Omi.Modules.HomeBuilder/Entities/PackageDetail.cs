using Omi.Data.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Omi.Modules.HomeBuilder.Entities
{
    public class PackageDetail : 
        EntityWithTypeId<long>,
        IEntityWithLanguage
    {
        public string Title { get; set; }
        public string SortText { get; set; }
        public int Price { get; set; }
        public int Area { get; set; }

        public string Language { get; set; }

        public long PackageId { get; set; }
        public virtual Package Package { get; set; }
    }
}