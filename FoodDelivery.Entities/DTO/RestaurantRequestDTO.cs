using System;

namespace FoodDelivery.Entities.DTO
{
	public class RestaurantRequestDTO
	{
		public Guid Id { get; set; }
		public string Name { get; set; }
		public RestaurantTypeDTO Type { get; set; }
		public int Status { get; set; }
		public UserShortProfileDTO UserProfile { get; set; }

		public DateTime CreatedDate { get; set; }

		public DateTime? ClosedDate { get; set; }
	}
}
