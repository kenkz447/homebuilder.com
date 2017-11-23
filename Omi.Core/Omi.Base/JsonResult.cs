using System;
using System.Collections.Generic;
using static Microsoft.AspNetCore.Mvc.ModelBinding.ModelStateDictionary;

namespace Omi.Base
{
    public class BaseJsonResult
    {
        public BaseJsonResult() { }

        public BaseJsonResult(string code)
        {
            Code = code;
        }

        public BaseJsonResult(string code, object result)
        {
            Code = code;
            Result = result;
        }

        public string Code { get; set; }
        public object Result { get; set; }
    }

    public class ModelStateErrorJsonResult: BaseJsonResult
    {
        public ModelStateErrorJsonResult(ValueEnumerable modelState)
        {
            Code = Properties.Resources.POST_MODEL_ERRORS;
            ModelState = modelState;
        }

        public ValueEnumerable? ModelState { get; set; }
    }

    public class CustomErrorJsonResult : BaseJsonResult
    {
        public CustomErrorJsonResult(IEnumerable<string> customErrors)
        {
            Code = Properties.Resources.POST_CUSTOM_ERRORS;
            CustomErrors = customErrors;
        }

        public IEnumerable<string> CustomErrors { get; set; }
    }

    public class JsonExceptionError : BaseJsonResult
    {
        public JsonExceptionError(Exception e)
        {
            Code = Properties.Resources.UPLOAD_EXECPTION_ERROR;
            Message = e.Message;
        }

        public string Message { get; set; }
    }
}