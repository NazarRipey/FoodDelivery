using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using FoodDelivery.DAL.EF.Context;
using FoodDelivery.DAL.EF.Entities;
using FoodDelivery.Entities.DTO;
using FoodDelivery.Entities.Enums.Sorts;
using FoodDelivery.Entities.Enums.Status;
using FoodDelivery.Entities.FilterParams;
using Microsoft.EntityFrameworkCore;

namespace FoodDelivery.DAL.Repositories
{
	public class RestaurantRequestRepository : BaseRepository, IRestaurantRequestRepository
	{
		public RestaurantRequestRepository(FoodDeliveryDbContext db, IMapper mapper)
			: base(db, mapper)
		{ }

		public void Create(Guid userId, Guid restaurantId)
		{
			RestaurantRequest request = new RestaurantRequest()
			{
				UserProfileId = userId,
				RestaurantId = restaurantId,
				CreatedDate = DateTime.Now,
				Status = (int)RestaurantRequestStatus.Awaiting
			};

			_db.RestaurantRequest.Add(request);

			SaveChanges();
		}

		public void DeclineAwaitingByEmail(string email)
		{
			ICollection<RestaurantRequest> restaurantRequests = _db.RestaurantRequest
				.Where(r => r.UserProfile.Email == email && r.Status == (int)RestaurantRequestStatus.Awaiting)
				.ToList();

			foreach (var r in restaurantRequests)
			{
				r.Status = (int)RestaurantRequestStatus.Declined;

				_db.Entry(r).State = EntityState.Modified;

				SaveChanges();
			}

		}

		public RestaurantRequest GetById(Guid id)
		{
			RestaurantRequest request = _db.RestaurantRequest.Find(id);

			return request;
		}

		public RestaurantRequestResponseDTO Retrieve(RestaurantRequestFilterParams filterParam)
		{
			int totalItemsCount;

			IQueryable<RestaurantRequest> restaurantsRequests = _db.RestaurantRequest;

			if (filterParam.Search != null)
			{
				restaurantsRequests = restaurantsRequests
					.Where(r => (r.UserProfile.FirstName + r.UserProfile.LastName).Contains(filterParam.Search) ||
						r.UserProfile.Email.Contains(filterParam.Search));
			}
			if (filterParam.Status != null)
			{
				restaurantsRequests = restaurantsRequests.Where(r => r.Status == (int)filterParam.Status);
			}
			if (filterParam.Sort != null)
			{
				#region Sort
				switch (filterParam.Sort)
				{
					case RestaurantRequestSortType.Name:
						if (filterParam.Asc != null && filterParam.Asc == false)
						{
							restaurantsRequests = restaurantsRequests.OrderByDescending(r => r.Restaurant.Name);
						}
						else
						{
							restaurantsRequests = restaurantsRequests.OrderBy(r => r.Restaurant.Name);
						}
						break;
					case RestaurantRequestSortType.OwnerName:
						if (filterParam.Asc != null && filterParam.Asc == false)
						{
							restaurantsRequests = restaurantsRequests.OrderByDescending(r => r.UserProfile.FirstName);
						}
						else
						{
							restaurantsRequests = restaurantsRequests.OrderBy(r => r.UserProfile.FirstName);
						}
						break;
					case RestaurantRequestSortType.Email:
						if (filterParam.Asc != null && filterParam.Asc == false)
						{
							restaurantsRequests = restaurantsRequests.OrderByDescending(r => r.UserProfile.Email);
						}
						else
						{
							restaurantsRequests = restaurantsRequests.OrderBy(r => r.UserProfile.Email);
						}
						break;
					case RestaurantRequestSortType.PhoneNumber:
						if (filterParam.Asc != null && filterParam.Asc == false)
						{
							restaurantsRequests = restaurantsRequests.OrderByDescending(r => r.UserProfile.PhoneNumber);
						}
						else
						{
							restaurantsRequests = restaurantsRequests.OrderBy(r => r.UserProfile.PhoneNumber);
						}
						break;
					case RestaurantRequestSortType.Type:
						if (filterParam.Asc != null && filterParam.Asc == false)
						{
							restaurantsRequests = restaurantsRequests.OrderByDescending(r => r.Restaurant.Type.Name);
						}
						else
						{
							restaurantsRequests = restaurantsRequests.OrderBy(r => r.Restaurant.Type.Name);
						}
						break;
					case RestaurantRequestSortType.Status:
						if (filterParam.Asc != null && filterParam.Asc == false)
						{
							restaurantsRequests = restaurantsRequests.OrderByDescending(r => r.Status);
						}
						else
						{
							restaurantsRequests = restaurantsRequests.OrderBy(r => r.Status);
						}
						break;
					case RestaurantRequestSortType.ClosedDate:
						if (filterParam.Asc != null && filterParam.Asc == false)
						{
							restaurantsRequests = restaurantsRequests.OrderByDescending(r => r.ClosedDate);
						}
						else
						{
							restaurantsRequests = restaurantsRequests.OrderBy(r => r.ClosedDate);
						}
						break;
					case RestaurantRequestSortType.CreatedDate:
					default:
						if (filterParam.Asc != null && filterParam.Asc == false)
						{
							restaurantsRequests = restaurantsRequests.OrderByDescending(r => r.CreatedDate);
						}
						else
						{
							restaurantsRequests = restaurantsRequests.OrderBy(r => r.CreatedDate);
						}
						break;
				}
				#endregion
			}

			totalItemsCount = restaurantsRequests.Count();

			ICollection<RestaurantRequest> restaurantRequestsToReturn = restaurantsRequests
				.Skip(filterParam.ItemsPerPage * (filterParam.CurrentPage - 1))
				.Take(filterParam.ItemsPerPage)
				.ToList();

			ICollection<RestaurantRequestDTO> restaurantRequestDTOs =
				_mapper.Map<ICollection<RestaurantRequestDTO>>(restaurantRequestsToReturn);

			RestaurantRequestResponseDTO restaurantRequestResponseDTO = new RestaurantRequestResponseDTO()
			{
				RestaurantRequests = restaurantRequestDTOs,
				TotalRequestsCount = totalItemsCount
			};

			return restaurantRequestResponseDTO;
		}

		public void Update(Guid id, int statusId)
		{
			RestaurantRequest restaurantRequest = _db.RestaurantRequest.Find(id);

			restaurantRequest.Status = statusId;
			restaurantRequest.ClosedDate = DateTime.Now;

			_db.Entry(restaurantRequest).State = EntityState.Modified;

			SaveChanges();
		}
	}
}
