using Omi.Modules.FileAndMedia.Entities;

namespace Omi.Modules.FileAndMedia.Base.Entity
{
    public class EntityFile<TEntityId, TEntity> : IEntityFile<TEntityId, TEntity>
    {
        public TEntityId EntityId { get; set; }
        public long FileEntityId { get; set; }
        public int UsingType { get; set; }
        public TEntity Entity { get; set; }
        public FileEntity FileEntity { get; set; }
    }
}