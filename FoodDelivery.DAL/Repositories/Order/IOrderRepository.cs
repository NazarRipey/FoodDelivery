using System;
using System.Collections.Generic;
using FoodDelivery.Entities.DTO.Order;
using FoodDelivery.Entities.FilterParams;

namespace FoodDelivery.DAL.Repositories
{
	public interface IOrderRepository
	{
		void AddOrder(AddOrderDTO addOrderDTO);
		OrderResponseDTO RetrieveAll(OrderFilterParams orderFilterParams, Guid userId);
		ICollection<OrderShortDTO> GetActive(Guid userId);
		void UpdateStatus(Guid id, int status);
		OrderDetailDTO GetDetailDTOById(Guid id);
		UpdateOrderDTO GetUpdateDTOById(Guid id);
		void Update(UpdateOrderDTO updateOrderDTO);
	}
}
