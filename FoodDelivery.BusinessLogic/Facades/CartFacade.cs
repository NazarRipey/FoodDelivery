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
		private readonly IDishRatingRepository _dishRatingRepository;

		public CartFacade(ICartRepository cartRepository,
			ICartItemRepository cartItemRepository,
			IDishRatingRepository dishRatingRepository)
		{
			_cartRepository = cartRepository;
			_cartItemRepository = cartItemRepository;
			_dishRatingRepository = dishRatingRepository;
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
			CartResponseDTO cartResponseDTO = _cartRepository.Get(userId);

			if(cartResponseDTO != null)
			{
				foreach (var item in cartResponseDTO.CartItems)
				{
					item.Dish.Rating = _dishRatingRepository.GetRating(item.Dish.Id);
				}
			}

			return cartResponseDTO;
		}

		public CartInfoDTO GetCartInfo(Guid userId)
		{
			return _cartRepository.GetCartInfo(userId);
		}

		public CartItemDTO GetItem(Guid id)
		{
			CartItemDTO cartItemDTO = _cartItemRepository.Get(id);
			cartItemDTO.Dish.Rating = _dishRatingRepository.GetRating(cartItemDTO.Dish.Id);

			return cartItemDTO;
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
