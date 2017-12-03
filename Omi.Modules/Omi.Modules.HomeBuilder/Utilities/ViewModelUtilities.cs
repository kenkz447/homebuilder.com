using Omi.Extensions;
using Omi.Modules.HomeBuilder.Entities;
using Omi.Modules.HomeBuilder.ServiceModel;
using Omi.Modules.HomeBuilder.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Omi.Modules.HomeBuilder.Utilities
{
    public static class ViewModelUtilities
    {
        public static PackageDetail GetPackageDetail(this PackageUpdateViewModel viewModel)
            => new PackageDetail
            {
                PackageId = viewModel.Id,
                Area = viewModel.Area,
                Price = viewModel.Price,
                SortText = viewModel.SortText,
                Title = viewModel.Title,
            };

        public static PackageServiceModel ToPackageServiceModel(this PackageUpdateViewModel viewModel)
        {
            var taxonomyIds = new List<long>() {
                        viewModel.HouseTypeId, viewModel.DesignThemeId,
                    };

            if (viewModel.PackageIncludedItemIds != null)
                taxonomyIds.AddRange(viewModel.PackageIncludedItemIds);

            if (viewModel.PackageFurnitureIncludedItemIds != null)
                taxonomyIds.AddRange(viewModel.PackageFurnitureIncludedItemIds);

            var pictureFileIds = new List<long>();
            if (viewModel.Pictures != null)
                pictureFileIds = pictureFileIds.Concat(viewModel.Pictures.Select(o => o.FileId)).ToList();

            var detail = viewModel.GetPackageDetail();

            var addNewpackageServiceModel = new PackageServiceModel()
            {
                Id = viewModel.Id,
                Name = viewModel.Title.ToEntityName(),
                Detail = detail,
                TaxonomyIds = taxonomyIds,
                AvatarFileId = viewModel.Avatar.FileId,
                PictureFileIds = pictureFileIds
            };

            return addNewpackageServiceModel;
        }
    }
}
