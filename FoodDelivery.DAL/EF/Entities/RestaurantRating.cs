using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FoodDelivery.DAL.EF.Entities
{
	public class RestaurantRating
	{
		[Key]
		public Guid Id { get; set; }

		[ForeignKey("Restaurant")]
		public Guid RestaurantId { get; set; }

		[ForeignKey("User")]
		public Guid UserId { get; set; }
		public int Rating { get; set; }

		public virtual UserProfile User { get; set; }
		public virtual Restaurant Restaurant { get; set; }
	}
}
