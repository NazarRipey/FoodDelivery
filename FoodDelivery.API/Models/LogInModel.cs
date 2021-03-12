using System.ComponentModel.DataAnnotations;

namespace FoodDelivery.API.Models
{
	public class LogInModel
	{
		[Required]
		public string Email { get; set; }


		[Required]
		public string Password { get; set; }

		public bool RememberMe { get; set; }
	}
}
