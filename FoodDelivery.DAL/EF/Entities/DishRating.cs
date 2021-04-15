using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FoodDelivery.DAL.EF.Entities
{
	public class DishRating
	{
		[Key]
		public Guid Id { get; set; }

		[ForeignKey("Dish")]
		public Guid DishId { get; set; }

		[ForeignKey("User")]
		public Guid UserId { get; set; }
		public int Rating { get; set; }

		public virtual UserProfile User { get; set; }
		public virtual Dish Dish { get; set; }
	}
}
