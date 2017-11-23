using Omi.Modules.FileAndMedia.Base.Entity;
using Omi.Modules.FileAndMedia.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Omi.Modules.HomeBuilder.Entities
{
    public class ProjectBlockFile : EntityFile<long, ProjectBlock>
    {
        public string JsonData { get; set; }
    }
}
