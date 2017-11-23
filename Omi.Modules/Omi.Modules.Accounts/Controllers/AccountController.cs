using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication;
using Omi.Data;
using Omi.Base;
using Omi.Services;
using Omi.Extensions;
using Omi.Modules.ModuleBase;

namespace Omi.Modules.Accounts.Controllers
{
    using Instrastructure;
    using Model;
    using Properties;

    public class AccountController : BaseController
    {
        private readonly IEmailSender _emailSender;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public AccountController(
            IEmailSender emailSender,
            ILogger<AccountController> logger,
            SignInManager<ApplicationUser> signInManager,
            UserManager<ApplicationUser> userManager) : base(logger, userManager)
        {
            _emailSender = emailSender;
            _signInManager = signInManager;
        }

        public async Task<IEnumerable<AuthenticationScheme>> GetExternalLogins()
            => await _signInManager.GetExternalAuthenticationSchemesAsync();

        [HttpPost]
        public async Task<BaseJsonResult> OnLogout()
        {
            await _signInManager.SignOutAsync();
            _logger.LogInformation("User logged out.");
            return new BaseJsonResult(Base.Properties.Resources.POST_SUCCEEDED);
        }

        [HttpPost, AllowAnonymous]
        public async Task<BaseJsonResult> OnLogin([FromBody]LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                // Clear the existing external cookie to ensure a clean login process
                await HttpContext.SignOutAsync(IdentityConstants.ExternalScheme);

                var signInResult = await _signInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, lockoutOnFailure: false);

                if (signInResult.Succeeded)
                    _logger.LogInformation("User logged in.");

                if (signInResult.IsLockedOut)
                    _logger.LogWarning("User account locked out.");

                var result = new BaseJsonResult(signInResult.GetResultCode());
                return result;
            }

            return ModelState.ToJsonResult();
        }

        [HttpPost, AllowAnonymous]
        public async Task<BaseJsonResult> OnRegister([FromBody]RegisterViewModel model)
        {
            if (ModelState.IsValid)
                return ModelState.ToJsonResult();

            var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
            var result = await _userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                _logger.LogInformation("User created a new account with password.");

                var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                var callbackUrl = Url.EmailConfirmationLink(user.Id, code, Request.Scheme);
                await _emailSender.SendEmailConfirmationAsync(model.Email, callbackUrl);

                await _signInManager.SignInAsync(user, isPersistent: false);
                return new BaseJsonResult(Resources.REGISTER_SUCCESSED);
            }

            return new CustomErrorJsonResult(result.Errors.Select(o => o.Description));
        }

        [HttpPost, AllowAnonymous]
        public async Task<BaseJsonResult> OnForgotPassword([Bind]ForgotPasswordInputModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByEmailAsync(model.Email);
                if (user == null || !(await _userManager.IsEmailConfirmedAsync(user)))
                {
                    // Don't reveal that the user does not exist or is not confirmed
                    return new BaseJsonResult
                    {
                        Code = Resources.USER_NOT_FOUND
                    };
                }

                // For more information on how to enable account confirmation and password reset please 
                // visit https://go.microsoft.com/fwlink/?LinkID=532713
                var code = await _userManager.GeneratePasswordResetTokenAsync(user);
                var callbackUrl = Url.ResetPasswordCallbackLink(user.Id, code, Request.Scheme);
                await _emailSender.SendResetPasswordAsync(model.Email, callbackUrl);

                return new BaseJsonResult(Base.Properties.Resources.POST_SUCCEEDED);
            }

            return ModelState.ToJsonResult();
        }

        [HttpPost, AllowAnonymous]
        public async Task<BaseJsonResult> OnResetPassword(ResetPasswordViewModel model)
        {
            if (!ModelState.IsValid)
                return ModelState.ToJsonResult();

            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
                return new BaseJsonResult(Resources.USER_NOT_FOUND);

            var result = await _userManager.ResetPasswordAsync(user, model.Code, model.Password);
            if (result.Succeeded)
                return new BaseJsonResult(Base.Properties.Resources.POST_SUCCEEDED);

            return new CustomErrorJsonResult(result.Errors.Select(o => o.Description));
        }
    }
}