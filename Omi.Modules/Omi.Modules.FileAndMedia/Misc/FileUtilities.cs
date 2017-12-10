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
                case ".jpeg":
                case ".svg":
                case ".gif":
                    return FileType.Image;
                default:
                    return FileType.Unknow;
            }
        }

        /// <summary>
        /// Crop image and save to given path
        /// </summary>
        /// <param name="pathToFile">Path to source file</param>
        /// <param name="savePath">Save to... (include filename)</param>
        /// <param name="toSize">crop size</param>
        /// <param name="condition">Crop if condition return true</param>
        /// <returns></returns>
        public static bool CropAndSave(string pathToFile, string savePath, ResizeOptions options, Func<Image<Rgba32>, bool> condition = null)
        {
            using (var image = Image.Load(pathToFile))
            {
                if (condition != null && condition(image) == false)
                    return false;

                image.Mutate(x => x.Resize(options));
                image.Save(savePath);
                return true;
            }
        }

        public static string CropToBase64(string pathToFile, string savePath, ResizeOptions options, Func<Image<Rgba32>, bool> condition = null)
        {
            using (var image = Image.Load(pathToFile))
            {
                if (condition != null && condition(image) == false)
                    return default;

                image.Mutate(x => x.Resize(options));
                
                return image.ToBase64String(ImageFormats.Jpeg);
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
