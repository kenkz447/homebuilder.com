﻿using Omi.Data;
using Omi.Modules.FileAndMedia.Base;
using Omi.Modules.HomeBuilder.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Omi.Modules.HomeBuilder.Utilities;
using Omi.Modules.FileAndMedia.Base.Entity;
using Omi.Modules.HomeBuilder.ViewModels;
using Omi.Extensions;
using Omi.Modules.HomeBuilder.DbSeed;

namespace Omi.Modules.HomeBuilder.ServiceModel
{
    public class ProjectServiceModel
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public long AvatarFileId { get; set; }
        public long CityId { get; set; }
          
        public ProjectDetail Detail { get; set; }
        public ApplicationUser User { get; set; }

        public IEnumerable<long> TaxonomyIds { get; set; }
        public IEnumerable<ProjectBlock> ProjectBlocks { get; set; }

        public Project ToEntity()
        {
            var newProject = new Project
            {
                Id = Id,
                Name = Name,
                CreateByUserId = User.Id,
                Details = new List<ProjectDetail>() {
                    Detail
                },
                EnitityFiles = GetEntityFiles(),
                EntityTaxonomies = new List<ProjectTaxonomy>(
                    TaxonomyIds.Select(taxonomyId => new ProjectTaxonomy { TaxonomyId = taxonomyId, EntityId = Id })),
                CityId = CityId
            };
            return newProject;
        }

        public IEnumerable<ProjectFile> GetEntityFiles()
        {
            var ProjectFiles = new List<ProjectFile>()
                {
                    new ProjectFile
                    {
                        UsingType = (int)FileUsingType.Avatar,
                        FileEntityId = AvatarFileId,
                        EntityId = Id,
                    },
                };

            return ProjectFiles;
        }

        public static ProjectServiceModel FromViewModel(ProjectViewModel viewModel)
        {
            var nestedProjectBlocks = viewModel.ProjectBlocks.Select(o => ProjectBlock.FromViewModel(o));
            nestedProjectBlocks = nestedProjectBlocks.Select((tower) =>
             {
                 tower.ProjectId = viewModel.ProjectId;
                 tower.EntityTypeId = EntityTypeSeed.RoomType.Id;
                 tower.Children = tower.Children.Select(floor => {
                     floor.EntityTypeId = EntityTypeSeed.RoomLayout.Id;
                     floor.Children = floor.Children.Select(room =>
                     {
                         room.EntityTypeId = EntityTypeSeed.Perspective.Id;
                         return room;
                     }).ToList();
                     return floor;
                 }).ToList();
                 return tower;
             });

            var taxonomyIds = new List<long>();
            if (viewModel.ProjectTypeId != default)
                taxonomyIds.Add(viewModel.ProjectTypeId);
            if (viewModel.ProjectStatusId != default)
                taxonomyIds.Add(viewModel.ProjectStatusId);

            return new ProjectServiceModel
            {
                Id = viewModel.ProjectId,
                Name = viewModel.Name,
                Detail = AutoMapper.Mapper.Map<ProjectDetail>(viewModel),
                ProjectBlocks = nestedProjectBlocks,
                AvatarFileId = viewModel.Avatar.FileId,
                TaxonomyIds = taxonomyIds,
                CityId = viewModel.CityId,
            };
        }
    }
}
