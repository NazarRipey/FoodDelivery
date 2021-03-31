using System.Collections.Generic;
using FoodDelivery.Entities.DTO;

namespace FoodDelivery.DAL.Repositories
{
	public interface IRestaurantTypeRepository
	{
		ICollection<RestaurantTypeDTO> GetTypes();
	}
}
