using System;
using System.Threading.Tasks;
using FoodDelivery.DAL.EF.Entities;
using FoodDelivery.DAL.Repositories;
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
	}
}
