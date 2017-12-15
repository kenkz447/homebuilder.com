using AutoMapper;
using Omi.Modules.HomeBuilder.Entities;
using Omi.Modules.HomeBuilder.ServiceModel;
using Omi.Modules.HomeBuilder.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace Omi.Modules.HomeBuilder.Misc
{
    public class HomeBuilderAutoMapperProfile : Profile
    {
        public HomeBuilderAutoMapperProfile()
        {
            CreateMap<ProjectDetail, ProjectViewModelExtended>();

            CreateMap<ProjectViewModel, ProjectDetail>()
                .ForMember(member => member.Project, opt => opt.Ignore())
                .ForMember(member => member.Language, opt => opt.Ignore());

            CreateMap<ProjectBlockViewModel, ProjectBlockDetail>();

            CreateMap<ProjectBlockDetail, ProjectBlockViewModel>();

            CreateMap<ProjectFilterViewModel, ProjectFilterServiceModel>();
            CreateMap<ProjectFilterServiceModel, ProjectFilterViewModel>();
        }
    }
}
