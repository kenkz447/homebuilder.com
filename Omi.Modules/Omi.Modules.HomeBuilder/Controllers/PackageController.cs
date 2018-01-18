using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Omi.Base;
using Omi.Data;
using Omi.Modules.HomeBuilder.Services;
using Omi.Modules.HomeBuilder.ViewModels;
using Omi.Modules.ModuleBase;
using System.Linq;

using static Omi.Modules.HomeBuilder.Utilities.ViewModelUtilities;
using System.Threading.Tasks;
using Omi.Modules.FileAndMedia.Base;
using Omi.Modules.FileAndMedia.ViewModel;
using Omi.Modules.HomeBuilder.DbSeed;
using Omi.Modules.HomeBuilder.Entities;
using Omi.Base.ViewModel;
using Omi.Modules.ModuleBase.ViewModels;
using Omi.Extensions;
using System.Collections.Generic;
using Omi.Base.Collection;
using Omi.Modules.ModuleBase.Base.ServiceModel;

namespace Omi.Modules.HomeBuilder.Controllers
{
    public class PackageController : BaseController
    {
        public readonly PackageService _packageService;

        public PackageController(
            PackageService packageService,
            ILogger<PackageController> logger,
            UserManager<ApplicationUser> userManager) 
            : base(logger, userManager)
        {
            _packageService = packageService;
        }

        private PackageViewModel EmptyPackageViewModel
        {
            get
            {
                var designThemes = _packageService.GetAllDesignThemes();
                var packageIncludeItems = _packageService.GetAllPackageIncludedItem();
                var packageFurnitureIncludeItems = _packageService.GetAllFurnitureIncludeItem();
                var houseStyle = _packageService.GetAllHouseStyles();

                var result = new PackageViewModel
                {
                    AvaliableDesignThemes = designThemes.Select(o => TaxomonyViewModel.FromEntity(o)),
                    AvaliablePackageIncludedItems = packageIncludeItems.Select(o => TaxomonyViewModel.FromEntity(o)),
                    AvaliableHouseStyles = houseStyle.Select(o => TaxomonyViewModel.FromEntity(o)),
                    AvaliablePackageFurnitureIncludedItems = packageFurnitureIncludeItems.Select(o => TaxomonyViewModel.FromEntity(o))
                };

                return result;
            }
        }

        public BaseJsonResult GetEmptyPackageViewModel()         
            => new BaseJsonResult(Base.Properties.Resources.POST_SUCCEEDED, EmptyPackageViewModel);

        [AllowAnonymous]
        public async Task<BaseJsonResult> GetPackageViewModel(long id)
        {
            var package = await _packageService.GetPackageById(id);
            var viewModel = ToPackageViewModel(package);
            viewModel = viewModel.MergeWith(EmptyPackageViewModel);

            return new BaseJsonResult(Omi.Base.Properties.Resources.POST_SUCCEEDED, viewModel);
        }

        [AllowAnonymous]
        public async Task<BaseJsonResult> GetNextAndPrevPackage(long packageId)
        {
            var nextPackage = await _packageService.GetNextPackage(packageId);
            var prevPackage = await _packageService.GetPrevPackage(packageId);

            var next = ToPackageViewModel(nextPackage);
            var prev = ToPackageViewModel(prevPackage);
            return new BaseJsonResult(Omi.Base.Properties.Resources.POST_SUCCEEDED, new { next, prev});
        }

        [AllowAnonymous]
        public BaseJsonResult GetPackageByIds(IEnumerable<long> ids)
        {
            var packages = _packageService.GetPackageByIds(ids);
            var result = packages.Select(package => ToPackageViewModel(package));
            return new BaseJsonResult(Omi.Base.Properties.Resources.POST_SUCCEEDED, result);
        }

        [AllowAnonymous]
        public async Task<BaseJsonResult> GetPackage(long packageName)
        {
            var package = await _packageService.GetPackageById(packageName);
            var viewModel = ToPackageViewModel(package);
            return new BaseJsonResult(Omi.Base.Properties.Resources.POST_SUCCEEDED, viewModel);
        }

        [AllowAnonymous]
        public BaseJsonResult GetDesignThemes()
        {
            var designTheme = _packageService.GetAllDesignThemes();
            var result = designTheme.Select(o => TaxomonyViewModel.FromEntity(o));

            return new BaseJsonResult(Omi.Base.Properties.Resources.POST_SUCCEEDED, result);
        }

        [AllowAnonymous]
        public BaseJsonResult GetHouseStyles()
        {
            var designTheme = _packageService.GetAllHouseStyles();
            var result = designTheme.Select(o => TaxomonyViewModel.FromEntity(o));

            return new BaseJsonResult(Omi.Base.Properties.Resources.POST_SUCCEEDED, result);
        }

