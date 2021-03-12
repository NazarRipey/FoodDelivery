using System.Threading.Tasks;
using FoodDelivery.DAL.EF.Entities;

namespace FoodDelivery.BusinessLogic.Facades
{
	public interface IUserProfileFacade
	{
		UserProfile GetByEmail(string email);
		UserProfile GetByPhone(string email);
		void Create(UserProfile userProfile);
		Task SendEmailConfirmationCodeAsync(string email);
	}
}
