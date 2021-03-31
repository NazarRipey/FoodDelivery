using System;

namespace FoodDelivery.Entities.DTO
{
	public class RestaurantAddressDTO
	{
		public Guid Id { get; set; }
		public Guid RestaurantId { get; set; }
		public string City { get; set; }
		public string Address { get; set; }
	}
}
