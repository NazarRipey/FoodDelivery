import { Guid } from 'guid-typescript';

export class AvailableOrder{
    public id: Guid;
    public customerName: string;
    public orderNumber: number;
    public createdDate: Date;
    public contactPhoneNumber: string;
    public totalSum: number;
}