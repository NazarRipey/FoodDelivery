using System.Threading.Tasks;
using FoodDelivery.DAL.EF.Entities;
using FoodDelivery.Entities.DTO;
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
		UserListResponseDTO RetrieveByRole(OrderManagerFilterParams filterParams, string role);
	}
}
