using System;
using System.Collections.Generic;
using FoodDelivery.BusinessLogic.Facades;
using FoodDelivery.Entities;
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

		#region image
		[HttpGet]
		[Route("image/{id:Guid}")]
		public string GetImage(Guid id)
		{
			return _restaurantFacade.GetImage(id);
		}

		[HttpPost]
		[Authorize(Roles = "owner")]
		[Route("changeImage/{id:Guid}")]
		public IActionResult ChangeImage(Guid id, [FromBody] FileData image)
		{
			try
			{
				_restaurantFacade.ChangeImage(id, image);
			}
			catch (Exception e)
			{
				return StatusCode(500);
			}

			return Ok();
		}

		[HttpDelete]
		[Authorize(Roles = "owner")]
		[Route("deleteImage/{id:Guid}")]
		public IActionResult DeleteImage(Guid id)
		{
			try
			{
				_restaurantFacade.DeleteImage(id);
			}
			catch (Exception e)
			{
				return StatusCode(500);
			}

			return Ok();
		}
		#endregion

		#region rating
		[HttpGet("rating/{id:Guid}")]
		public Rating GetRestaurantRating(Guid id)
		{
			return _restaurantFacade.GetRestaurantRating(id);
		}

		[HttpPost]
		[Authorize(Roles = "customer")]
		[Route("rate")]
		public IActionResult RateRestaurant(RateRestaurantDTO rateRestaurantDTO)
		{
			try
			{
				_restaurantFacade.RateRestaurant(rateRestaurantDTO);
			}
			catch (Exception e)
			{
				return StatusCode(500);
			}

			return Ok();
		}
		#endregion

		#region owner
		[HttpGet]
		[Route("updaterestaurant/{id:Guid}")]
		[Authorize(Roles = "owner")]
		public RestaurantUpdateDTO GetUpdateDTOById(Guid id)
		{
			return _restaurantFacade.GetUpdateDTOById(id);
		}

		[HttpGet]
		[Route("ownernames")]
		[Authorize(Roles = "owner")]
		public ICollection<string> GetNamesByOwner()
		{
			Guid ownerId = _userProfileFacade.GetByEmail(User.Identity.Name).Id;

			return _restaurantFacade.GetNamesByOwner(ownerId);
		}

		[HttpPost]
		[Route("add")]
		[Authorize(Roles = "owner")]
		public IActionResult Post([FromBody] RestaurantAddDTO restaurantAddDTO)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(RestaurantErrors.ModelInvalid);
			}
			if (_restaurantFacade.GetByName(restaurantAddDTO.Name, null) != null)
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
		[Authorize(Roles = "owner")]
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
		[Authorize(Roles = "owner")]
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
		[Authorize(Roles = "owner")]
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
		[Authorize(Roles = "owner")]
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
		[Authorize(Roles = "owner")]
		public void DeleteAddress(Guid id)
		{
			_restaurantFacade.RemoveAddress(id);
		}

		[HttpDelete("{id}")]
		[Authorize(Roles = "owner")]
		public void Delete(Guid id)
		{
			_restaurantFacade.RemoveRestaurant(id);
		}
		#endregion

		[HttpPost]
		[Route("retrieve")]
		public RestaurantListResponseDTO Retrieve(RestaurantFilterParams filterParams)
		{
			return _restaurantFacade.Retrieve(filterParams);
		}

		[HttpGet("{name}")]
		public RestaurantDetailDTO GetByName(string name)
		{
			Guid? userId = _userProfileFacade.GetByEmail(User.Identity?.Name)?.Id;

			return _restaurantFacade.GetByName(name, userId);
		}

		[HttpGet("{name}/status")]
		public int GetRestaurantStatus(string name)
		{
			return _restaurantFacade.GetRestaurantStatus(name);
		}

		[HttpGet]
		[Route("{id:Guid}/addresses")]
		public ICollection<RestaurantAddressDTO> GetRestaurantAddresses(Guid id)
		{
			return _restaurantFacade.GetAddresses(id);
		}

		[HttpGet]
		[Route("top")]
		public ICollection<RestaurantListDTO> GetTop(int count = 3)
		{
			return _restaurantFacade.GetTop(count);
		}

		[HttpGet]
		[Route("names")]
		public ICollection<string> GetNames()
		{
			return _restaurantFacade.GetAllNames();
		}

		[HttpGet]
		[Route("types")]
		public ICollection<RestaurantTypeDTO> GetTypes()
		{
			return _restaurantFacade.GetTypes();
		}
	}
}
