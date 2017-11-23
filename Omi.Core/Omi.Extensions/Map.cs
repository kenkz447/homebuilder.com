using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Omi.Extensions
{
    public static class EnumerableExtension
    {
        /// Traverses an object hierarchy and return a flattened list of elements
        /// based on a predicate.
        /// 
        /// TSource: The type of object in your collection.</typeparam>
        /// source: The collection of your topmost TSource objects.</param>
        /// selectorFunction: A predicate for choosing the objects you want.
        /// getChildrenFunction: A function that fetches the child collection from an object.
        /// returns: A flattened list of objects which meet the criteria in selectorFunction.
        public static IEnumerable<TSource> Flatten<TSource>(
          this IEnumerable<TSource> source,
          Func<TSource, IEnumerable<TSource>> getChildrenFunction,
          Func<int, TSource, TSource> levelProcess = default,
          Func<TSource, bool> selectorFunction = default)
                => Flatten(source, getChildrenFunction, levelProcess, selectorFunction, 0);

        private static IEnumerable<TSource> Flatten<TSource>(
          IEnumerable<TSource> source,
          Func<TSource, IEnumerable<TSource>> getChildrenFunction,
          Func<int, TSource, TSource> levelProcess,
          Func<TSource, bool> selectorFunction,
          int startLevel)
        {
            // Add what we have to the stack
            var flattenedList = source;

            // Go through the input enumerable looking for children,
            // and add those if we have them
            if (source != null)
            {
                if (levelProcess != default)
                    flattenedList = flattenedList.Select(o => levelProcess(startLevel, o));

                if (selectorFunction != default)
                    flattenedList = source.Where(selectorFunction);

                foreach (TSource element in source)
                {
                    var nextLevel = startLevel + 1;
                    var children = getChildrenFunction(element);

                    var temp = Flatten(children, getChildrenFunction, levelProcess, selectorFunction, nextLevel);
                    if (temp == null)
                        continue;

                    if (levelProcess != default)
                        temp = temp.Select(o => levelProcess(nextLevel, o));

                    flattenedList = flattenedList.Concat(temp);
                }
            }

            return flattenedList;
        }

        public static IEnumerable<TSource> Process<TSource>(
          this IEnumerable<TSource> source,
          Func<TSource, TSource> levelProcess)
        {
            var flattenedList = source;

            if (source != null)
                if (levelProcess != default)
                    flattenedList = flattenedList.Select(o => levelProcess(o));

            return flattenedList;
        }
    }
}
