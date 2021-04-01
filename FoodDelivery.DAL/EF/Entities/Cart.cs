using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FoodDelivery.DAL.EF.Entities
{
	public class Cart
	{
		[Key]
		public Guid Id { get; set; }
		[ForeignKey("UserProfile")]
		public Guid UserProfileId { get; set; }
		public DateTime CreatedDate { get; set; }
		public virtual UserProfile UserProfile { get; set; }
		public virtual List<CartItem> CartItems { get; set; }
	}
}
