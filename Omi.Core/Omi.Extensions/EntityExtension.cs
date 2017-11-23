using Omi.Data.Entity;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;

namespace Omi.Extensions
{
    public static class EntityExtension
    {
        /// <summary>
        /// Get Entity has language === CurrentCulture.Name
        /// Or language === null
        /// </summary>
        /// <param name="entityWithLanguage"></param>
        /// <returns></returns>
        public static bool ForCurrentRequestLanguage(this IEntityWithLanguage entityWithLanguage)
        {
            return entityWithLanguage.Language == Thread.CurrentThread.CurrentCulture.Name || entityWithLanguage.Language == null;
        }
    }
}