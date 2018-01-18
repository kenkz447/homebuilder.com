using AutoMapper;
using Omi.Modules.Blog.Entities;
using Omi.Modules.Blog.ServiceModel;
using Omi.Modules.Blog.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace Omi.Modules.Blog
{
    class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<BlogViewModel, BlogEntity>();
            CreateMap<BlogEntity, BlogViewModel>();

            CreateMap<BlogDetail, BlogViewModel>();
            CreateMap<BlogViewModel, BlogDetail>()
                .ForMember(member => member.EntityId, opt => opt.MapFrom(o => o.Id))
                .ForMember(member => member.Id, opt => opt.Ignore())
                .ForMember(member => member.Language, opt => opt.Ignore());

            CreateMap<BlogEditViewModel, BlogViewModel>();
            CreateMap<BlogViewModel, BlogEditViewModel>();

            CreateMap<BlogFilterServiceModel, BlogGetViewModel>();
            CreateMap<BlogGetViewModel, BlogFilterServiceModel>();
        }
    }
}