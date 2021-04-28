using System;
using System.Collections.Generic;

namespace FoodDelivery.Entities.DTO
{
	public class UserProfileDTO
	{
		public Guid Id { get; set; }
		public string FirstName { get; set; }

		public string LastName { get; set; }

		public string Email { get; set; }

		public string PhoneNumber { get; set; }

		public DateTime Birthday { get; set; }

		public string Address { get; set; }
		public string Base64Image { get; set; }
		public IEnumerable<string> Roles { get; set; }
	}
}
