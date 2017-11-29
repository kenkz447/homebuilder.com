using Omi.Data.Entity;
using Omi.Modules.FileAndMedia.Base.Entity;
using Omi.Modules.FileAndMedia.Entities;
using Omi.Modules.ModuleBase.Base.Entity;
using System;
using System.Collections.Generic;
using System.Text;
using Omi.Modules.ModuleBase.Entities;
using Omi.Modules.HomeBuilder.ViewModels;
using System.Linq;

namespace Omi.Modules.HomeBuilder.Entities
{
    public class ProjectBlock :
        EntityWithTypeId<long>,
        IEntityWithEntityTypeId,
        IEntityWithChildren<IEnumerable<ProjectBlock>, ProjectBlock>
    {
        public ProjectBlock()
        {
            Children = new HashSet<ProjectBlock>();
            ProjectBlockDetails = new HashSet<ProjectBlockDetail>();
            ProjectBlockFiles = new HashSet<ProjectBlockFile>();
        }

        public long? ProjectId { get; set; }
        public long? PackageId { get; set; }
        public long? ParentId { get; set; }
        public long EntityTypeId { get; set; }

        public Project Project { get; set; }
        public ProjectBlock Parent { get; set; }
        public Package Package { get; set; }
        public EntityType EntityType { get; set; }

        public IEnumerable<ProjectBlockFile> ProjectBlockFiles { get; set; }
        public IEnumerable<ProjectBlockDetail> ProjectBlockDetails { get; set; }
        public IEnumerable<ProjectBlock> Children { get; set; }

        public static ProjectBlock FromViewModel(ProjectBlockViewModel viewModel)
        {
            var files = new List<ProjectBlockFile>();

            if (viewModel.LayoutImage != null)
                files.Add(ProjectBlockViewModelExtension.GetFileViewModel(viewModel));

            if (viewModel.LayoutPoints != null)
                files.AddRange(
                    viewModel.LayoutPoints.Where(o => o.Image != null).Select(o =>
                    {
                        return new ProjectBlockFile
                        {
                            EntityId = viewModel.Id,
                            FileEntityId = o.Image.FileId,
                            UsingType = 1,
                            JsonData = (o != null) ? Newtonsoft.Json.JsonConvert.SerializeObject(o) : default
                        };
                    }));

            var detail = AutoMapper.Mapper.Map<ProjectBlockDetail>(viewModel);
            detail.ProjectBlockId = viewModel.Id;

            var entity = new ProjectBlock
            {
                Id = viewModel.Id,
                EntityTypeId = viewModel.EntityTypeId,
                PackageId = viewModel.PackageId,
                ParentId = viewModel.ParentId,
                ProjectBlockFiles = files,
                ProjectBlockDetails = new List<ProjectBlockDetail>
                    {
                        detail
                    }
            };

            if (viewModel.Children != null)
                entity.Children = viewModel.Children.Select(o => FromViewModel(o)).ToList();

            return entity;
        }
    }
}