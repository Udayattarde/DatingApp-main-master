using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfile:Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<AppUser,MemberDTO>().
            ForMember(dst=>dst.PhotoUrl,opt=>opt.MapFrom(src =>
            src.Photos.FirstOrDefault(x=>x.IsMainPhoto).URL));
            CreateMap<Photos,PhotosDTO>();
            CreateMap<memberUpdateDTO,AppUser>();
        }
    }
}