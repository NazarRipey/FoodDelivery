using System;
using System.Collections.Generic;
using FoodDelivery.BusinessLogic.Facades;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.FilterParams;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FoodDelivery.API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class RestaurantOrderController : ControllerBase
	{
		private readonly IRestaurantOrderFacade _restaurantOrderFacade;

		public RestaurantOrderController(IRestaurantOrderFacade restaurantOrderFacade)
		{
			_restaurantOrderFacade = restaurantOrderFacade;
		}

		[HttpGet]
		[Route("{restaurantId}/items")]
		public ICollection<RestaurantOrderItemDTO> GetRerstaurantOrderItems(Guid restaurantId)
		{
			return _restaurantOrderFacade.GetRestaurantOrderItems(restaurantId);
		}

		#region owner
		[HttpPost]
		[Route("{name}/orders/awaiting")]
		[Authorize(Roles = "owner")]
		public RestaurantOrderShortResponseDTO RetrieveAwaitingOrders(string name,
			[FromBody] BaseFilterParams filterParams)
		{
			return _restaurantOrderFacade.RetrieveAwaitingOrders(name, filterParams);
		}

		[HttpPost]
		[Route("{name}/orders/cooking")]
		[Authorize(Roles = "owner")]
		public RestaurantOrderShortResponseDTO RetrieveCookingOrders(string name,
			[FromBody] BaseFilterParams filterParams)
		{
			return _restaurantOrderFacade.RetrieveCookingOrders(name, filterParams);
		}

		[HttpPost]
		[Route("{name}/orders/history")]
		[Authorize(Roles = "owner")]
		public RestaurantOrderShortResponseDTO RetrieveHistoryOrders(string name,
			[FromBody] BaseFilterParams filterParams)
		{
			return _restaurantOrderFacade.RetrieveOrderHistory(name, filterParams);
		}

		[HttpPost]
		[Route("requestquantitychange")]
		[Authorize(Roles = "owner")]
		public IActionResult AddRequestQuantity(ICollection<RestaurantOrderItemDTO> orderItemDTOs)
		{
			try
			{
				_restaurantOrderFacade.AddRequestQuantity(orderItemDTOs);
			}
			catch (Exception e)
			{
				return StatusCode(500);
			}

			return Ok();
		}

		[HttpPost]
		[Route("startcooking")]
		[Authorize(Roles = "owner")]
		public IActionResult StartCooking([FromBody] Guid restaurantOrderId)
		{
			try
			{
				_restaurantOrderFacade.StartCooking(restaurantOrderId);
			}
			catch (Exception e)
			{
				return StatusCode(500);
			}

			return Ok();
		}

		[HttpPost]
		[Route("makeReady")]
		[Authorize(Roles = "owner")]
		public IActionResult MakeReady([FromBody] RestaurantOrderItemDTO restaurantOrderItemDTO)
		{
			try
			{
				_restaurantOrderFacade.MakeReady(restaurantOrderItemDTO);
			}
			catch (Exception e)
			{
				return StatusCode(500);
			}

			return Ok();
		}
		#endregion

		#region orderManager
		[HttpPost]
		[Route("approvequantityrequest")]
		[Authorize(Roles = "orderManager")]
		public IActionResult ApproveQuantityRequest(RestaurantOrderItemDTO restaurantOrderItem)
		{
			try
			{
				_restaurantOrderFacade.ApproveQuantityRequest(restaurantOrderItem);
			}
			catch (Exception e)
			{
				return StatusCode(500);
			}

			return Ok();
		}

		[HttpPost]
		[Route("declinequantityrequest")]
		[Authorize(Roles = "orderManager")]
		public IActionResult DeclineQuantityRequest(RestaurantOrderItemDTO restaurantOrderItem)
		{
			try
			{
				_restaurantOrderFacade.DeclineQuantityRequest(restaurantOrderItem);
			}
			catch (Exception e)
			{
				return StatusCode(500);
			}

			return Ok();
		}

		[HttpDelete]
		[Route("cancel/{id:Guid}")]
		[Authorize(Roles = "orderManager")]
		public IActionResult CancelRestaurantOrder(Guid id)
		{
			try
			{
				_restaurantOrderFacade.Delete(id);
			}
			catch (Exception e)
			{
				return StatusCode(500);
			}

			return Ok();
		}
		#endregion
	}
}
