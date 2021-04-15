using System;
using FoodDelivery.Entities.DTO;

namespace FoodDelivery.DAL.Repositories
{
	public interface ICartItemRepository
	{
		void Add(AddCartItemDTO cartItem);
		void Update(Guid id, int quantity);
		void Remove(Guid id);
		CartItemDTO Get(Guid id);
	}
}
