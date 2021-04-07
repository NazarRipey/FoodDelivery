using System;
using FoodDelivery.DAL.Repositories;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.DTO.Cart;

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

		public CartInfoDTO GetCartInfo(Guid userId)
		{
			return _cartRepository.GetCartInfo(userId);
		}

		public void RemoveCart(Guid userId)
		{
			_cartRepository.Remove(userId);
		}

		public void RemoveItem(Guid id)
		{
			_cartItemRepository.Remove(id);
		}

		public void UpdateItem(Guid id, int quantity)
		{
			_cartItemRepository.Update(id, quantity);
		}
	}
}
