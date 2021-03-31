using System;
using FoodDelivery.DAL.EF.Entities;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.Enums.Status;
using FoodDelivery.Entities.FilterParams;

namespace FoodDelivery.DAL.Repositories
{
	public interface IOwnerRequestRepository
	{
		OwnerRequestResponseDTO Retrieve(OwnerRequestFilterParams filterParam);
		void Create(Guid userId);
		void Update(OwnerRequest request, OwnerRequestStatus ownerRequestStatus);
		OwnerRequest GetById(Guid id);
		OwnerRequestStatus? GetStatus(Guid id);
	}
}
