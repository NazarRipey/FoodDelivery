using System.Collections.Generic;

namespace FoodDelivery.Entities.DTO
{
	public class RestaurantOrderResponseDTO
	{
		public ICollection<RestaurantOrderDTO> Orders { get; set; }
		public int TotalOrdersCount { get; set; }
	}
}
