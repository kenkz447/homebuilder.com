using Omi.Data.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Omi.Modules.HomeBuilder.Entities
{
    public class ProjectDetail : 
        EntityWithTypeId<long>,
        IEntityWithLanguage
    {
        public string Title { get; set; }
        public string Investor { get; set; }
        public string Street { get; set; }
        public string Website { get; set; }

        public int Area { get; set; }
        public int TotalApartment { get; set; }
        public int StartedYear { get; set; }

        public string MapLatitude { get; set; }
        public string MapLongitude { get; set; }

        public string Language { get; set; }

        public long ProjectId { get; set; }
        public Project Project { get; set; }
    }
}