using Microsoft.AspNetCore.Mvc.ModelBinding;
using Omi.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace Omi.Extensions
{
    public static class ModelStateExtension
    {
        public static ModelStateErrorJsonResult ToJsonResult(this ModelStateDictionary modelState)
        => new ModelStateErrorJsonResult(modelState.Values);
    }
}
