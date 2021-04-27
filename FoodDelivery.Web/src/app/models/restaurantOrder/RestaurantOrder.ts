import { OrderStatus } from './../enums/statuses/OrderStatus';
import { RestaurantOrderItem } from './RestaurantOrderItem';
import { Guid } from 'guid-typescript';

export class RestaurantOrder
{
    public id: Guid;
    public orderId: Guid;
    public status: OrderStatus;
    public restaurantName: string;
    public restaurantOrderItems: RestaurantOrderItem[];
    public totalSum: number;
}