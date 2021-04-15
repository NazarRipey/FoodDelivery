using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using FoodDelivery.DAL.EF.Context;
using FoodDelivery.DAL.EF.Entities;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.DTO.UserProfile;
using FoodDelivery.Entities.Enums.Status;
using FoodDelivery.Entities.FilterParams;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace FoodDelivery.DAL.Repositories
{
	public class UserProfileRepository : BaseRepository, IUserProfileRepository
	{
		private readonly UserManager<IdentityUser> _userManager;

		public UserProfileRepository(FoodDeliveryDbContext db,
			IMapper mapper,
			UserManager<IdentityUser> userManager)
			: base(db, mapper)
		{
			_userManager = userManager;
		}

		public UserProfile GetByEmail(string email)
		{
			return _db.UserProfile.Where(u => u.Email == email).SingleOrDefault();
		}

		public UserProfile GetByPhone(string phone)
		{
			return _db.UserProfile.Where(u => u.PhoneNumber == phone).SingleOrDefault();
		}

		public UserAccountDTO GetAccountById(Guid id)
		{
			UserProfile u = _db.UserProfile.Find(id);
			UserAccountDTO userAccountDTO = new UserAccountDTO()
			{
				Id = u.Id,
				FullName = u.FirstName + " " + u.LastName,
				Email = u.Email,
				PhoneNumber = u.PhoneNumber,
				Status = _userManager.IsLockedOutAsync(u.AspNetUser).Result == true ?
					AccountStatus.Inactive : AccountStatus.Active
			};

			return userAccountDTO;
		}

		public void Create(UserProfile userProfile)
		{
			_db.UserProfile.Add(userProfile);

			SaveChanges();
		}

		public void Update(UserProfile userProfile)
		{
			_db.Entry(userProfile).State = EntityState.Modified;

			SaveChanges();
		}

		public UserListResponseDTO RetrieveByRole(UserFilterParams filterParams, string role)
		{
			//Is this query okay?
			int totalUsersCount;
			AccountStatus? accountStatus = null;

			IEnumerable<string> aspUserIds;

			if (filterParams.Status == null)
			{
				aspUserIds = _userManager.GetUsersInRoleAsync(role).Result.Select(u => u.Id);
			}
			else if (filterParams.Status == AccountStatus.Active)
			{
				accountStatus = AccountStatus.Active;
				aspUserIds = _userManager.GetUsersInRoleAsync(role).Result
					.Where(u => !_userManager.IsLockedOutAsync(u).Result).Select(u => u.Id);
			}
			else
			{
				accountStatus = AccountStatus.Inactive;
				aspUserIds = _userManager.GetUsersInRoleAsync(role).Result
					.Where(u => _userManager.IsLockedOutAsync(u).Result).Select(u => u.Id);
			}

			IQueryable<UserProfile> users = _db.UserProfile.Where(u => aspUserIds.Contains(u.AspNetUserId));

			if (filterParams.Search != null)
			{
				users = users
					.Where(u => (u.FirstName + u.LastName).Contains(filterParams.Search));
			}

			totalUsersCount = users.Count();

			ICollection<UserProfile> userProfilesToReturn = users
				.Skip(filterParams.ItemsPerPage * (filterParams.CurrentPage - 1))
				.Take(filterParams.ItemsPerPage)
				.ToList();

			ICollection<UserAccountDTO> userListDTOs = userProfilesToReturn.Select(u =>
				new UserAccountDTO()
				{
					Id = u.Id,
					FullName = u.FirstName + " " + u.LastName,
					Email = u.Email,
					PhoneNumber = u.PhoneNumber,
					Status = accountStatus ?? (_userManager.IsLockedOutAsync(u.AspNetUser).Result == true ?
						AccountStatus.Inactive : AccountStatus.Active)
				}
			).ToList();

			UserListResponseDTO userListResponseDTO = new UserListResponseDTO()
			{
				TotalUsersCount = totalUsersCount,
				Users = userListDTOs
			};

			return userListResponseDTO;
		}

		public void UpdateProfile(UpdateProfileDTO updateProfile)
		{
			UserProfile userProfile = _db.UserProfile.Find(updateProfile.Id);

			userProfile.Address = updateProfile.Address;
			userProfile.Birthday = updateProfile.Birthday;
			userProfile.FirstName = updateProfile.FirstName;
			userProfile.LastName = updateProfile.LastName;

			_db.Entry(userProfile).State = EntityState.Modified;
			SaveChanges();
		}

		public UserListResponseDTO RetrieveUsers(UserFilterParams filterParams)
		{
			int totalUsersCount;
			AccountStatus? accountStatus = null;

			IEnumerable<string> aspUserIds;

			if (filterParams.Status == null)
			{
				aspUserIds = _userManager.Users.Select(u => u.Id);
			}
			else if (filterParams.Status == AccountStatus.Active)
			{
				accountStatus = AccountStatus.Active;
				aspUserIds = _userManager.Users.ToList()
					.Where(u => !_userManager.IsLockedOutAsync(u).Result).Select(u => u.Id);
			}
			else
			{
				accountStatus = AccountStatus.Inactive;
				aspUserIds = _userManager.Users.ToList()
					.Where(u => _userManager.IsLockedOutAsync(u).Result).Select(u => u.Id);
			}

			aspUserIds = aspUserIds.Except(_userManager.GetUsersInRoleAsync("admin").Result.Select(u => u.Id));
			IQueryable<UserProfile> users = _db.UserProfile.Where(u => aspUserIds.Contains(u.AspNetUserId));

			if (filterParams.Search != null)
			{
				users = users
					.Where(u => (u.FirstName + u.LastName).Contains(filterParams.Search));
			}

			totalUsersCount = users.Count();

			ICollection<UserProfile> userProfilesToReturn = users
				.Skip(filterParams.ItemsPerPage * (filterParams.CurrentPage - 1))
				.Take(filterParams.ItemsPerPage)
				.ToList();

			ICollection<UserAccountDTO> userListDTOs = userProfilesToReturn.Select(u =>
				new UserAccountDTO()
				{
					Id = u.Id,
					FullName = u.FirstName + " " + u.LastName,
					Email = u.Email,
					PhoneNumber = u.PhoneNumber,
					Status = accountStatus ?? (_userManager.IsLockedOutAsync(u.AspNetUser).Result == true ?
						AccountStatus.Inactive : AccountStatus.Active)
				}
			).ToList();

			UserListResponseDTO userListResponseDTO = new UserListResponseDTO()
			{
				TotalUsersCount = totalUsersCount,
				Users = userListDTOs
			};

			return userListResponseDTO;
		}
	}
}
