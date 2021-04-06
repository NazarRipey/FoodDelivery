using System;
using System.Collections.Generic;

namespace FoodDelivery.Entities.DTO
{
	public class RestaurantDetailDTO
	{
		public Guid Id { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public double? Rating { get; set; }
		public RestaurantTypeDTO Type { get; set; }
		public List<RestaurantAddressDTO> Addresses { get; set; }
		public List<DishListDTO> Dishes { get; set; }
	}
}
