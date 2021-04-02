import { orderItem } from './orderItem';
import { orderStatus } from './../enums/statuses/orderStatus';
import { Guid } from 'guid-typescript';

export class orderShort{
    public id: Guid;
    public orderNumber: number;
    public status: orderStatus;
    public totalSum: number;

    public orderItems: orderItem[];
}