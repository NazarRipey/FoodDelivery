using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FoodDelivery.API.Models
{
	public class SignUpModel
	{
		[Required]
		public string FirstName { get; set; }

		[Required]
		public string LastName { get; set; }

		[Required]
		public string Email { get; set; }

		[Required]
		public string PhoneNumber { get; set; }

		[Required]
		public DateTime Birthday { get; set; }

		[Required]
		public string Password { get; set; }

		[Required]
		public IEnumerable<string> Roles { get; set; }
	}
}
