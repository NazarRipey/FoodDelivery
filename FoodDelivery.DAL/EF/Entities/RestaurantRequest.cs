using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FoodDelivery.DAL.EF.Entities
{
	public class RestaurantRequest
	{
		[Key]
		public Guid Id { get; set; }

		[ForeignKey("UserProfile")]
		public Guid UserProfileId { get; set; }

		public int Status { get; set; }

		[ForeignKey("Restaurant")]
		public Guid RestaurantId { get; set; }

		public DateTime CreatedDate { get; set; }

		public DateTime? ClosedDate { get; set; }

		public virtual UserProfile UserProfile { get; set; }
		public virtual Restaurant Restaurant { get; set; }
	}
}
