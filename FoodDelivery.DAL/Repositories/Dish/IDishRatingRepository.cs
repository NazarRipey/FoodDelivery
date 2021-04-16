using System;
using FoodDelivery.Entities;
using FoodDelivery.Entities.DTO.Dish;

namespace FoodDelivery.DAL.Repositories
{
	public interface IDishRatingRepository
	{
		void Rate(RateDishDTO rateDishDTO);
		Rating GetRating(Guid id);
		int? GetUserRating(Guid id, Guid? userId);
	}
}
