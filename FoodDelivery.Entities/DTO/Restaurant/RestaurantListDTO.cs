using System;

namespace FoodDelivery.Entities.DTO
{
	public class RestaurantListDTO
	{
		public Guid Id { get; set; }
		public string Name { get; set; }
		public Rating Rating { get; set; }
	}
}
