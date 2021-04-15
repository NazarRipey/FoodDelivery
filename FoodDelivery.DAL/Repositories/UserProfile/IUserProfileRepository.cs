using System;
using FoodDelivery.DAL.EF.Entities;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.DTO.UserProfile;
using FoodDelivery.Entities.FilterParams;

namespace FoodDelivery.DAL.Repositories
{
	public interface IUserProfileRepository
	{
		UserProfile GetByEmail(string email);
		UserProfile GetByPhone(string phoneNumber);
		void Update(UserProfile userProfile);
		void Create(UserProfile userProfile);
		UserListResponseDTO RetrieveByRole(UserFilterParams filterParams, string role);
		void UpdateProfile(UpdateProfileDTO updateProfile);
		UserListResponseDTO RetrieveUsers(UserFilterParams filterParams);
		UserAccountDTO GetAccountById(Guid id);
	}
}
