using Omi.Data.Entity;
using Omi.Modules.FileAndMedia.Base.Entity;
using Omi.Modules.FileAndMedia.Entities;
using Omi.Modules.ModuleBase.Base.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Omi.Modules.HomeBuilder.Entities
{
    public class ProjectBlockDetail :
        EntityWithTypeId<long>,
        IEntityWithLanguage
    {
        public string Label { get; set; }
        public string Language { get;set; }

        public long? ProjectBlockId { get; set; }
        public ProjectBlock ProjectBlock { get; set; }
    }
}