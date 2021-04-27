import { RestaurantOrderShort } from "./RestaurantOrderShort";

export class RestaurantOrderShortResponse{
    public orders: RestaurantOrderShort[];
	public totalOrdersCount: number;
}