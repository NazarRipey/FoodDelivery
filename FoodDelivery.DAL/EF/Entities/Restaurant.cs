using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FoodDelivery.DAL.EF.Entities
{
	public class Restaurant
	{
		[Key]
		public Guid Id { get; set; }

		[ForeignKey("Owner")]
		public Guid OwnerId { get; set; }

		public string Name { get; set; }

		public string Description { get; set; }

		public int Status { get; set; }

		public Guid? ImageName { get; set; }

		[ForeignKey("Type")]
		public int TypeId { get; set; }

		public virtual UserProfile Owner { get; set; }
		public virtual RestaurantType Type { get; set; }
		public virtual List<RestaurantAddress> Addresses { get; set; }
		public virtual List<Dish> Dishes { get; set; }
		public virtual List<RestaurantRating> Ratings { get; set; }
		public virtual List<RestaurantOrder> RestaurantOrders { get; set; }
	}
}
