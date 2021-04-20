using System;
using System.Collections.Generic;

namespace FoodDelivery.Entities.DTO.Restaurant
{
	public class RestaurantAddDTO
	{
		public Guid Id { get; set; }
		public Guid OwnerId { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public RestaurantTypeDTO Type { get; set; }
		public List<RestaurantAddressDTO> Addresses { get; set; }
		public FileData Image { get; set; }
	}
}
