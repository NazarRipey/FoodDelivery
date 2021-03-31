using System;
using System.Collections.Generic;
using FoodDelivery.BusinessLogic.Facades;
using FoodDelivery.Entities.DTO;
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
	public class DishController : ControllerBase
	{
		private readonly IDishFacade _dishFacade;

		public DishController(IDishFacade dishFacade)
		{
			_dishFacade = dishFacade;
		}

		[HttpPost]
		[AllowAnonymous]
		[Route("retrieve")]
		public DishListResponseDTO Retrieve(DishFilterParams filterParams)
		{
			return _dishFacade.Retrieve(filterParams);
		}

		[HttpGet]
		[AllowAnonymous]
		[Route("detail/{id:Guid}")]
		public DishDetailDTO GetDishDetailDTOById(Guid id)
		{
			return _dishFacade.GetDetailDTOById(id);
		}

		[HttpGet]
		[AllowAnonymous]
		[Route("cartdish/{id:Guid}")]
		public DishCartDTO GetCartDTOById(Guid id)
		{
			return _dishFacade.GetCartDTOById(id);
		}

		[HttpGet]
		[Route("top")]
		[AllowAnonymous]
		public ICollection<DishListDTO> GetTop(int count = 3)
		{
			return _dishFacade.GetTop(count);
		}


		[HttpGet]
		[Route("categories")]
		[AllowAnonymous]
		public ICollection<DishCategoryDTO> GetCategories()
		{
			return _dishFacade.GetCategories();
		}

		[HttpPost]
		public IActionResult Post([FromBody] DishDTO dishDTO)
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
		public IActionResult Put([FromBody] DishDTO dishDTO)
		{
			try
			{
				_dishFacade.Update(dishDTO);
			}
			catch (Exception e)
			{
				return StatusCode(500);
			}

			return Ok();
		}

		[HttpDelete("{id}")]
		public void Delete(Guid id)
		{
			_dishFacade.Remove(id);
		}
	}
}
