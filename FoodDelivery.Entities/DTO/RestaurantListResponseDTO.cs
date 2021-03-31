using System.Collections.Generic;

namespace FoodDelivery.Entities.DTO
{
	public class RestaurantListResponseDTO
	{
		public ICollection<RestaurantListDTO> Restaurants { get; set; }
		public int TotalRestaurantsCount { get; set; }
	}
}
