using System.Collections.Generic;
using FoodDelivery.Entities.DTO.Restaurant;

namespace FoodDelivery.Entities.DTO
{
	public class RestaurantOwnerDetailResponseDTO
	{
		public ICollection<RestaurantOwnerDetailDTO> Restaurants { get; set; }
		public int TotalRestaurantsCount { get; set; }
	}
}
