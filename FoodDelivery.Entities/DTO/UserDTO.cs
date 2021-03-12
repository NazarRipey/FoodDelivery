using System;
using System.ComponentModel.DataAnnotations;

namespace FoodDelivery.Entities.DTO
{
	class UserDTO
	{
		[Required]
		[StringLength(250, MinimumLength = 1)]
		public string FirstName { get; set; }

		[Required]
		[StringLength(250, MinimumLength = 1)]
		public string LastName { get; set; }

		[Required]
		[EmailAddress]
		public string Email { get; set; }

		[Required]
		[Phone]
		public string PhoneNumber { get; set; }

		[Required]
		[DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{d}")]
		public DateTime Birthday { get; set; }

		public string Address { get; set; }

		[Required]
		[DataType(DataType.Password)]
		public string Password { get; set; }

		[Required]
		[Compare("Password")]
		[DataType(DataType.Password)]
		public string PasswordConfirm { get; set; }
	}
}
