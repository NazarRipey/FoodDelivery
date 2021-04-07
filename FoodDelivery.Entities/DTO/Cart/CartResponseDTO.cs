using System;
using System.Collections.Generic;

namespace FoodDelivery.Entities.DTO
{
	public class CartResponseDTO
	{
		public Guid Id { get; set; }
		public ICollection<CartItemDTO> CartItems { get; set; }
		public double TotalPrice { get; set; }
		public DateTime CreatedDate { get; set; }
	}
}
