using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;
using Unidecode.NET;

namespace Omi.Extensions
{
    public static class StringExtentsion
    {
        public static string TrimSpacesBetweenString(this string str)
        {
            var options = RegexOptions.None;
            var regex = new Regex(@"[ ]{2,}", options);
            return regex.Replace(str, @" ");
        }

        public static string ToEntityName(this string name)
        {
            var result = name.TrimSpacesBetweenString();
            result = result.Unidecode();
            result = result.Replace(' ', '-');
            result = result.ToLower();
            return result;
        }

        public static string FirstCharacterToLower(this string str)
        {
            if (String.IsNullOrEmpty(str) || Char.IsLower(str, 0))
                return str;

            return Char.ToLowerInvariant(str[0]) + str.Substring(1);
        }
    }
}
