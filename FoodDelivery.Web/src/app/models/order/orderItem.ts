import { Guid } from 'guid-typescript';
import { DishOrder } from './../dish/DishOrder';

export class OrderItem{
    public id: Guid;
    public quantity: number;
    public dish: DishOrder;
}