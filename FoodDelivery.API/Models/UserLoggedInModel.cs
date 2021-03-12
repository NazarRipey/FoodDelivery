using System.Collections.Generic;

namespace FoodDelivery.API.Models
{
	public class UserLoggedInModel
	{
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string Email { get; set; }
		public string PhoneNumber { get; set; }
		public string Birthday { get; set; }
		public string Address { get; set; }
		public IEnumerable<string> Roles { get; set; }
	}
}
