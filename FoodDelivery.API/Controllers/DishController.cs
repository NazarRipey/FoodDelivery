using System;
using System.Collections.Generic;
using FoodDelivery.BusinessLogic.Facades;
using FoodDelivery.Entities;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.DTO.Dish;
using FoodDelivery.Entities.Enums;
using FoodDelivery.Entities.FilterParams;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FoodDelivery.API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class DishController : ControllerBase
	{
		private readonly IDishFacade _dishFacade;
		private readonly IUserProfileFacade _userProfileFacade;

		public DishController(IDishFacade dishFacade,
			IUserProfileFacade userProfileFacade)
		{
			_dishFacade = dishFacade;
			_userProfileFacade = userProfileFacade;
		}

		[HttpPost]
		[Route("retrieve")]
		public DishListResponseDTO Retrieve(DishFilterParams filterParams)
		{
			return _dishFacade.Retrieve(filterParams);
		}

		[HttpPost]
		[Route("retrievebyrestaurant")]
		public DishRestaurantListResponseDTO RetrieveByRestaurant(DishRestaurantFilterParams filterParams)
		{
			return _dishFacade.RetrieveByRestaurant(filterParams);
		}

		[HttpPost]
		[Route("retrievedetailbyrestaurant")]
		public DishDetailResponseDTO RetrieveDishDetailDTOByRestaurant(DishRestaurantFilterParams filterParams)
		{
			return _dishFacade.RetrieveDishDetailDTOByRestaurant(filterParams);
		}

		[HttpGet]
		[Route("detail/{id:Guid}")]
		public DishDetailDTO GetDishDetailDTOById(Guid id)
		{
			Guid? userId = _userProfileFacade.GetByEmail(User.Identity?.Name)?.Id;

			return _dishFacade.GetDetailDTOById(id, userId);
		}

		[HttpGet]
		[Route("cartdish/{id:Guid}")]
		public DishCartDTO GetCartDTOById(Guid id)
		{
			return _dishFacade.GetCartDTOById(id);
		}

		[HttpGet]
		[Route("updatedish/{id:Guid}")]
		[Authorize(Roles = "owner")]
		public DishUpdateDTO GetUpdateDTOById(Guid id)
		{
			return _dishFacade.GetUpdateDTOById(id);
		}

		[HttpGet("rating/{id:Guid}")]
		public Rating GetDishRating(Guid id)
		{
			return _dishFacade.GetDishRating(id);
		}

		[HttpGet]
		[Route("top")]
		public ICollection<DishListDTO> GetTop(int count = 3)
		{
			return _dishFacade.GetTop(count);
		}


		[HttpGet]
		[Route("categories")]
		public ICollection<DishCategoryDTO> GetCategories()
		{
			return _dishFacade.GetCategories();
		}

		[HttpPost]
		[Authorize(Roles = "owner")]
		public IActionResult Post([FromBody] DishAddDTO dishDTO)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(DishErrors.ModelInvalid);
			}
			if (_dishFacade.GetByNameWithinRestaurant(dishDTO.Name, dishDTO.RestaurantId) != null)
			{
				return BadRequest(DishErrors.AlreadyExistsWithinRestaurant);
			}

			try
			{
				_dishFacade.Create(dishDTO);
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
				_dishFacade.Deactivate(id);
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
				_dishFacade.Activate(id);
			}
			catch (Exception e)
			{
				return StatusCode(500);
			}

			return Ok();
		}

		[HttpPut]
		[Authorize(Roles = "owner")]
		public IActionResult Put([FromBody] DishUpdateDTO dishUpdateDTO)
		{
			try
			{
				_dishFacade.Update(dishUpdateDTO);
			}
			catch (Exception e)
			{
				return StatusCode(500);
			}

			return Ok();
		}

		[HttpDelete("{id}")]
		[Authorize(Roles = "owner")]
		public void Delete(Guid id)
		{
			_dishFacade.Remove(id);
		}

		[HttpPost]
		[Authorize(Roles = "customer")]
		[Route("rate")]
		public IActionResult RateDish(RateDishDTO rateDishDTO)
		{
			try
			{
				_dishFacade.RateDish(rateDishDTO);
			}
			catch (Exception e)
			{
				return StatusCode(500);
			}

			return Ok();
		}
	}
}
