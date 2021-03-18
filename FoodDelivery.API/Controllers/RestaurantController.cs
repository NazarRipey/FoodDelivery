using System;
using System.Collections.Generic;
using FoodDelivery.BusinessLogic.Facades;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FoodDelivery.API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class RestaurantController : ControllerBase
	{
		private readonly IRestaurantFacade _restaurantFacade;

		public UserManager<IdentityUser> _userManager { get; }

		private readonly IUserProfileFacade _userProfileFacade;

		public RestaurantController(IRestaurantFacade restaurantFacade,
			UserManager<IdentityUser> userManager,
			IUserProfileFacade userProfileFacade)
		{
			_restaurantFacade = restaurantFacade;
			_userManager = userManager;
			_userProfileFacade = userProfileFacade;
		}

		// GET: api/<RestaurantController>
		[HttpGet]
		[Route("types")]
		public ICollection<RestaurantTypeDTO> GetTypes()
		{
			return _restaurantFacade.GetTypes();
		}

		[HttpGet]
		[Route("myrestaurants")]
		[Authorize(Roles = "owner")]
		public ICollection<RestaurantDTO> GetMyRestaurants()
		{
			///????????????????????????????
			IdentityUser user = _userManager.GetUserAsync(User).Result;
			if (user == null)
			{
				throw new Exception();
			}

			Guid ownerId = _userProfileFacade.GetByEmail(user.Email).Id;

			return _restaurantFacade.GetMyRestaurants(ownerId);
		}

		// POST api/<RestaurantController>
		[HttpPost]
		[Route("add")]
		[Authorize(Roles = "owner")]

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
				return BadRequest(e.Message);
			}

			return Ok();
		}

		/*
		// GET api/<RestaurantController>/5
		[HttpGet("{id}")]
		public string Get(int id)
		{
			return "value";
		}

		// PUT api/<RestaurantController>/5
		[HttpPut("{id}")]
		public void Put(int id, [FromBody] string value)
		{
		}

		// DELETE api/<RestaurantController>/5
		[HttpDelete("{id}")]
		public void Delete(int id)
		{
		}*/
	}
}
