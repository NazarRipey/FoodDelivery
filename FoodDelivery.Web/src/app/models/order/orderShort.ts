import { OrderStatus } from '../enums/statuses/OrderStatus';
import { Guid } from 'guid-typescript';

export class OrderShort{
    public id: Guid;
    public orderNumber: number;
    public status: OrderStatus;
    public createdDate: Date;
    public closedDate?: Date;
    public contactPhoneNumber: string;
    public totalSum: number;
}