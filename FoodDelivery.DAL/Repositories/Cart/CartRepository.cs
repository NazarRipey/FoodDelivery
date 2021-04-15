using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using FoodDelivery.DAL.EF.Context;
using FoodDelivery.DAL.EF.Entities;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.DTO.Cart;

namespace FoodDelivery.DAL.Repositories
{
	public class CartRepository : BaseRepository, ICartRepository
	{
		private readonly int cartLifeTime = 900;
		public CartRepository(FoodDeliveryDbContext db, IMapper mapper)
			: base(db, mapper)
		{ }

		public void Add(Guid userProfileId)
		{
			Cart cart = new Cart()
			{
				UserProfileId = userProfileId,
				CreatedDate = DateTime.Now
			};

			_db.Add(cart);
			_db.SaveChanges();
		}

		public CartResponseDTO Get(Guid userId)
		{
			Cart cart = _db.Cart.Where(c => c.UserProfileId == userId).SingleOrDefault();

			ICollection<CartItemDTO> cartItemDTOs = _mapper.Map<ICollection<CartItemDTO>>(cart?.CartItems);

			if (cartItemDTOs.Count() > 0)
			{
				CartResponseDTO cartResponse = new CartResponseDTO()
				{
					Id = cart.Id,
					CartItems = cartItemDTOs,
					CreatedDate = cart.CreatedDate
				};

				return cartResponse;
			}

			return null;
		}

		public Cart GetByUserProfileId(Guid userProfileId)
		{
			Cart cart = _db.Cart.Where(c => c.UserProfileId == userProfileId).SingleOrDefault();

			return cart;
		}

		public CartInfoDTO GetCartInfo(Guid userId)
		{
			Cart cart = _db.Cart.Where(c => c.UserProfileId == userId).SingleOrDefault();
			CartInfoDTO cartInfoDTO = null;

			if (cart != null)
			{
				TimeSpan ts = DateTime.Now - cart.CreatedDate;

				cartInfoDTO = new CartInfoDTO()
				{
					Total = cart.CartItems.Count(),
					TimeLeft = cartLifeTime - (int)ts.TotalSeconds
				};
			}

			return cartInfoDTO;
		}

		public void Remove(Guid userId)
		{
			Cart cart = _db.Cart.Where(c => c.UserProfileId == userId).SingleOrDefault();

			if (cart != null)
			{
				_db.CartItem.RemoveRange(cart.CartItems);
				_db.Cart.Remove(cart);

				_db.SaveChanges();
			}
		}
	}
}
