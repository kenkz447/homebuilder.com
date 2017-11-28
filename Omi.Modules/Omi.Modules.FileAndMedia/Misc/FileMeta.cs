using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;

namespace Omi.Modules.FileAndMedia.Misc
{
    public class FileMeta
    {
        public FileMeta()
        {

        }

        public string Dimension { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }

        public string ImageAlt { get; set; }
        public string ThumbnailFileName { get; set; }
        public string Base64PlaceHolder { get; set; }

        public string ToJsonString()
            => Newtonsoft.Json.JsonConvert.SerializeObject(this, new Newtonsoft.Json.JsonSerializerSettings {
                NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore
            });

        public static FileMeta DeserializeFileMeta(string jsonString)
            => Newtonsoft.Json.JsonConvert.DeserializeObject<FileMeta>(jsonString);

        public int GetHeight()
        {
            if (Height != default)
                return Height;

            var height = Regex.Matches(Dimension, @"Height=(.*?)\s]");
            if (height.Count == 0)
                return default;
            return Int32.Parse(height[0].Groups[1].Value);
        }

        public int GetWidth()
        {
            if (Width != default)
                return Width;

            var width = Regex.Matches(Dimension, @"Width=(.*?),");
            if (width.Count == 0)
                return default;
            return Int32.Parse(width[0].Groups[1].Value);
        }
    }
}
