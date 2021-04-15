using System;

namespace FoodDelivery.Entities.DTO.Order
{
	public class AvailableOrderDTO
	{
		public Guid Id { get; set; }
		public string CustomerName { get; set; }
		public int OrderNumber { get; set; }
		public DateTime CreatedDate { get; set; }
		public string ContactPhoneNumber { get; set; }
		public int TotalSum { get; set; }
	}
}
