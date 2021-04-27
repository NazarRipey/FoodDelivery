using System;
using System.Collections.Generic;
using FoodDelivery.API.Models;
using FoodDelivery.BusinessLogic.Facades;
using FoodDelivery.DAL.EF.Entities;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.DTO.Cart;
using FoodDelivery.Entities.Enums.Errors;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FoodDelivery.API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[Authorize(Roles = "customer")]
	public class CartController : ControllerBase
	{
		private readonly IUserProfileFacade _userProfileFacade;
		private readonly ICartFacade _cartFacade;
		private readonly IDishFacade _dishFacade;

		public CartController(IUserProfileFacade userProfileFacade,
			ICartFacade cartFacade,
			IDishFacade dishFacade)
		{
			_userProfileFacade = userProfileFacade;
			_cartFacade = cartFacade;
			_dishFacade = dishFacade;
		}

		[HttpGet]
		public CartResponseDTO Get()
		{
			Guid userId = _userProfileFacade.GetByEmail(User.Identity.Name).Id;

			return _cartFacade.Get(userId);
		}

		[HttpGet]
		[Route("item/{id}")]
		public CartItemDTO GetItem(Guid id)
		{
			return _cartFacade.GetItem(id);
		}

		[HttpGet]
		[Route("info")]
		public CartInfoDTO GetCartInfo()
		{
			Guid userId = _userProfileFacade.GetByEmail(User.Identity.Name).Id;

			return _cartFacade.GetCartInfo(userId);
		}

		[HttpPost]
		public IActionResult Post([FromBody] CartItemModel cartItem)
		{
			ICollection<int> restrictedCategoryIds = _dishFacade.GetRestrictedCategoriesIds();
			UserProfile userProfile = _userProfileFacade.GetByEmail(User.Identity.Name);

			if (restrictedCategoryIds.Contains(cartItem.DishCategoryId))
			{
				DateTime zeroTime = new DateTime(1, 1, 1);
				TimeSpan span = DateTime.Now - userProfile.Birthday;
				int years = (zeroTime + span).Year - 1;

				if (years < 18)
				{
					return BadRequest(AddToCartErrors.AgeRestriction);
				}
			}

			AddCartItemDTO addCartItem = new AddCartItemDTO()
			{
				//Getting Id here and not from FrontEnd
				UserProfileId = userProfile.Id,
				DishId = cartItem.DishId,
				Quantity = cartItem.Quantity
			};

			try
			{
				_cartFacade.AddItem(addCartItem);
			}
			catch (Exception e)
			{
				return StatusCode(500);
			}

			return Ok();
		}

		[HttpPut("{id}")]
		public IActionResult Put(Guid id, [FromBody] int quantity)
		{
			try
			{
				_cartFacade.UpdateItem(id, quantity);
			}
			catch (Exception e)
			{
				return StatusCode(500);
			}

			return Ok();
		}

		[HttpDelete]
		[Route("item/{id}")]
		public IActionResult DeleteItem(Guid id)
		{
			try
			{
				_cartFacade.RemoveItem(id);
			}
			catch (Exception e)
			{
				return StatusCode(500);
			}

			return Ok();
		}

		[HttpDelete]
		public IActionResult DeleteCart()
		{
			Guid userId = _userProfileFacade.GetByEmail(User.Identity.Name).Id;
			try
			{
				_cartFacade.RemoveCart(userId);
			}
			catch (Exception e)
			{
				return StatusCode(500);
			}

			return Ok();
		}
	}
}
