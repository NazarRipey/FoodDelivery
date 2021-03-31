using System;
using FoodDelivery.BusinessLogic.Facades;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.FilterParams;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FoodDelivery.API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[Authorize(Roles = "admin")]
	public class RestaurantRequestController : ControllerBase
	{
		private readonly IRestaurantRequestFacade _restaurantRequestFacade;

		public RestaurantRequestController(IRestaurantRequestFacade restaurantRequestFacade)
		{
			_restaurantRequestFacade = restaurantRequestFacade;
		}

		[HttpPost]
		[Route("retrieve")]
		public RestaurantRequestResponseDTO Retrieve(RestaurantRequestFilterParams filterParams)
		{
			return _restaurantRequestFacade.Retrieve(filterParams);
		}


		[HttpPost]
		[Route("approve")]
		public IActionResult Approve([FromBody] Guid id)
		{
			try
			{
				_restaurantRequestFacade.Approve(id);
			}
			catch (Exception e)
			{
				return StatusCode(500);
			}

			return Ok();
		}


		[HttpPost]
		[Route("decline")]
		public IActionResult Decline([FromBody] Guid id)
		{
			try
			{
				_restaurantRequestFacade.Decline(id);
			}
			catch (Exception e)
			{
				return StatusCode(500);
			}

			return Ok();
		}
	}
}
