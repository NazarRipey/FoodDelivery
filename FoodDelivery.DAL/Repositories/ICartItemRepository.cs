using FoodDelivery.Entities.DTO;

namespace FoodDelivery.DAL.Repositories
{
	public interface ICartItemRepository
	{
		void Add(AddCartItemDTO cartItem);
	}
}
