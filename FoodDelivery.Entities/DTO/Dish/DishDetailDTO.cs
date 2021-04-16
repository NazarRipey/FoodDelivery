using System;
using FoodDelivery.Entities.Enums.Status;

namespace FoodDelivery.Entities.DTO
{
	public class DishDetailDTO
	{
		public Guid Id { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public decimal Price { get; set; }
		public double Weight { get; set; }
		public DishStatus? Status { get; set; }
		public string RestaurantName { get; set; }
		public Rating Rating { get; set; }
		public int? UserRating { get; set; }
		public DishCategoryDTO Category { get; set; }
	}
}
