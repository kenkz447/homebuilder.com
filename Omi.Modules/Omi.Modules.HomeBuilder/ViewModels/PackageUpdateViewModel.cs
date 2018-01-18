using Omi.Modules.FileAndMedia.ViewModel;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Omi.Modules.HomeBuilder.ViewModels
{
    public class PackageUpdateViewModel
    {
        public long Id { get; set; }

        public string Name { get; set; }

        public bool? IsPerspective { get; set; }

        [Required]
        public string Title { get; set; }

        public string SortText { get; set; }

        [Required]
        public int Price { get; set; }

        [Required]
        public int Area { get; set; }

        [Required]
        public long HouseTypeId { get; set; }

        [Required]
        public long DesignThemeId { get; set; }

        public IEnumerable<PackageProductViewModel> Products { get; set; }

        public FileEntityInfo Avatar { get; set; }
        public IEnumerable<FileEntityInfo> Pictures { get; set; }
        public IEnumerable<long> PackageIncludedItemIds { get; set; }
        public IEnumerable<long> PackageFurnitureIncludedItemIds { get; set; }
    }
}
