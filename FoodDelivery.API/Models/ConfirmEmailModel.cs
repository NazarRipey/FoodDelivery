using System.ComponentModel.DataAnnotations;

namespace FoodDelivery.API.Models
{
	public class ConfirmEmailModel
	{
		[Required]
		public string Email { get; set; }


		[Required]
		public int Code { get; set; }
	}
}
