import { paymentType } from './../enums/paymentType';
import { Guid } from 'guid-typescript';

export class addOrderObject {
    public cartId: Guid;
    public orderNumber: number;
    public paymentType: paymentType;
    public address: string;
    public comment?: string;
}