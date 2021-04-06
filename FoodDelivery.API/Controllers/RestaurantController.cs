using System;
using System.Collections.Generic;
using FoodDelivery.BusinessLogic.Facades;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.DTO.Restaurant;
using FoodDelivery.Entities.Enums;
using FoodDelivery.Entities.FilterParams;
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
		private readonly IRestaurantRequestFacade _restaurantRequestFacade;

		public RestaurantController(IRestaurantFacade restaurantFacade,
			IUserProfileFacade userProfileFacade,
			IRestaurantRequestFacade restaurantRequestFacade)
		{
			_restaurantFacade = restaurantFacade;
			_userProfileFacade = userProfileFacade;
			_restaurantRequestFacade = restaurantRequestFacade;
		}

		[HttpPost]
		[AllowAnonymous]
		[Route("retrieve")]
		public RestaurantListResponseDTO Retrieve(RestaurantFilterParams filterParams)
		{
			return _restaurantFacade.Retrieve(filterParams);
		}

		[HttpPost]
		[Route("myrestaurants")]
		public RestaurantOwnerDetailResponseDTO RetrieveMyRestaurants(MyRestaurantsFilterParams filterParams)
		{
			Guid ownerId = _userProfileFacade.GetByEmail(User.Identity.Name).Id;

			return _restaurantFacade.RetrieveMyRestaurants(filterParams, ownerId);
		}

		[HttpGet("{name}")]
		[AllowAnonymous]
		public RestaurantDetailDTO GetByName(string name)
		{
			return _restaurantFacade.GetByName(name);
		}

		[HttpGet]
		[Route("updaterestaurant/{id:Guid}")]
		public RestaurantUpdateDTO GetUpdateDTOById(Guid id)
		{
			return _restaurantFacade.GetUpdateDTOById(id);
		}

		[HttpGet]
		[Route("top")]
		[AllowAnonymous]
		public ICollection<RestaurantListDTO> GetTop(int count = 3)
		{
			return _restaurantFacade.GetTop(count);
		}

		[HttpGet]
		[Route("names")]
		[AllowAnonymous]
		public ICollection<string> GetNames()
		{
			return _restaurantFacade.GetAllNames();
		}

		[HttpGet]
		[Route("types")]
		[AllowAnonymous]
		public ICollection<RestaurantTypeDTO> GetTypes()
		{
			return _restaurantFacade.GetTypes();
		}

		[HttpPost]
		[Route("add")]
		public IActionResult Post([FromBody] RestaurantAddDTO restaurantAddDTO)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(RestaurantErrors.ModelInvalid);
			}
			if (_restaurantFacade.GetByName(restaurantAddDTO.Name) != null)
			{
				return BadRequest(RestaurantErrors.AlreadyExistsName);
			}

			try
			{
				restaurantAddDTO.Id = Guid.NewGuid();

				_restaurantFacade.Create(restaurantAddDTO);
				_restaurantRequestFacade.Create(restaurantAddDTO.OwnerId, restaurantAddDTO.Id);
			}
			catch (Exception e)
			{
				return StatusCode(500);
			}

			return Ok();
		}

		[HttpPost]
		[Route("deactivate")]
		public IActionResult Deactivate([FromBody] Guid id)
		{
			try
			{
				_restaurantFacade.Deactivate(id);
			}
			catch (Exception e)
			{
				return StatusCode(500);
			}

			return Ok();
		}

		[HttpPost]
		[Route("activate")]
		public IActionResult Activate([FromBody] Guid id)
		{
			try
			{
				_restaurantFacade.Activate(id);
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
		public IActionResult Put([FromBody] RestaurantUpdateDTO restaurantUpdateDTO)
		{
			try
			{
				_restaurantFacade.Update(restaurantUpdateDTO);
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
