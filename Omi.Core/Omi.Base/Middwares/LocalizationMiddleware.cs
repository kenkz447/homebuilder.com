using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Primitives;
using System.Globalization;
using System.Threading;
using System.Threading.Tasks;

namespace Omi.Base.Middwares
{
    public class RequestLanguageMiddleware
    {
        private readonly RequestDelegate _next;

        public RequestLanguageMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            if(context.Request.Query.ContainsKey("input-language"))
            {
                var inputLanguage = context.Request.Query["input-language"];

                var targetCulture = CultureInfo.GetCultureInfo(inputLanguage);
                Thread.CurrentThread.CurrentCulture = targetCulture;
            }

            await _next(context);
        }
    }
}