using FoodDelivery.DAL.EF.Entities;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.FilterParams;

namespace FoodDelivery.DAL.Repositories
{
	public interface IUserProfileRepository
	{
		UserProfile GetByEmail(string email);
		UserProfile GetByPhone(string phoneNumber);
		void Update(UserProfile userProfile);
		void Create(UserProfile userProfile);
		UserListResponseDTO RetrieveByRole(OrderManagerFilterParams filterParams, string role);
	}
}
