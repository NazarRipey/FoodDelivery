using FoodDelivery.Entities.Enums.Status;

namespace FoodDelivery.Entities.DTO.UserProfile
{
	public class UserAccountDTO
	{
		public string FullName { get; set; }

		public string Email { get; set; }

		public string PhoneNumber { get; set; }

		public AccountStatus Status { get; set; }
	}
}
