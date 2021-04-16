using System;

namespace FoodDelivery.Entities.DTO.Restaurant
{
	public class RateRestaurantDTO
	{
		public Guid UserId { get; set; }
		public Guid RestaurantId { get; set; }
		public int Rating { get; set; }
	}
}
