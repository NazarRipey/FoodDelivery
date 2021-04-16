using System;

namespace FoodDelivery.Entities.DTO.Dish
{
	public class RateDishDTO
	{
		public Guid UserId { get; set; }
		public Guid DishId { get; set; }
		public int Rating { get; set; }
	}
}
