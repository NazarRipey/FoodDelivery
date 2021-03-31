using System;
using FoodDelivery.Entities.DTO;

namespace FoodDelivery.BusinessLogic.Facades
{
	public interface ICartFacade
	{
		void AddItem(AddCartItemDTO cartItem);
		CartResponseDTO Get(Guid userId);
	}
}
