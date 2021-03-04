using System;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace FoodDelivery.DAL.EF.Entities
{
	public class User : IdentityUser
	{
		public string FirstName { get; set; }
		public string LastName { get; set; }

		[Column(TypeName = "Date")]
		public DateTime Birthday { get; set; }
		public string Address { get; set; }
	}
}
