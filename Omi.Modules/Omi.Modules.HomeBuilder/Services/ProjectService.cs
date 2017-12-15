using Microsoft.EntityFrameworkCore;
using Omi.Base.Collection;
using Omi.Modules.HomeBuilder.DbSeed;
using Omi.Modules.HomeBuilder.Entities;
using Omi.Modules.HomeBuilder.ServiceModel;
using Omi.Modules.ModuleBase.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Omi.Modules.HomeBuilder.Utilities;
using Omi.Modules.Location.Services;
using Omi.Modules.Location.Entities;
using Omi.Extensions;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Omi.Modules.ModuleBase.Base.ServiceModel;

namespace Omi.Modules.HomeBuilder.Services
{
    public static class ProjectServiceExtension
    {
        public static void TryUpdateProjectBlocks<TKey>(this HomeBuilderDbContext context, IEnumerable<ProjectBlock> currentEntities, IEnumerable<ProjectBlock> newEntities, Func<ProjectBlock, TKey> getKey)
        {
            var dbSet = context.Set<ProjectBlock>();

            var deletedEntities = currentEntities.Except(newEntities, getKey);
            dbSet.RemoveRange(deletedEntities);

            var addedEntities = newEntities.Except(currentEntities, getKey);

            if(addedEntities.Count() != 0)
                dbSet.AddRange(addedEntities);

            var modifiedEntities = newEntities.Where(o => o.Id > 0);

            foreach (var entity in modifiedEntities)
            {
                var existingItem = currentEntities.FirstOrDefault(o => o.Id == entity.Id);

                var entityEntry = context.Entry(existingItem);
                entityEntry.CurrentValues.SetValues(entity);

                entityEntry.Property(o => o.ParentId).IsModified = false;

                if (entityEntry.Entity.Children.Count() != 0 && entity.Children.Count() != 0)
                {
                    foreach (var child in entity.Children)
                    {
                        child.ParentId = entityEntry.Entity.Id;
                    }
                    context.TryUpdateProjectBlocks(entityEntry.Entity.Children, entity.Children, getKey);
                }

                context.TryUpdateManyToMany(existingItem.ProjectBlockFiles, entity.ProjectBlockFiles, o => o.FileEntityId);

                foreach (var newDetail in entity.ProjectBlockDetails)
                {
                    var oldDetail = entityEntry.Entity.ProjectBlockDetails.FirstOrDefault(o => o.Language == newDetail.Language);
                    if (oldDetail.Language == newDetail.Language)
                    {
                        newDetail.Id = oldDetail.Id;
                        context.Entry(oldDetail).CurrentValues.SetValues(newDetail);
                    }
                }
            }
        }
    }

    public class ProjectService
    {
        private readonly HomeBuilderDbContext _context;
        private readonly LocationService _locationService;
        public ProjectService(
            HomeBuilderDbContext context,
            LocationService locationService)
        {
            _context = context;
            _locationService = locationService;
        }

        public IEnumerable<TaxonomyEntity> GetAllProjectType()
            => _context.TaxonomyEntity.Include(o => o.Details).Where(o => o.TaxonomyTypeId == ProjectTypeSeed.ProjectType.Id).AsNoTracking();

        public IEnumerable<TaxonomyEntity> GetAllProjectStatus()
            => _context.TaxonomyEntity.Include(o => o.Details).Where(o => o.TaxonomyTypeId == ProjectStatusSeed.ProjectStatus.Id).AsNoTracking();

        public IEnumerable<GeographicaLocation> GetAllCity()
            => _locationService.GetGeographicaLocations();

        private IQueryable<Project> GetProjects()
            => _context.Project
            .Include(o => o.Details)
            .Include(o => o.EntityFiles).ThenInclude(o => o.FileEntity)
            .Include(o => o.EntityTaxonomies).ThenInclude(o => o.Taxonomy).ThenInclude(o => o.Details)
            .Include(o => o.City)
            .Include(o => o.ProjectBlocks).ThenInclude(o => o.ProjectBlockDetails)
            .Include(o => o.ProjectBlocks).ThenInclude(o => o.ProjectBlockFiles)
            .Include(o => o.ProjectBlocks).ThenInclude(o => o.Children).ThenInclude(o => o.ProjectBlockDetails)
            .Include(o => o.ProjectBlocks).ThenInclude(o => o.Children).ThenInclude(o => o.ProjectBlockFiles)
            .Include(o => o.ProjectBlocks).ThenInclude(o => o.Children).ThenInclude(o => o.ProjectBlockFiles).ThenInclude(o => o.FileEntity)
            .Include(o => o.ProjectBlocks).ThenInclude(o => o.Children).ThenInclude(o => o.Children).ThenInclude(o => o.ProjectBlockDetails)
            .Include(o => o.ProjectBlocks).ThenInclude(o => o.Children).ThenInclude(o => o.Children).ThenInclude(o => o.ProjectBlockFiles)
            .Include(o => o.ProjectBlocks).ThenInclude(o => o.Children).ThenInclude(o => o.Children).ThenInclude(o => o.ProjectBlockFiles).ThenInclude(o => o.FileEntity)
            .AsQueryable();

