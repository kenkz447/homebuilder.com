using Microsoft.AspNetCore.Mvc;
using Omi.Modules.Ecommerce.Product.Entities;
using Omi.Modules.Ecommerce.Product.ViewModels;
using Omi.Modules.FileAndMedia.ViewModel;
using Omi.Modules.HomeBuilder.Entities;
using Omi.Modules.ModuleBase.ViewModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Omi.Modules.HomeBuilder.ViewModels
{
    [Bind(include: new[] { "ProductId", "Quantity" })]
    public class PackageProductViewModel
    {
        public long ProductId { get; set; }
        public int Quantity { get; set; }

        public ProductViewModel ProductViewModel { get; set; }

        public static PackageProductViewModel FromEntity(PackageProduct packageProduct)
        {
            return new PackageProductViewModel
            {
                ProductId = packageProduct.ProductId,
                Quantity = packageProduct.Quantity,
                ProductViewModel = ProductViewModel.FromEntity(packageProduct.Product)
            };
        }
    }

    public class PackageViewModel : PackageUpdateViewModel
    {
        public long? ProjectBlockId { get; set; }
        public string DesignThemeLabel { get; set; }
        public string HouseTypeLabel { get; set; }

        public IEnumerable<TaxomonyViewModel> PackageIncludedItems { get; set; }
        public IEnumerable<TaxomonyViewModel> PackageFurnitureIncludedItems { get; set; }

        public IEnumerable<TaxomonyViewModel> AvaliablePackageIncludedItems { get; set; }
        public IEnumerable<TaxomonyViewModel> AvaliablePackageFurnitureIncludedItems { get; set; }

        public IEnumerable<TaxomonyViewModel> AvaliableDesignThemes { get; set; }
        public IEnumerable<TaxomonyViewModel> AvaliableHouseStyles { get; set; }
    }
}
