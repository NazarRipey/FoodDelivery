using System.Collections.Generic;

namespace FoodDelivery.Entities.DTO
{
	public class RestaurantOrderShortResponseDTO
	{
		public ICollection<RestaurantOrderShortDTO> Orders { get; set; }
		public int TotalOrdersCount { get; set; }
	}
}
