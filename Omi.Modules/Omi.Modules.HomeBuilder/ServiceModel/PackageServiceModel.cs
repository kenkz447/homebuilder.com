using Omi.Data;
using Omi.Modules.FileAndMedia.Base;
using Omi.Modules.HomeBuilder.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
namespace Omi.Modules.HomeBuilder.ServiceModel
{
    public class PackageServiceModel
    {
        public long Id { get; set; }

        public string Name { get; set; }

        public PackageDetail Detail { get; set; }

        public IEnumerable<long> TaxonomyIds { get; set; }

        public long AvatarFileId { get; set; }
        public IEnumerable<long> PictureFileIds { get; set; }

        public ApplicationUser User { get; set; }

        public Package ToEntity()
        {
            var newPackage = new Package
            {
                Id = Id,
                Name = Name,
                CreateByUserId = User.Id,
                Details = new List<PackageDetail>() {
                    Detail
                },
                EnitityFiles = GetEntityFiles(),
                EntityTaxonomies = new List<PackageTaxonomy>(
                    TaxonomyIds.Select(taxonomyId => new PackageTaxonomy { TaxonomyId = taxonomyId, EntityId = Id }))
            };
            return newPackage;
        }

        public IEnumerable<PackageFile> GetEntityFiles()
        {
            var packageFiles = new List<PackageFile>()
                {
                    new PackageFile
                    {
                        UsingType = (int)FileUsingType.Avatar,
                        FileEntityId = AvatarFileId,
                        EntityId = Id,
                    },
                };

            packageFiles.AddRange(PictureFileIds.Select(o => new PackageFile
            {
                UsingType = (int)FileUsingType.Picture,
                FileEntityId = o,
                EntityId = Id,
            }));

            return packageFiles;
        }
    }
}
