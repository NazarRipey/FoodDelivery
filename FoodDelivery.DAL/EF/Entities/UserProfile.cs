using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace FoodDelivery.DAL.EF.Entities
{
	public class UserProfile
	{
		[Key]
		public Guid Id { get; set; }

		[ForeignKey("IdentityUser")]
		public string AspNetUserId { get; set; }

		public string FirstName { get; set; }

		public string LastName { get; set; }

		public string Email { get; set; }

		public string PhoneNumber { get; set; }

		public DateTime Birthday { get; set; }

		public string Address { get; set; }

		public int EmailConfirmationCode { get; set; }

		public Guid? ImageName { get; set; }

		public virtual IdentityUser AspNetUser { get; set; }
	}
}