        public async Task<PaginatedList<Project>> GetProjects(ProjectFilterServiceModel serviceModel)
        {
            var Projects = GetProjects().AsNoTracking();

            foreach (var taxonomyName in serviceModel.TaxonomyNames)
                Projects = Projects.Where(o => o.EntityTaxonomies.Select(e => e.Taxonomy.Name).Contains(taxonomyName));

            if(serviceModel.CityName != null)
                Projects = Projects.Where(o => o.City.Name == serviceModel.CityName);

            Projects = Projects.OrderByDescending(o => o.Id);

            var result = await PaginatedList<Project>.CreateAsync(Projects, serviceModel.Page, serviceModel.PageSize);

            return result;
        }

        public async Task<Project> GetProjectById(long projectId)
            => await GetProjects().AsNoTracking().SingleAsync(o => o.Id == projectId);

        public async Task<Project> GetProjectByName(string projectName)
            => await GetProjects().AsNoTracking().SingleAsync(o => o.Name == projectName);

        public async Task<Project> CreateNewProject(ProjectServiceModel serviceModel)
        {
            var newProject = new Project
            {
                Name = serviceModel.Name,
                BudgetMin =serviceModel.BudgetMin,
                BudgetMax =serviceModel.BudgetMax,
                CreateByUserId = serviceModel.User.Id,
                Details = new List<ProjectDetail>() {
                    serviceModel.Detail
                },
                EntityFiles = serviceModel.GetEntityFiles(),
                EntityTaxonomies = new List<ProjectTaxonomy>(
                    serviceModel.TaxonomyIds.Select(taxonomyId => new ProjectTaxonomy { TaxonomyId = taxonomyId })),
                CityId = serviceModel.CityId,
                ProjectBlocks = serviceModel.ProjectBlocks
            };

            var add = await _context.Project.AddAsync(newProject);

            _context.SaveChanges();

            return add.Entity;
        }

        public async Task<Project> UpdateProjectAsync(ProjectServiceModel serviceModel)
        {
            var project = await GetProjects().SingleAsync(o => o.Id == serviceModel.Id);
            var newProject = serviceModel.ToEntity();

            _context.Entry(project).CurrentValues.SetValues(newProject);
            _context.Entry(project).Property(o => o.CreateByUserId).IsModified = false;
            _context.Entry(project).Property(o => o.CreateDate).IsModified = false;

            project.CityId = newProject.CityId;

            foreach (var newDetail in newProject.Details)
            {
                var oldDetail = project.Details.FirstOrDefault(o => o.Language == newDetail.Language);
                if (oldDetail.Language == newDetail.Language)
                {
                    newDetail.Id = oldDetail.Id;
                    _context.Entry(oldDetail).CurrentValues.SetValues(newDetail);
                }
            }

            _context.TryUpdateProjectBlocks(project.ProjectBlocks, serviceModel.ProjectBlocks, o => o.Id);

            var packageSet = _context.Set<Package>();

            foreach (var roomtype in project.ProjectBlocks)
            {
                foreach (var roomLayout in roomtype.Children)
                {
                    foreach (var roomPerspective in roomLayout.Children)
                    {
                        if (roomPerspective.PackageId != default)
                        {
                            var package = packageSet.Find(roomPerspective.PackageId);
                            var entry = _context.Entry(package);
                            entry.Property(o => o.ProjectBlockId).CurrentValue = roomPerspective.Id;
                        }
                    }
                }
            }

            _context.TryUpdateManyToMany(project.EntityFiles, newProject.EntityFiles, o => o.FileEntityId);
            _context.TryUpdateManyToMany(project.EntityTaxonomies, newProject.EntityTaxonomies, o => o.TaxonomyId);

            await _context.SaveChangesAsync();

            return newProject;
        }

        public async Task<bool> DeleteProductAsync(DeleteServiceModel serviceModel)
        {
            foreach (var id in serviceModel.Ids)
            {
                var oldEntity = await GetProjects().FirstAsync(o => o.Id == id);
                var entry = _context.Entry(oldEntity);
                entry.State = EntityState.Deleted;

                foreach (var projectBlock in oldEntity.ProjectBlocks)
                {
                    var projectBlockEntry = _context.Entry(projectBlock);
                    projectBlockEntry.State = EntityState.Deleted;
                }
            }

            var updateResultCount = await _context.SaveChangesAsync();

            return updateResultCount > 0;
        }
    }
}