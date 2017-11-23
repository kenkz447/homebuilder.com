using Omi.Base;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
using SixLabors.Primitives;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace Omi.Modules.FileAndMedia.Misc
{
    public static class FileUtilities
    {
        public static FileType GetFileType(string fileName)
        {
            var fileExt = Path.GetExtension(fileName);

            switch (fileExt)
            {
                case ".png":
                case ".jpg":
                    return FileType.Image;
                default:
                    return FileType.Unknow;
            }
        }

        public static bool CropThumbnail(string imagePath, string savePath, Size thumbnailSize)
        {
            using (var image = Image.Load(imagePath))
            {
                if (image.Height < thumbnailSize.Height && image.Width < thumbnailSize.Width)
                    return false;

                image.Mutate(x => x.Resize(new ResizeOptions { Mode = ResizeMode.Crop, Size = thumbnailSize }));
                image.Save(savePath);

                return true;
            }
        }

        public static Size GetImageDimension(string imagePath)
        {
            using (var image = Image.Load(imagePath))
            {
                return new Size(image.Width, image.Height);
            }
        }
    }
}
