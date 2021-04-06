using System;
using FoodDelivery.Entities.DTO;

namespace FoodDelivery.BusinessLogic.Facades
{
	public interface ICartFacade
	{
		void AddItem(AddCartItemDTO cartItem);
		CartResponseDTO Get(Guid userId);
		void UpdateItem(Guid id, int quantity);
		void RemoveItem(Guid id);
		void RemoveCart(Guid userId);
		int GetTotalItems(Guid userId);
	}
}
