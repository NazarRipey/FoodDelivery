using System;
using System.Collections.Generic;
using FoodDelivery.BusinessLogic.Facades;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FoodDelivery.API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[Authorize(Roles = "owner")]
	public class RestaurantController : ControllerBase
	{
		private readonly IRestaurantFacade _restaurantFacade;
		private readonly IUserProfileFacade _userProfileFacade;

		public RestaurantController(IRestaurantFacade restaurantFacade,
			IUserProfileFacade userProfileFacade)
		{
			_restaurantFacade = restaurantFacade;
			_userProfileFacade = userProfileFacade;
		}

		[HttpGet]
		[AllowAnonymous]
		public ICollection<RestaurantDTO> Get()
		{
			return _restaurantFacade.GetAll();
		}

		[HttpGet("{name}")]
		[AllowAnonymous]
		public RestaurantDTO GetByName(string name)
		{
			return _restaurantFacade.GetByName(name);
		}

		[HttpGet]
		[Route("top")]
		[AllowAnonymous]
		public ICollection<RestaurantDTO> GetTop(int count = 3)
		{
			return _restaurantFacade.GetTop(count);
		}

		[HttpGet]
		[Route("types")]
		[AllowAnonymous]
		public ICollection<RestaurantTypeDTO> GetTypes()
		{
			return _restaurantFacade.GetTypes();
		}

		[HttpGet]
		[Route("myrestaurants")]
		public ICollection<RestaurantDTO> GetMyRestaurants()
		{
			///????????????????????????????
			///
			Guid ownerId = _userProfileFacade.GetByEmail(User.Identity.Name).Id;

			return _restaurantFacade.GetMyRestaurants(ownerId);
		}

		[HttpPost]
		[Route("add")]

		public IActionResult Post([FromBody] RestaurantDTO restaurantDTO)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(RestaurantErrors.ModelInvalid);
			}
			if (_restaurantFacade.GetByName(restaurantDTO.Name) != null)
			{
				return BadRequest(RestaurantErrors.AlreadyExistsName);
			}

			try
			{
				_restaurantFacade.Create(restaurantDTO);
			}
			catch (Exception e)
			{
				return StatusCode(500);
			}

			return Ok();
		}


		[HttpPost]
		[Route("address")]
		public IActionResult PostAddress(RestaurantAddressDTO restaurantAddressDTO)
		{
			try
			{
				_restaurantFacade.AddAddress(restaurantAddressDTO);
			}
			catch (Exception e)
			{
				return StatusCode(500);
			}

			return Ok();
		}

		[HttpPut]
		public IActionResult Put([FromBody] RestaurantDTO restaurantDTO)
		{
			try
			{
				_restaurantFacade.Update(restaurantDTO);
			}
			catch (Exception e)
			{
				return StatusCode(500);
			}

			return Ok();
		}

		[HttpDelete]
		[Route("address/{id}")]
		public void DeleteAddress(Guid id)
		{
			_restaurantFacade.RemoveAddress(id);
		}

		[HttpDelete("{id}")]
		public void Delete(Guid id)
		{
			_restaurantFacade.RemoveRestaurant(id);
		}
	}
}
