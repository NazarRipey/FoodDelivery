using System;
using FoodDelivery.Entities.Enums;

namespace FoodDelivery.Entities.DTO.Order
{
	public class AddOrderDTO
	{
		public Guid CartId { get; set; }
		public int OrderNumber { get; set; }
		public PaymentType PaymentType { get; set; }
		public string Address { get; set; }
		public string Comment { get; set; }
	}
}
