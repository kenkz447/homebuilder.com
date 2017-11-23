using Omi.Data.Entity;

namespace Omi.Modules.ModuleBase.Entities
{
    public class TaxonomyDetail : 
        BaseEntityDetail<long, TaxonomyEntity>
    {
        public string Label { get; set; }
        public string Icon { get; set; }
    }
}