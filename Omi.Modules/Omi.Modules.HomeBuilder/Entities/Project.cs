using Omi.Data.Entity;
using Omi.Modules.FileAndMedia.Base.Entity;
using Omi.Modules.Location.Entities;
using Omi.Modules.ModuleBase.Base.Entity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Omi.Modules.HomeBuilder.Entities
{
    public class Project :
        BaseEntity,
        IEntityWithName,
        IEntityWithDetails<ProjectDetail>,
        IEntityWithFiles<long, Project, ProjectFile>
    {
        public string Name { get; set; }

        public long CityId { get; set; }

        public int BudgetMin { get; set; }
        public int BudgetMax { get; set; }

        public GeographicaLocation City { get; set; }

        public IEnumerable<ProjectDetail> Details { get; set; }
        public IEnumerable<ProjectTaxonomy> EntityTaxonomies { get; set; }
        public IEnumerable<ProjectFile> EntityFiles { get; set; } 
        public IEnumerable<ProjectBlock> ProjectBlocks { get; set; }
    }
}
