import { OrderItemStatus } from './../enums/statuses/OrderItemStatus';
import { OrderItem } from '../order/OrderItem';
import { Guid } from 'guid-typescript';

export class RestaurantOrderItem{
    public id: Guid
    public status: OrderItemStatus
    public orderItem: OrderItem;
    public requestedQuantity?: number;
}