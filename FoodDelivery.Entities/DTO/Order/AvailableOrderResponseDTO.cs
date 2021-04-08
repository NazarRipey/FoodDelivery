using System.Collections.Generic;

namespace FoodDelivery.Entities.DTO.Order
{
	public class AvailableOrderResponseDTO
	{
		public ICollection<AvailableOrderDTO> Orders { get; set; }
		public int TotalOrdersCount { get; set; }
	}
}
