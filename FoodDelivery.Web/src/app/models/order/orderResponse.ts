import { orderShort } from './orderShort';

export class orderResponse{
    public orders: orderShort[];
    public totalOrdersCount: number;
}