        [AllowAnonymous]
        public async Task<ObjectResult> GetPackages(PackageFilterViewModel viewModel)
        {
            var serviceModel = viewModel.ToServiceModel();

            var entities = _packageService.GetPackages(serviceModel);

            if (string.IsNullOrEmpty(viewModel.SortField) == false)
            {
                if (viewModel.SortField == "title")
                    entities = (viewModel.SortOrder == "ascend") ? entities.OrderBy(o => o.Details.FirstOrDefault().Title) : entities.OrderByDescending(o => o.Details.FirstOrDefault().Title);
            }

            var result = await PaginatedList<Package>.CreateAsync(entities, serviceModel.Page, serviceModel.PageSize);
            var viewModels = new PageEntityViewModel<Package, PackageViewModel>(result, o => ToPackageViewModel(o));
            return Ok(viewModels);
        }

        [HttpPost]
        public async Task<BaseJsonResult> CreateNewPackage([FromBody]PackageUpdateViewModel viewModel)
        {
            var packageServiceModel = viewModel.ToPackageServiceModel();
            packageServiceModel.User = CurrentUser;

            var newPackage = await _packageService.CreateNewPackage(packageServiceModel);

            return new BaseJsonResult(Omi.Base.Properties.Resources.POST_SUCCEEDED, newPackage.Id);
        }

        [HttpPost]
        public async Task<BaseJsonResult> UpdatePackage([FromBody]PackageUpdateViewModel model)
        {
            if (!ModelState.IsValid)
                return new ModelStateErrorJsonResult(ModelState.Values);

            var packageServiceModel = model.ToPackageServiceModel();
            packageServiceModel.User = CurrentUser;

            await _packageService.UpdatePackageAsync(packageServiceModel);

            return new BaseJsonResult(Omi.Base.Properties.Resources.POST_SUCCEEDED, model.Id);
        }

        [HttpDelete]
        public async Task<BaseJsonResult> Delete([FromBody]EntityDeleteViewModel viewModel)
        {
            var serviceModel = new DeleteServiceModel
            {
                Ids = viewModel.Ids,
                DeleteBy = CurrentUser
            };

            var result = await _packageService.DeleteProductAsync(serviceModel);

            return new BaseJsonResult(Base.Properties.Resources.POST_SUCCEEDED, result);
        }

        private PackageViewModel ToPackageViewModel(Package package)
        {
            if (package == null)
                return null;

            var packageViewModel = new PackageViewModel();

            packageViewModel.Id = package.Id;
            packageViewModel.Name = package.Name;
            packageViewModel.ProjectBlockId = package.ProjectBlockId;
            packageViewModel.IsPerspective = package.IsPerspective;

            var detail = package.Details.FirstOrDefault();
            if (detail != null)
            {
                packageViewModel.Price = detail.Price;
                packageViewModel.Area = detail.Area;
                packageViewModel.Title = detail.Title;
                packageViewModel.SortText = detail.SortText;
            }

            var avatarFile = package.EntityFiles.FirstOrDefault(o => o.UsingType == (int)FileUsingType.Avatar);
            if (avatarFile != null)
                packageViewModel.Avatar = FileEntityInfo.FromEntity(avatarFile.FileEntity);

            var pictureFiles = package.EntityFiles.Where(o => o.UsingType == (int)FileUsingType.Picture);
            packageViewModel.Pictures = pictureFiles.Select(o => FileEntityInfo.FromEntity(o.FileEntity));

            var houseType = package.EntityTaxonomies.FirstOrDefault(o => o.Taxonomy.TaxonomyTypeId == HouseStyleSeed.HouseStyle.Id);
            if (houseType != null)
            {
                packageViewModel.HouseTypeId = houseType.TaxonomyId;
                packageViewModel.HouseTypeLabel = houseType.Taxonomy.Details.FirstOrDefault(o => o.ForCurrentRequestLanguage()).Label;
            }

            var designTheme = package.EntityTaxonomies.FirstOrDefault(o => o.Taxonomy.TaxonomyTypeId == DesignThemeSeed.DesignTheme.Id);
            if (designTheme != null)
            {
                packageViewModel.DesignThemeId = designTheme.TaxonomyId;
                packageViewModel.DesignThemeLabel = designTheme.Taxonomy.Details.FirstOrDefault(o => o.ForCurrentRequestLanguage()).Label;
            }

            var includedItems = package.EntityTaxonomies.Where(o => o.Taxonomy.TaxonomyTypeId == PackageIncludedSeed.PackageIncludedItem.Id);
            if (includedItems != null)
            {
                packageViewModel.PackageIncludedItemIds = includedItems.Select(o => o.TaxonomyId);
                packageViewModel.PackageIncludedItems = includedItems.Select(o => TaxomonyViewModel.FromEntity(o.Taxonomy));
            }

            var furnitureIncludedItems = package.EntityTaxonomies.Where(o => o.Taxonomy.TaxonomyTypeId == PackageFunitureIncludedSeed.PackageFunitureIncludedItem.Id);
            if (furnitureIncludedItems != null)
            {
                packageViewModel.PackageFurnitureIncludedItemIds = furnitureIncludedItems.Select(o => o.TaxonomyId);
                packageViewModel.PackageFurnitureIncludedItems = furnitureIncludedItems.Select(o => TaxomonyViewModel.FromEntity(o.Taxonomy));
            }

            packageViewModel.Products = new List<PackageProductViewModel>(package.EntityProducts.Select(o => PackageProductViewModel.FromEntity(o)));

            return packageViewModel;
        }
    }
}
