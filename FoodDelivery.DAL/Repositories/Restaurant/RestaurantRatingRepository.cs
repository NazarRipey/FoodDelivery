using System;
using System.Linq;
using AutoMapper;
using FoodDelivery.DAL.EF.Context;
using FoodDelivery.DAL.EF.Entities;
using FoodDelivery.Entities;
using FoodDelivery.Entities.DTO.Restaurant;
using Microsoft.EntityFrameworkCore;

namespace FoodDelivery.DAL.Repositories
{
	public class RestaurantRatingRepository : BaseRepository, IRestaurantRatingRepository
	{
		public RestaurantRatingRepository(FoodDeliveryDbContext db, IMapper mapper)
			: base(db, mapper)
		{ }

		public Rating GetRating(Guid id)
		{
			Restaurant restaurant = _db.Restaurant.Find(id);

			Rating rating = new Rating()
			{
				AverageRating = restaurant.Ratings.Count() == 0 ?
					0 : Math.Round(restaurant.Ratings.Select(r => r.Rating).Average(), 2),
				RatedCount = restaurant.Ratings.Count()
			};

			return rating;
		}

		public int? GetUserRating(Guid id, Guid? userId)
		{
			int? userRating =
				_db.RestaurantRating
				.Where(rr => rr.RestaurantId == id && rr.UserId == userId)
				.SingleOrDefault()
				?.Rating;

			return userRating;
		}

		public void Rate(RateRestaurantDTO rateRestaurantDTO)
		{
			RestaurantRating restaurantRating = _db.RestaurantRating
				.Where(rr => rr.UserId == rateRestaurantDTO.UserId && rr.RestaurantId == rateRestaurantDTO.RestaurantId)
				.SingleOrDefault();

			if (restaurantRating == null)
			{
				restaurantRating = new RestaurantRating()
				{
					UserId = rateRestaurantDTO.UserId,
					RestaurantId = rateRestaurantDTO.RestaurantId,
					Rating = rateRestaurantDTO.Rating
				};

				_db.RestaurantRating.Add(restaurantRating);
			}
			else
			{
				restaurantRating.Rating = rateRestaurantDTO.Rating;

				_db.Entry(restaurantRating).State = EntityState.Modified;
			}

			SaveChanges();
		}
	}
}
