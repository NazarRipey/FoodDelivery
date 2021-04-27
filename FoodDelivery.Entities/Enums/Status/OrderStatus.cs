namespace FoodDelivery.Entities.Enums.Status
{
	public enum OrderStatus
	{
		Created = 1,

		AwaitingManagerVerification = 2,

		ChangeQuantityRequested = 3,

		ChangeQuantityReplied = 4,

		PendingCooking = 5,

		Cooking = 6,

		Ready = 7,

		Delivering = 8,

		Completed = 9,

		Cancelled = 10
	}
}
