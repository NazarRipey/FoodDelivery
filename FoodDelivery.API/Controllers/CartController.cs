using System;
using FoodDelivery.API.Models;
using FoodDelivery.BusinessLogic.Facades;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.DTO.Cart;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FoodDelivery.API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[Authorize]
	public class CartController : ControllerBase
	{
		private readonly IUserProfileFacade _userProfileFacade;
		private readonly ICartFacade _cartFacade;

		public CartController(IUserProfileFacade userProfileFacade,
			ICartFacade cartFacade)
		{
			_userProfileFacade = userProfileFacade;
			_cartFacade = cartFacade;
		}

		[HttpGet]
		public CartResponseDTO Get()
		{
			Guid userId = _userProfileFacade.GetByEmail(User.Identity.Name).Id;

			return _cartFacade.Get(userId);
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
			AddCartItemDTO addCartItem = new AddCartItemDTO()
			{
				//Getting Id here and not from FrontEnd
				UserProfileId = _userProfileFacade.GetByEmail(User.Identity.Name).Id,
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
