using System;
using System.Collections.Generic;
using FoodDelivery.BusinessLogic.Facades;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.Enums;
using FoodDelivery.Entities.Params;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

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

		[HttpGet]
		[AllowAnonymous]
		public ICollection<DishDTO> Get(string dishFilter = null)
		{
			DishParams filter;
			try
			{
				filter = JsonConvert.DeserializeObject<DishParams>(dishFilter);
			}
			catch (Exception e)
			{
				return null;
			}

			return _dishFacade.GetAll(filter);
		}

		[HttpGet]
		[Route("top")]
		[AllowAnonymous]
		public ICollection<DishDTO> GetTop(int count = 3)
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
