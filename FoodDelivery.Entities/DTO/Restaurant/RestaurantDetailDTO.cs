using System;
using System.Collections.Generic;
using FoodDelivery.Entities.Enums.Status;

namespace FoodDelivery.Entities.DTO
{
	public class RestaurantDetailDTO
	{
		public Guid Id { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public Rating Rating { get; set; }
		public RestaurantTypeDTO Type { get; set; }
		public List<RestaurantAddressDTO> Addresses { get; set; }
		public RestaurantStatus Status { get; set; }
	}
}
