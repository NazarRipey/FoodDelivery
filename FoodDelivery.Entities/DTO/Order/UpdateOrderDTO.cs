using System;

namespace FoodDelivery.Entities.DTO.Order
{
	public class UpdateOrderDTO
	{
		public Guid Id { get; set; }
		public int OrderNumber { get; set; }
		public string ContactPhoneNumber { get; set; }
		public string Address { get; set; }
		public string Comment { get; set; }
	}
}
