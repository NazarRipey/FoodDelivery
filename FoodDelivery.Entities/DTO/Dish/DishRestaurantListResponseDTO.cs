using System.Collections.Generic;

namespace FoodDelivery.Entities.DTO.Dish
{
	public class DishRestaurantListResponseDTO
	{
		public ICollection<DishListDTO> Dishes { get; set; }
		public int TotalDishesCount { get; set; }
	}
}
