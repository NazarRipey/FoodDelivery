using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using FoodDelivery.DAL.EF.Context;
using FoodDelivery.DAL.EF.Entities;
using FoodDelivery.Entities.DTO;

namespace FoodDelivery.DAL.Repositories
{
	public class RestaurantRepository : BaseRepository, IRestaurantRepository
	{
		public RestaurantRepository(FoodDeliveryDbContext db, IMapper mapper)
			: base(db, mapper)
		{ }

		public void Create(RestaurantDTO restaurantDTO)
		{
			Restaurant restaurant = _mapper.Map<Restaurant>(restaurantDTO);

			//Занулення navigation property для того щоб вони повторно не вставлялись????
			restaurant.Type = null;

			_db.Restaurant.Add(restaurant);
			_db.SaveChanges();
		}

		public Restaurant GetByName(string name)
		{
			Restaurant restaurant = _db.Restaurant.Where(r => r.Name == name).SingleOrDefault();
			return restaurant;
		}

		public ICollection<RestaurantDTO> GetMyRestaurants(Guid ownerId)
		{
			List<Restaurant> myRestaurants = _db.Restaurant.Where(r => r.OwnerId == ownerId).ToList();
			ICollection<RestaurantDTO> restaurantDTOs =
				_mapper.Map<ICollection<RestaurantDTO>>(myRestaurants);

			return restaurantDTOs;
		}

		public ICollection<RestaurantTypeDTO> GetTypes()
		{
			ICollection<RestaurantTypeDTO> restaurantTypeDTOs =
				_mapper.Map<ICollection<RestaurantTypeDTO>>(_db.RestaurantType);

			return restaurantTypeDTOs;
		}
	}
}
