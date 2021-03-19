using System;
using System.Collections.Generic;

namespace FoodDelivery.Entities.DTO
{
	public class RestaurantDTO
	{
		public Guid Id { get; set; }
		public Guid OwnerId { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public double? Rating { get; set; }
		public RestaurantTypeDTO Type { get; set; }
		public List<RestaurantAddressDTO> Addresses { get; set; }
	}
}
