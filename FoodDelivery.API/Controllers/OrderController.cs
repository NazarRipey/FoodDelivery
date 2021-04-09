using System;
using System.Collections.Generic;
using FoodDelivery.BusinessLogic.Facades;
using FoodDelivery.Entities.DTO.Order;
using FoodDelivery.Entities.FilterParams;
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
		public OrderDetailDTO GetOrderDetailDTOById(Guid id)
		{
			return _orderFacade.GetOrderDetailDTOById(id);
		}

		[Route("items/{id}")]
		public ICollection<OrderItemDTO> GetOrderItems(Guid id)
		{
			return _orderFacade.GetOrderItems(id);
		}

		[HttpGet]
		[Route("active")]
		public ICollection<OrderShortDTO> GetActive()
		{
			Guid userId = _userProfileFacade.GetByEmail(User.Identity.Name).Id;

			return _orderFacade.GetActive(userId);
		}

		[HttpGet]
		[Route("updateorder/{id}")]
		public UpdateOrderDTO GetUpdateDTOById(Guid id)
		{
			return _orderFacade.GetUpdateDTOById(id);
		}

		[HttpPost]
		[Route("history")]
		public OrderResponseDTO RetrieveHistory(OrderFilterParams orderFilterParams)
		{
			Guid userId = _userProfileFacade.GetByEmail(User.Identity.Name).Id;

			return _orderFacade.RetrieveHistory(orderFilterParams, userId);
		}

		[HttpPost]
		[Route("add")]
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
		public OrderManagerResponseDTO RetrieveTakenOrders([FromBody] BaseFilterParams filterParams)
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

		[HttpPut]
		[Route("item/{id}")]
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

		[HttpDelete]
		[Route("item/{id}")]
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
