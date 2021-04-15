using FoodDelivery.Entities.DTO.Dish;

namespace FoodDelivery.DAL.Repositories
{
	public interface IDishRatingRepository
	{
		void Rate(RateDishDTO rateDishDTO);
	}
}
