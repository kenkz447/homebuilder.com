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

        // For Room Layout
        public int Area { get; set; }
        public int BedRoomCount { get; set; }
        public int ToiletCount { get; set; }
        public int TotalRoomOfLayout { get; set; }

        public string Language { get;set; }

        public long? ProjectBlockId { get; set; }
        public ProjectBlock ProjectBlock { get; set; }
    }
}