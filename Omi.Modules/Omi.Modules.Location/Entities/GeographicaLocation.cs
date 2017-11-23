using Omi.Data.Entity;
using Omi.Modules.Location.ViewModel;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Omi.Modules.Location.Entities
{
    public class GeographicaLocation : 
        IEntityWithTypeId<long>, 
        IEntityWithName
    {
        [Key]
        public long Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Label { get; set; }

        public string JsonOptions { get; set; }

        [Required]
        public int LocationType { get; set; }

        public long? ParentId { get; set; }

        public GeographicaLocation Parent { get; set; }
    }
}
