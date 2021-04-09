using System.Collections.Generic;

namespace FoodDelivery.Entities.DTO.Order
{
	public class OrderManagerResponseDTO
	{
		public ICollection<OrderManagerDTO> Orders { get; set; }
		public int TotalOrdersCount { get; set; }
	}
}
