using System;

namespace FoodDelivery.Entities.DTO
{
	public class DishAddDTO
	{
		public Guid RestaurantId { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public decimal Price { get; set; }
		public double Weight { get; set; }
		public DishCategoryDTO Category { get; set; }
		public FileData Image { get; set; }
	}
}
