using System;

namespace FoodDelivery.Entities.DTO
{
	public class DishDetailDTO
	{
		public Guid Id { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public decimal Price { get; set; }
		public double Weight { get; set; }
		public double? Rating { get; set; }
		public string RestaurantName { get; set; }
		public DishCategoryDTO Category { get; set; }
	}
}
