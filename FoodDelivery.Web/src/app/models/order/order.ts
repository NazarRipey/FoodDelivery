import { orderStatus } from './../enums/statuses/orderStatus';
import { paymentType } from './../enums/paymentType';
import { Guid } from 'guid-typescript';

export class order{
    public id: Guid;
    public orderNumber: number;
    public createdDate: string;
    public closedDate: string;
    public paymentType: paymentType;
    public address: string;
    public status: orderStatus;
    public totalSum: number;
    public comment: string;
}