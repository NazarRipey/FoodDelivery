using System.Collections.Generic;

namespace FoodDelivery.Entities.DTO
{
	public class DishListResponseDTO
	{
		public ICollection<DishListDTO> Dishes { get; set; }
		public int TotalDishesCount { get; set; }
		public decimal? MinPrice { get; set; }
		public decimal? MaxPrice { get; set; }
	}
}
