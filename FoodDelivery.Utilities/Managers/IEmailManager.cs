using System.Threading.Tasks;

namespace FoodDelivery.Utilities.Managers
{
	public interface IEmailManager
	{
		Task SendConfirmationCodeAsync(string email, int code);
	}
}
