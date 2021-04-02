using FoodDelivery.DAL.EF.Entities;

namespace FoodDelivery.DAL.Repositories
{
	public interface IUserProfileRepository
	{
		UserProfile GetByEmail(string email);
		UserProfile GetByPhone(string phoneNumber);
		void Update(UserProfile userProfile);
		void Create(UserProfile userProfile);
	}
}
