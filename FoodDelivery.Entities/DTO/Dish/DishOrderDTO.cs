using System;

namespace FoodDelivery.Entities.DTO.Dish
{
	public class DishOrderDTO
	{
		public Guid Id { get; set; }
		public string Name { get; set; }
		public string RestaurantName { get; set; }
		public decimal Price { get; set; }
	}
}
