import { OrderShort } from './OrderShort';

export class OrderResponse{
    public orders: OrderShort[];
    public totalOrdersCount: number;
}