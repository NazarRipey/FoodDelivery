using System.Collections.Generic;

namespace FoodDelivery.Entities.DTO
{
	public class RestaurantRequestResponseDTO
	{
		public ICollection<RestaurantRequestDTO> RestaurantRequests { get; set; }
		public int TotalRequestsCount { get; set; }
	}
}
