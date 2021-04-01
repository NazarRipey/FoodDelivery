using System;

namespace FoodDelivery.Entities.DTO
{
	public class DishUpdateDTO
	{
		public Guid Id { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public decimal Price { get; set; }
		public double Weight { get; set; }
	}
}
