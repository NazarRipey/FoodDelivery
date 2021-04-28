using System;
using System.Threading.Tasks;
using FoodDelivery.DAL.EF.Entities;
using FoodDelivery.Entities;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.DTO.UserProfile;
using FoodDelivery.Entities.FilterParams;

namespace FoodDelivery.BusinessLogic.Facades
{
	public interface IUserProfileFacade
	{
		UserProfile GetByEmail(string email);
		UserProfile GetByPhone(string email);
		void Create(UserProfile userProfile);
		Task SendEmailConfirmationCodeAsync(string email);
		Task SendPasswordToEmail(string email, string password);
		UserListResponseDTO RetrieveByRole(UserFilterParams filterParams, string role);
		void UpdateProfile(UpdateProfileDTO updateProfile);
		UserListResponseDTO RetrieveUsers(UserFilterParams filterParams);
		UserAccountDTO GetAccountById(Guid id);
		void ChangeImage(Guid id, FileData image);
		void DeleteImage(Guid id);
		string GetImage(Guid id);
	}
}
