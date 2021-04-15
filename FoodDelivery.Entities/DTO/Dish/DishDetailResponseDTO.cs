using System.Collections.Generic;

namespace FoodDelivery.Entities.DTO.Dish
{
	public class DishDetailResponseDTO
	{
		public ICollection<DishDetailDTO> Dishes { get; set; }
		public int TotalDishesCount { get; set; }
	}
}
