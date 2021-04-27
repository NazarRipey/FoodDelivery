using System;
using System.Collections.Generic;
using FoodDelivery.BusinessLogic.Facades;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.DTO.Order;
using FoodDelivery.Entities.FilterParams;
using FoodDelivery.Entities.Info;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FoodDelivery.API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[Authorize]
	public class OrderController : ControllerBase
	{
		private readonly IOrderFacade _orderFacade;
		private readonly IUserProfileFacade _userProfileFacade;

		public OrderController(IOrderFacade orderFacade, IUserProfileFacade userProfileFacade)
		{
			_orderFacade = orderFacade;
			_userProfileFacade = userProfileFacade;
		}

		[HttpGet("{id}")]
		[Authorize(Roles = "customer")]
		public OrderDetailDTO GetOrderDetailDTOById(Guid id)
		{
			return _orderFacade.GetOrderDetailDTOById(id);
		}

		[HttpGet]
		[Route("{id}/restaurantorders")]
		[Authorize(Roles = "customer, orderManager")]
		public ICollection<RestaurantOrderDTO> GetRestaurantOrdersByOrderId(Guid id)
		{
			return _orderFacade.GetRestaurantOrders(id);
		}

		[HttpGet]
		[Route("item/{id}")]
		[Authorize(Roles = "customer, orderManager")]
		public OrderItemDTO GetOrderItem(Guid id)
		{
			return _orderFacade.GetOrderItem(id);
		}

		[Route("items/{id}")]
		[Authorize(Roles = "customer, orderManager")]
		public ICollection<OrderItemDTO> GetOrderItems(Guid id)
		{
			return _orderFacade.GetOrderItems(id);
		}

		[HttpGet]
		[Route("active")]
		[Authorize(Roles = "customer")]
		public ICollection<OrderShortDTO> GetActive()
		{
			Guid userId = _userProfileFacade.GetByEmail(User.Identity.Name).Id;

			return _orderFacade.GetActive(userId);
		}

		[HttpGet]
		[Route("updateorder/{id}")]
		[Authorize(Roles = "customer")]
		public UpdateOrderDTO GetUpdateDTOById(Guid id)
		{
			return _orderFacade.GetUpdateDTOById(id);
		}

		[HttpGet]
		[Route("managerinfo")]
		[Authorize(Roles = "orderManager")]
		public ManagerInfo GetManagerInfo()
		{
			Guid userId = _userProfileFacade.GetByEmail(User.Identity.Name).Id;

			return _orderFacade.GetManagerInfo(userId);
		}

		[HttpGet]
		[Route("ownerinfo")]
		[Authorize(Roles = "owner")]
		public OwnerInfo GetOwnerInfo()
		{
			Guid userId = _userProfileFacade.GetByEmail(User.Identity.Name).Id;

			return _orderFacade.GetOwnerInfo(userId);
		}


		[HttpPost]
		[Route("history")]
		[Authorize(Roles = "customer")]
		public OrderResponseDTO RetrieveHistory(OrderFilterParams orderFilterParams)
		{
			Guid userId = _userProfileFacade.GetByEmail(User.Identity.Name).Id;

			return _orderFacade.RetrieveHistory(orderFilterParams, userId);
		}

		[HttpPost]
		[Route("add")]
		[Authorize(Roles = "customer")]
		public IActionResult Post([FromBody] AddOrderDTO addOrderDTO)
		{
			try
			{
				Guid userId = _userProfileFacade.GetByEmail(User.Identity.Name).Id;
				_orderFacade.AddOrder(addOrderDTO, userId);
			}
			catch (Exception e)
			{
				return StatusCode(500);
			}

			return Ok();
		}


		[HttpPost]
		[Route("cancel")]
		[Authorize(Roles = "customer, orderManager")]
		public IActionResult Cancel([FromBody] Guid id)
		{
			try
			{
				_orderFacade.Cancel(id);
			}
			catch (Exception e)
			{
				return StatusCode(500);
			}

			return Ok();
		}

		[HttpPut]
		[Authorize(Roles = "customer")]
		public IActionResult Update(UpdateOrderDTO updateOrderDTO)
		{
			try
			{
				_orderFacade.Update(updateOrderDTO);
			}
			catch (Exception e)
			{
				return StatusCode(500);
			}

			return Ok();
		}

		#region manager
		[HttpGet]
		[Route("managerorder/{id}")]
		[Authorize(Roles = "orderManager")]
		public OrderManagerDTO GetOrderManagerDTOById(Guid id)
		{
			return _orderFacade.GetOrderManagerDTOById(id);
		}

		[HttpPost]
		[Route("available")]
		[Authorize(Roles = "orderManager")]
		public AvailableOrderResponseDTO RetrieveAvailableOrders([FromBody] BaseFilterParams filterParams)
		{
			return _orderFacade.RetrieveAvailable(filterParams);
		}

		[HttpPost]
		[Route("taken")]
		[Authorize(Roles = "orderManager")]
		public OrderManagerResponseDTO RetrieveTakenOrders([FromBody] OrderFilterParams filterParams)
		{
			Guid managerId = _userProfileFacade.GetByEmail(User.Identity.Name).Id;

			return _orderFacade.RetrieveTaken(filterParams, managerId);
		}

		[HttpPost]
		[Route("managerhistory")]
		[Authorize(Roles = "orderManager")]
		public OrderManagerResponseDTO RetrieveHistoryByManager([FromBody] BaseFilterParams filterParams)
		{
			Guid managerId = _userProfileFacade.GetByEmail(User.Identity.Name).Id;

			return _orderFacade.RetrieveHistoryByManager(filterParams, managerId);
		}


		[HttpPost]
		[Route("take")]
		[Authorize(Roles = "orderManager")]
		public IActionResult TakeOrder([FromBody] Guid orderId)
		{
			Guid managerId = _userProfileFacade.GetByEmail(User.Identity.Name).Id;
			try
			{
				_orderFacade.TakeOrder(orderId, managerId);
			}
			catch (Exception e)
			{
				return StatusCode(500);
			}

			return Ok();
		}

		[HttpPost]
		[Route("release")]
		[Authorize(Roles = "orderManager")]
		public IActionResult ReleaseOrder([FromBody] Guid orderId)
		{
			try
			{
				_orderFacade.ReleaseOrder(orderId);
			}
			catch (Exception e)
			{
				return StatusCode(500);
			}

			return Ok();
		}

		[HttpPost]
		[Route("verify")]
		[Authorize(Roles = "orderManager")]
		public IActionResult VerifyOrder([FromBody] Guid orderId)
		{
			try
			{
				_orderFacade.VerifyOrder(orderId);
			}
			catch (Exception e)
			{
				return StatusCode(500);
			}

			return Ok();
		}

		[HttpPut]
		[Route("item/{id}")]
		[Authorize(Roles = "orderManager")]
		public IActionResult UpdateOrderItem(Guid id, [FromBody] int quantity)
		{
			try
			{
				_orderFacade.UpdateOrderItem(id, quantity);
			}
			catch (Exception e)
			{
				return StatusCode(500);
			}

			return Ok();
		}

		[HttpPost]
		[Route("startdelivery")]
		[Authorize(Roles = "orderManager")]
		public IActionResult UpdateOrderItem([FromBody] Guid id)
		{
			try
			{
				_orderFacade.StartDelivery(id);
			}
			catch (Exception e)
			{
				return StatusCode(500);
			}

			return Ok();
		}

		[HttpPost]
		[Route("deliverycompleted")]
		[Authorize(Roles = "orderManager")]
		public IActionResult DeliveryCompleted([FromBody] OrderManagerDTO orderManagerDTO)
		{
			try
			{
				_orderFacade.DeliveryCompletedAsync(orderManagerDTO);
			}
			catch (Exception e)
			{
				return StatusCode(500);
			}

			return Ok();
		}

		[HttpDelete]
		[Route("item/{id}")]
		[Authorize(Roles = "orderManager")]
		public IActionResult DeleteItem(Guid id)
		{
			try
			{
				_orderFacade.RemoveItem(id);
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
