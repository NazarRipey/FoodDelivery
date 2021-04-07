using System;
using System.Linq;
using AutoMapper;
using FoodDelivery.DAL.EF.Context;
using FoodDelivery.DAL.EF.Entities;
using FoodDelivery.Entities.DTO;
using Microsoft.EntityFrameworkCore;

namespace FoodDelivery.DAL.Repositories
{
	public class CartItemRepository : BaseRepository, ICartItemRepository
	{
		public CartItemRepository(FoodDeliveryDbContext db, IMapper mapper)
			: base(db, mapper)
		{ }

		public void Add(AddCartItemDTO cartItem)
		{
			Guid cartId = _db.Cart.Where(c => c.UserProfileId == cartItem.UserProfileId).Single().Id;

			CartItem item = _db.CartItem.Where(i => i.CartId == cartId && i.DishId == cartItem.DishId).SingleOrDefault();

			if (item == null)
			{
				item = new CartItem()
				{
					CartId = cartId,
					DishId = cartItem.DishId,
					Quantity = cartItem.Quantity
				};

				_db.CartItem.Add(item);
			}
			else
			{
				item.Quantity += cartItem.Quantity;

				_db.Entry(item).State = EntityState.Modified;
			}

			SaveChanges();
		}

		public void Remove(Guid id)
		{
			CartItem cartItem = _db.CartItem.Find(id);

			if (cartItem.Cart.CartItems.Count == 1)
			{
				_db.Remove(cartItem.Cart);
			}
			_db.Remove(cartItem);

			SaveChanges();
		}

		public void Update(Guid id, int quantity)
		{
			CartItem item = _db.CartItem.Find(id);
			item.Quantity = quantity;

			_db.Entry(item).State = EntityState.Modified;

			SaveChanges();
		}
	}
}
