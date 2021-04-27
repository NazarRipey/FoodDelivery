import { OrderStatus } from './../enums/statuses/OrderStatus';
import { Guid } from 'guid-typescript';

export class RestaurantOrderShort {
    public id: Guid;
    public orderId: Guid;
    public orderNumber: number;
    public status: OrderStatus;
    public createdDate: Date;
    public totalSum: number;
}