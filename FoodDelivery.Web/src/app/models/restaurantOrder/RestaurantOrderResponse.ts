import { RestaurantOrder } from './RestaurantOrder';

export class RestaurantOrderResponse{
    public orders: RestaurantOrder[];
	public totalOrdersCount: number;
}