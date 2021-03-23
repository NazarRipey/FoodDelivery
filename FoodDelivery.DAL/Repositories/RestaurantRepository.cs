using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using FoodDelivery.DAL.EF.Context;
using FoodDelivery.DAL.EF.Entities;
using FoodDelivery.Entities.DTO;
using Microsoft.EntityFrameworkCore;

namespace FoodDelivery.DAL.Repositories
{
	public class RestaurantRepository : BaseRepository, IRestaurantRepository
	{
		public RestaurantRepository(FoodDeliveryDbContext db, IMapper mapper)
			: base(db, mapper)
		{ }

		public void AddAddress(RestaurantAddressDTO restaurantAddressDTO)
		{
			RestaurantAddress restaurantAddress = _mapper.Map<RestaurantAddress>(restaurantAddressDTO);
			_db.RestaurantAddress.Add(restaurantAddress);

			_db.SaveChanges();
		}

		public void Create(RestaurantDTO restaurantDTO)
		{
			Restaurant restaurant = _mapper.Map<Restaurant>(restaurantDTO);

			//Занулення navigation property для того щоб вони повторно не вставлялись????
			restaurant.Type = null;

			_db.Restaurant.Add(restaurant);

			_db.SaveChanges();
		}

		public ICollection<RestaurantDTO> GetAll()
		{
			ICollection<RestaurantDTO> restaurantDTOs =
				_mapper.Map<ICollection<RestaurantDTO>>(_db.Restaurant
					.Include(r => r.Type));

			return restaurantDTOs;
		}

		public ICollection<string> GetAllNames()
		{
			ICollection<string> names = _db.Restaurant.Select(r => r.Name).ToList();

			return names;
		}

		public RestaurantDTO GetByName(string name)
		{
			Restaurant restaurant = _db.Restaurant.
				Where(r => r.Name == name)
				.Include(r => r.Addresses)
				.Include(r => r.Type)
				.Include(r => r.Dishes)
					.ThenInclude(d => d.Restaurant)
				.SingleOrDefault();

			RestaurantDTO restaurantDTO = _mapper.Map<RestaurantDTO>(restaurant);

			return restaurantDTO;
		}

		public ICollection<RestaurantDTO> GetMyRestaurants(Guid ownerId)
		{
			List<Restaurant> myRestaurants = _db.Restaurant.Where(r => r.OwnerId == ownerId)
				.Include(r => r.Type)
				.Include(r => r.Addresses)
				.Include(r => r.Dishes)
				.ToList();

			ICollection<RestaurantDTO> restaurantDTOs =
				_mapper.Map<ICollection<RestaurantDTO>>(myRestaurants);

			return restaurantDTOs;
		}

		public string GetNameById(Guid id)
		{
			string name = _db.Restaurant.Find(id).Name;

			return name;
		}

		public ICollection<RestaurantDTO> GetTop(int count)
		{
			List<Restaurant> topRestaurants = _db.Restaurant
				.OrderBy(r => r.Rating)
				.Take(count)
				.Include(r => r.Type)
				.ToList();

			ICollection<RestaurantDTO> topRestaurantsDTOs = _mapper
				.Map<ICollection<RestaurantDTO>>(topRestaurants);

			return topRestaurantsDTOs;
		}

		public ICollection<RestaurantTypeDTO> GetTypes()
		{
			ICollection<RestaurantTypeDTO> restaurantTypeDTOs =
				_mapper.Map<ICollection<RestaurantTypeDTO>>(_db.RestaurantType);

			return restaurantTypeDTOs;
		}

		public void RemoveAddress(Guid restaurantAddressId)
		{
			RestaurantAddress restaurantAddress = _db.RestaurantAddress.Find(restaurantAddressId);
			_db.RestaurantAddress.Remove(restaurantAddress);

			_db.SaveChanges();
		}

		public void RemoveRestaurant(Guid restaurantId)
		{
			Restaurant restaurant = _db.Restaurant.Find(restaurantId);
			_db.Restaurant.Remove(restaurant);

			_db.SaveChanges();
		}

		public void Update(RestaurantDTO restaurantDTO)
		{
			Restaurant restaurant = _mapper.Map<Restaurant>(restaurantDTO);
			_db.Entry(restaurant).State = EntityState.Modified;

			SaveChanges();
		}
	}
}
