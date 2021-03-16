using System.Collections.Generic;
using FoodDelivery.DAL.EF.Entities;
using FoodDelivery.Entities.DTO;

namespace FoodDelivery.DAL.Repositories
{
	public interface IOwnerRequestRepository
	{
		ICollection<OwnerRequestDTO> Get();
		ICollection<OwnerRequestDTO> GetByStatus(int status);
		void Create(OwnerRequestDTO requestDTO);
		void Update(OwnerRequest request);
	}
}
