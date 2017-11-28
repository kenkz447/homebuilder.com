using Omi.Modules.FileAndMedia.Entities;
using Omi.Modules.FileAndMedia.Misc;
using SixLabors.Primitives;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Text.RegularExpressions;

namespace Omi.Modules.FileAndMedia.ViewModel
{
    public class FileEntityInfo
    {
        public FileEntityInfo()
        {

        }

        public static FileEntityInfo FromEntity(FileEntity entity)
        {
            if (entity == null)
                return default;

            var fileMeta = entity.GetMeta();

            var FileEntityInfo = new FileEntityInfo
            {
                FileId = entity.Id,
                Src = entity.Src,
                Height = fileMeta.GetHeight(),
                Width = fileMeta.GetWidth(),
            };

            if (fileMeta.ThumbnailFileName != null)
                FileEntityInfo.SrcThumb = $"{Path.GetDirectoryName(entity.Src)}/{fileMeta.ThumbnailFileName}".Replace('\\', '/');

            return FileEntityInfo;
        }

        public long FileId { get; set; }
        public string Src { get; set; }

        public string SrcThumb {get;set;}
        public string Base64PlaceHolder { get; set; }
        public int Height { get; set; }
        public int Width { get; set; }
    }
}