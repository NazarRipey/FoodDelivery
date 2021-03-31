using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using FoodDelivery.DAL.EF.Context;
using FoodDelivery.Entities.DTO;

namespace FoodDelivery.DAL.Repositories
{
	public class RestaurantTypeRepository : BaseRepository, IRestaurantTypeRepository
	{
		public RestaurantTypeRepository(FoodDeliveryDbContext db, IMapper mapper)
			: base(db, mapper)
		{ }

		public ICollection<RestaurantTypeDTO> GetTypes()
		{
			ICollection<RestaurantTypeDTO> restaurantTypes =
				_mapper.Map<ICollection<RestaurantTypeDTO>>(_db.RestaurantType);

			return restaurantTypes;
		}
	}
}
