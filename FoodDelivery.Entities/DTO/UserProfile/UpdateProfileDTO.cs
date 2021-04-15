using System;

namespace FoodDelivery.Entities.DTO.UserProfile
{
	public class UpdateProfileDTO
	{
		public Guid Id { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public DateTime Birthday { get; set; }
		public string Address { get; set; }
	}
}
