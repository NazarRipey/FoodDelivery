import { Guid } from 'guid-typescript';

export class UpdateOrderModel{
    public id: Guid;
    public orderNumber: number;
    public address: string;
    public contactPhoneNumber: string;
    public comment?: string;
}