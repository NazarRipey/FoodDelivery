using System.Collections.Generic;

namespace FoodDelivery.Entities.DTO.Order
{
	public class OrderResponseDTO
	{
		public ICollection<OrderShortDTO> Orders { get; set; }
		public int TotalOrdersCount { get; set; }
	}
}
