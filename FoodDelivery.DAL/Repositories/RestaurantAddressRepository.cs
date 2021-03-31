using System;
using AutoMapper;
using FoodDelivery.DAL.EF.Context;
using FoodDelivery.DAL.EF.Entities;
using FoodDelivery.Entities.DTO;

namespace FoodDelivery.DAL.Repositories
{
	public class RestaurantAddressRepository : BaseRepository, IRestaurantAddressRepository
	{
		public RestaurantAddressRepository(FoodDeliveryDbContext db, IMapper mapper)
			: base(db, mapper)
		{ }

		public void Add(RestaurantAddressDTO restaurantAddressDTO)
		{
			RestaurantAddress restaurantAddress = _mapper.Map<RestaurantAddress>(restaurantAddressDTO);
			_db.RestaurantAddress.Add(restaurantAddress);

			SaveChanges();
		}

		public void Remove(Guid restaurantAddressId)
		{
			RestaurantAddress restaurantAddress = _db.RestaurantAddress.Find(restaurantAddressId);
			_db.RestaurantAddress.Remove(restaurantAddress);

			SaveChanges();
		}
	}
}
