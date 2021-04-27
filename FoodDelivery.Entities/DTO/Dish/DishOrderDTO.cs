using System;

namespace FoodDelivery.Entities.DTO.Dish
{
	public class DishOrderDTO
	{
		public string Name { get; set; }
		public Guid RestaurantId { get; set; }
		public string RestaurantName { get; set; }
		public decimal Price { get; set; }
	}
}
