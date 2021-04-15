import { PaymentType } from '../enums/PaymentType';
import { Guid } from 'guid-typescript';

export class AddOrderModel {
    public cartId: Guid;
    public orderNumber: number;
    public paymentType: PaymentType;
    public contactPhoneNumber: string;
    public address: string;
    public comment?: string;
}