using Microsoft.AspNetCore.Identity;
using Omi.Modules.Accounts.Properties;
using System;
using System.Collections.Generic;
using System.Text;

namespace Omi.Modules.Accounts.Instrastructure
{
    public static class Extensions
    {
        public static string GetResultCode(this SignInResult signInResult)
        {
            if (signInResult.Succeeded)
                return Resources.LOGIN_SUCCEEDED;
            if (signInResult.IsLockedOut)
                return Resources.ACCOUNT_IS_LOCKED_OUT;
            if (signInResult.IsNotAllowed)
                return Resources.IS_NOT_ALLOWED;
            if (signInResult.RequiresTwoFactor)
                return Resources.REQUIRES_TWO_FACTOR;

            return Resources.LOGIN_FAILED;
        }
    }
}
