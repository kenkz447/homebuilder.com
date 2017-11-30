using Omi.Extensions;
using Omi.Modules.FileAndMedia.ViewModel;
using Omi.Modules.HomeBuilder.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Omi.Modules.HomeBuilder.ViewModels
{
    public class LayoutPoint
    {
        public float X { get; set; }
        public float Y { get; set; }
        public int Rotate { get; set; }

        public FileEntityInfo Image { get; set; }
    }

    public static class ProjectBlockViewModelExtension
    {
        public static ProjectBlockFile GetFileViewModel(ProjectBlockViewModel viewModel)
        {
            var projectBlockFile = new ProjectBlockFile
            {
                EntityId = viewModel.Id,
                UsingType = 0,
                FileEntityId = viewModel.LayoutImage?.FileId ?? default
            };
            return projectBlockFile;
        }

        public static ProjectBlockViewModel FromEnitity(ProjectBlock entity)
        {
            var detail = entity.ProjectBlockDetails.FirstOrDefault(o => o.ForCurrentRequestLanguage());

            var viewModelResult = new ProjectBlockViewModel
            {
                Id = entity.Id,
                EntityTypeId = entity.EntityTypeId,
                PackageId = entity.PackageId,
                ParentId = entity.PackageId,
                Children = entity.Children?.Select(o => FromEnitity(o))
            };

            viewModelResult = viewModelResult.MergeWith(AutoMapper.Mapper.Map<ProjectBlockViewModel>(detail));

            var layoutImageFileEntity = entity.ProjectBlockFiles.FirstOrDefault(o => o.UsingType == 0);
            if (layoutImageFileEntity != null)
                viewModelResult.LayoutImage = FileEntityInfo.FromEntity(layoutImageFileEntity.FileEntity);

            viewModelResult.LayoutPoints = entity.ProjectBlockFiles.Where(o => o.UsingType == 1).Select(o => {
                var obj = Newtonsoft.Json.JsonConvert.DeserializeObject<LayoutPoint>(o.JsonData);
                obj.Image = FileEntityInfo.FromEntity(o.FileEntity);
                return obj;
            });

            return viewModelResult;
        }
    }

    public class ProjectBlockViewModel
    {
        public long Id { get; set; }
        public string Label { get; set; }

        public int? Area { get; set; }
        public int? BedRoomCount { get; set; }
        public int? ToiletCount { get; set; }
        public int? TotalRoomOfLayout { get; set; }

        public long EntityTypeId { get; set; }
        public long? PackageId { get; set; }
        public long? ParentId { get; set; }
        public FileEntityInfo LayoutImage { get; set; }
        public IEnumerable<LayoutPoint> LayoutPoints { get; set; }
        public IEnumerable<ProjectBlockViewModel> Children { get; set; }
    }
}