using Omi.Data.Entity;
using Omi.Modules.FileAndMedia.Misc;
using System;

namespace Omi.Modules.FileAndMedia.Entities
{
    public class FileEntity : BaseEntity
    {
        public string Src { get; set; }
        public int FileType { get; set; }
        public long Size { get; set; }
        public string MetaJson { get; set; }

        public FileMeta GetMeta()
            => FileMeta.DeserializeFileMeta(MetaJson);
    }
}