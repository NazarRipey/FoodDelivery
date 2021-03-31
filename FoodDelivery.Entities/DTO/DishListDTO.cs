using System;

namespace FoodDelivery.Entities.DTO
{
	public class DishListDTO
	{
		public Guid Id { get; set; }
		public string Name { get; set; }
		public decimal Price { get; set; }
	}
}
