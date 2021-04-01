using System.Collections.Generic;

namespace FoodDelivery.Entities.DTO.Order
{
	public class OrderResponseDTO
	{
		public ICollection<OrderDTO> Orders { get; set; }
		public int TotalOrdersCount { get; set; }
	}
}
