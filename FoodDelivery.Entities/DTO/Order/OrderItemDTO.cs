namespace FoodDelivery.Entities.DTO.Order
{
	public class OrderItemDTO
	{
		public int Quantity { get; set; }
		public DishListDTO Dish { get; set; }
	}
}
