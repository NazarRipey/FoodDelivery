using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FoodDelivery.DAL.EF.Entities
{
	public class Dish
	{
		[Key]
		public Guid Id { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public decimal Price { get; set; }
		public double Weight { get; set; }

		public int Status { get; set; }

		[ForeignKey("Category")]
		public int CategoryId { get; set; }


		[ForeignKey("Restaurant")]
		public Guid RestaurantId { get; set; }

		public virtual DishCategory Category { get; set; }

		public virtual Restaurant Restaurant { get; set; }
		public virtual List<DishRating> Ratings { get; set; }
	}
}
