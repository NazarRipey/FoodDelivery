using System;

namespace FoodDelivery.Entities.DTO
{
	public class DishListDTO
	{
		public Guid Id { get; set; }
		public string Name { get; set; }
		public decimal Price { get; set; }
		public Rating Rating { get; set; }
		public string ImageName { get; set; }
		public string Base64Image { get; set; }
	}
}
