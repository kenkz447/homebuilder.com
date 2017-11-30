using Omi.Data.Entity;
using Omi.Modules.FileAndMedia.Base.Entity;
using Omi.Modules.ModuleBase.Base.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Omi.Modules.HomeBuilder.Entities
{
    public class Package :
        BaseEntity, 
        IEntityWithName,
        IEntityWithDetails<PackageDetail>,
        IEntityWithTaxonomies<long, Package, PackageTaxonomy>,
        IEntityWithFiles<long, Package, PackageFile>
    {
        public string Name { get; set; }

        public bool? IsPerspective { get; set; }
        public long? ProjectBlockId { get; set; }

        public ProjectBlock ProjectBlock { get; set; }

        public virtual IEnumerable<PackageDetail> Details { get; set; }
        public virtual IEnumerable<PackageTaxonomy> EntityTaxonomies { get; set; }
        public virtual IEnumerable<PackageFile> EnitityFiles { get; set; }
    }
}