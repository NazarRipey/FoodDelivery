using System.Collections.Generic;

namespace FoodDelivery.Entities.DTO
{
	public class RestaurantDetailResponseDTO
	{
		public ICollection<RestaurantDetailDTO> Restaurants { get; set; }
		public int TotalRestaurantsCount { get; set; }
	}
}
