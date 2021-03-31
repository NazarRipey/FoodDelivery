using System;
using FoodDelivery.DAL.Repositories;
using FoodDelivery.Entities.DTO;

namespace FoodDelivery.BusinessLogic.Facades
{
	public class CartFacade : ICartFacade
	{
		private readonly ICartRepository _cartRepository;
		private readonly ICartItemRepository _cartItemRepository;

		public CartFacade(ICartRepository cartRepository, ICartItemRepository cartItemRepository)
		{
			_cartRepository = cartRepository;
			_cartItemRepository = cartItemRepository;
		}

		public void AddItem(AddCartItemDTO cartItem)
		{
			if (_cartRepository.GetByUserProfileId(cartItem.UserProfileId) == null)
			{
				_cartRepository.Add(cartItem.UserProfileId);
			}

			_cartItemRepository.Add(cartItem);
		}

		public CartResponseDTO Get(Guid userId)
		{
			return _cartRepository.Get(userId);
		}
	}
}
