using AutoMapper;
using FoodDelivery.API.Models;
using FoodDelivery.DAL.EF.Entities;
using FoodDelivery.Entities.DTO;
using Microsoft.AspNetCore.Identity;

namespace FoodDelivery.Utilities.Mappers
{
	public class MappingProfile : Profile
	{
		public MappingProfile()
		{
			CreateMap<SignUpModel, UserProfileDTO>().ReverseMap();

			CreateMap<UserProfileDTO, UserProfile>().ReverseMap();

			CreateMap<UserProfileDTO, IdentityUser>()
				.ForMember(d => d.UserName,
					opt => opt.MapFrom(src => src.Email))
				.ReverseMap();

			CreateMap<OwnerRequestDTO, OwnerRequest>().ReverseMap();
		}
	}
}
