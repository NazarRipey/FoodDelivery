import { OrderStatus } from '../enums/statuses/OrderStatus';
import { Guid } from 'guid-typescript';

export class OrderManager{
    public id: Guid;
    public orderNumber: number;
    public customerName: string;
    public createdDate: Date;
    public closedDate?: Date;
    public contactPhoneNumber: string;
    public status: OrderStatus;
    public totalSum: number;
}