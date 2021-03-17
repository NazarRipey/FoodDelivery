using System.Linq;
using AutoMapper;
using FoodDelivery.DAL.EF.Context;
using FoodDelivery.DAL.EF.Entities;
using Microsoft.EntityFrameworkCore;

namespace FoodDelivery.DAL.Repositories
{
	public class UserProfileRepository : BaseRepository, IUserProfileRepository
	{
		public UserProfileRepository(FoodDeliveryDbContext db, IMapper mapper)
			: base(db, mapper)
		{ }

		public UserProfile GetByEmail(string email)
		{
			return _db.UserProfile.Where(u => u.Email == email).SingleOrDefault();
		}

		public UserProfile GetByPhone(string phone)
		{
			return _db.UserProfile.Where(u => u.PhoneNumber == phone).SingleOrDefault();
		}

		public void Create(UserProfile userProfile)
		{
			_db.UserProfile.Add(userProfile);
			_db.SaveChanges();
		}

		public void Update(UserProfile userProfile)
		{
			_db.Entry(userProfile).State = EntityState.Modified;
			SaveChanges();
		}
	}
}
