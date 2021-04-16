using System;
using System.Linq;
using AutoMapper;
using FoodDelivery.DAL.EF.Context;
using FoodDelivery.DAL.EF.Entities;
using FoodDelivery.Entities;
using FoodDelivery.Entities.DTO.Dish;
using Microsoft.EntityFrameworkCore;

namespace FoodDelivery.DAL.Repositories
{
	public class DishRatingRepository : BaseRepository, IDishRatingRepository
	{
		public DishRatingRepository(FoodDeliveryDbContext db, IMapper mapper)
			: base(db, mapper)
		{ }

		public Rating GetRating(Guid id)
		{
			Dish dish = _db.Dish.Find(id);

			Rating rating = new Rating()
			{
				AverageRating = dish.Ratings.Count() == 0 ?
					0 : Math.Round(dish.Ratings.Select(r => r.Rating).Average(), 2),
				RatedCount = dish.Ratings.Count()
			};

			return rating;
		}

		public int? GetUserRating(Guid id, Guid? userId)
		{
			int? userRating =
				_db.DishRating
				.Where(dr => dr.DishId == id && dr.UserId == userId)
				.SingleOrDefault()
				?.Rating;

			return userRating;
		}

		public void Rate(RateDishDTO rateDishDTO)
		{
			DishRating dishRating = _db.DishRating
				.Where(dr => dr.UserId == rateDishDTO.UserId && dr.DishId == rateDishDTO.DishId)
				.SingleOrDefault();

			if (dishRating == null)
			{
				dishRating = new DishRating()
				{
					UserId = rateDishDTO.UserId,
					DishId = rateDishDTO.DishId,
					Rating = rateDishDTO.Rating
				};

				_db.DishRating.Add(dishRating);
			}
			else
			{
				dishRating.Rating = rateDishDTO.Rating;

				_db.Entry(dishRating).State = EntityState.Modified;
			}

			SaveChanges();
		}
	}
}
