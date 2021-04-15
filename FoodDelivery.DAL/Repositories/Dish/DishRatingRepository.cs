using System.Linq;
using AutoMapper;
using FoodDelivery.DAL.EF.Context;
using FoodDelivery.DAL.EF.Entities;
using FoodDelivery.Entities.DTO.Dish;
using Microsoft.EntityFrameworkCore;

namespace FoodDelivery.DAL.Repositories
{
	public class DishRatingRepository : BaseRepository, IDishRatingRepository
	{
		public DishRatingRepository(FoodDeliveryDbContext db, IMapper mapper)
			: base(db, mapper)
		{ }

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
