import { OrderItem } from './OrderItem';
import { OrderStatus } from '../enums/statuses/OrderStatus';
import { Guid } from 'guid-typescript';

export class OrderShort{
    public id: Guid;
    public orderNumber: number;
    public status: OrderStatus;
    public createdDate: Date;
    public closedDate?: Date;
    public totalSum: number;

    public orderItems: OrderItem[];
}