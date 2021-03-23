using System;

namespace FoodDelivery.Entities.DTO
{
	public class DishDTO
	{
		public Guid Id { get; set; }
		public Guid RestaurantId { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public decimal Price { get; set; }
		public double Weight { get; set; }
		public double? Rating { get; set; }
		public DishCategoryDTO Category { get; set; }
	}
}
