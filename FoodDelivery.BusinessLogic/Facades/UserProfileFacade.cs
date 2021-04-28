using System;
using System.Threading.Tasks;
using FoodDelivery.DAL.EF.Entities;
using FoodDelivery.DAL.Repositories;
using FoodDelivery.Entities;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.DTO.UserProfile;
using FoodDelivery.Entities.FilterParams;
using FoodDelivery.Utilities.Helpers;
using FoodDelivery.Utilities.Managers;

namespace FoodDelivery.BusinessLogic.Facades
{
	public class UserProfileFacade : IUserProfileFacade
	{
		private readonly IUserProfileRepository _userProfileRepository;
		private readonly IEmailManager _emailManager;

		public UserProfileFacade(
			IUserProfileRepository userProfileRepository,
			IEmailManager emailManager)
		{
			_userProfileRepository = userProfileRepository;
			_emailManager = emailManager;
		}

		public async void Create(UserProfile userProfile)
		{
			userProfile.EmailConfirmationCode = GenereateConfirmationCode();
			_userProfileRepository.Create(userProfile);
			await _emailManager.SendConfirmationCodeAsync(userProfile.Email, userProfile.EmailConfirmationCode);
		}

		public async Task SendPasswordToEmail(string email, string password)
		{
			await _emailManager.SendPasswordAsync(email, password);
		}

		public UserProfile GetByEmail(string email)
		{
			UserProfile userProfile = _userProfileRepository.GetByEmail(email);
			return userProfile;
		}

		public UserProfile GetByPhone(string phoneNumber)
		{
			UserProfile userProfile = _userProfileRepository.GetByPhone(phoneNumber);
			return userProfile;
		}

		public async Task SendEmailConfirmationCodeAsync(string email)
		{
			UserProfile userProfile = GetByEmail(email);
			int code = GenereateConfirmationCode();

			userProfile.EmailConfirmationCode = code;
			_userProfileRepository.Update(userProfile);

			await _emailManager.SendConfirmationCodeAsync(email, code);
		}

		private int GenereateConfirmationCode()
		{
			Random random = new Random();
			return random.Next(1000, 9999);
		}

		public UserListResponseDTO RetrieveByRole(UserFilterParams filterParams, string role)
		{
			return _userProfileRepository.RetrieveByRole(filterParams, role);
		}

		public void UpdateProfile(UpdateProfileDTO updateProfile)
		{
			_userProfileRepository.UpdateProfile(updateProfile);
		}

		public UserListResponseDTO RetrieveUsers(UserFilterParams filterParams)
		{
			return _userProfileRepository.RetrieveUsers(filterParams);
		}

		public UserAccountDTO GetAccountById(Guid id)
		{
			return _userProfileRepository.GetAccountById(id);
		}

		public string GetImage(Guid id)
		{
			string imgName = _userProfileRepository.GetImageName(id);

			return FileHelper.GetUserProfileImage(imgName);
		}

		public void ChangeImage(Guid id, FileData image)
		{
			string imgName = _userProfileRepository.GetImageName(id);

			FileHelper.SaveUserProfileImage(image.Data, imgName);
		}

		public void DeleteImage(Guid id)
		{
			string imgName = _userProfileRepository.GetImageName(id);

			FileHelper.DeleteProfileImage(imgName);
		}
	}
}
