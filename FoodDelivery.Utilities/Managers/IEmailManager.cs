using System.Threading.Tasks;
using FoodDelivery.Entities.Enums.Status;

namespace FoodDelivery.Utilities.Managers
{
	public interface IEmailManager
	{
		Task SendConfirmationCodeAsync(string email, int code);
		Task SendOwnerRequestStatusChangedAsync(string email, OwnerRequestStatus ownerRequestStatus);
		Task SendRestaurantRequestStatusChangedAsync(string email,
			string restaurantName,
			RestaurantRequestStatus restaurantRequestStatus);
		Task SendPasswordAsync(string email, string password);
	}
}
