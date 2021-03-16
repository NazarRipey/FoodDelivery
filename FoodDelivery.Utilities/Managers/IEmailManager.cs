using System.Threading.Tasks;
using FoodDelivery.Entities.Enums;

namespace FoodDelivery.Utilities.Managers
{
	public interface IEmailManager
	{
		Task SendConfirmationCodeAsync(string email, int code);
		Task SendRoleRequestStatusChangedAsync(string email, RoleRequestStatus roleRequestStatus);
	}
}
