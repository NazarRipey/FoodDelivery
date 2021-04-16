using System;
using FoodDelivery.Entities;
using FoodDelivery.Entities.DTO.Restaurant;

namespace FoodDelivery.DAL.Repositories
{
	public interface IRestaurantRatingRepository
	{
		Rating GetRating(Guid id);
		void Rate(RateRestaurantDTO rateRestaurantDTO);
		int? GetUserRating(Guid id, Guid? userId);
	}
}
