using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace FoodDelivery.DAL.EF.Entities
{
	public class UserProfile
	{
		[Key]
		[Required]
		public Guid Id { get; set; }

		[Required]
		[ForeignKey("IdentityUser")]
		public string AspNetUserId { get; set; }

		[Required]
		public string FirstName { get; set; }

		[Required]
		public string LastName { get; set; }

		[Required]
		[EmailAddress]
		public string Email { get; set; }

		[Required]
		public string PhoneNumber { get; set; }

		[Required]
		[Column(TypeName = "Date")]
		public DateTime Birthday { get; set; }

		public string Address { get; set; }

		public int EmailConfirmationCode { get; set; }

		public virtual IdentityUser AspNetUser { get; set; }
	}
}
