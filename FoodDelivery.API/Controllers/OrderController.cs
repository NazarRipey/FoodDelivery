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


		[HttpPost]
		[Route("available")]
		[Authorize(Roles = "orderManager")]
		public AvailableOrderResponseDTO RetrieveAvailableOrders(BaseFilterParams filterParams)
		{
			return _orderFacade.RetrieveAvailable(filterParams);
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
	}
}
