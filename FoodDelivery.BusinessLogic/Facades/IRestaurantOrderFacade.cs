using System;
using System.Collections.Generic;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.FilterParams;

namespace FoodDelivery.BusinessLogic.Facades
{
	public interface IRestaurantOrderFacade
	{
		RestaurantOrderShortResponseDTO RetrieveAwaitingOrders(string name, BaseFilterParams filterParams);
		ICollection<RestaurantOrderItemDTO> GetRestaurantOrderItems(Guid id);
		void AddRequestQuantity(ICollection<RestaurantOrderItemDTO> orderItemDTOs);
		void ApproveQuantityRequest(RestaurantOrderItemDTO restaurantOrderItem);
		void DeclineQuantityRequest(RestaurantOrderItemDTO restaurantOrderItem);
		void StartCooking(Guid restaurantOrderId);
		RestaurantOrderShortResponseDTO RetrieveCookingOrders(string name, BaseFilterParams filterParams);
		void MakeReady(RestaurantOrderItemDTO restaurantOrderItemDTO);
		RestaurantOrderShortResponseDTO RetrieveOrderHistory(string name, BaseFilterParams filterParams);
		void Delete(Guid id);
	}
}
