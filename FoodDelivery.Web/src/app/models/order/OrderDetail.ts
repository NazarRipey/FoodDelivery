import { OrderItem } from './OrderItem';
import { OrderStatus } from '../enums/statuses/OrderStatus';
import { PaymentType } from '../enums/PaymentType';
import { Guid } from 'guid-typescript';

export class OrderDetail{
    public id: Guid;
    public orderNumber: number;
    public createdDate: Date;
    public closedDate?: Date;
    public paymentType: PaymentType;
    public contactPhoneNumber: string;
    public address: string;
    public status: OrderStatus;
    public totalSum: number;
    public comment: string;

    public orderItems: OrderItem[];
}