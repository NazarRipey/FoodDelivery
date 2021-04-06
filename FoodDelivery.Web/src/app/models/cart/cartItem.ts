import { DishCart } from '../dish/DishCart';
import { Guid } from 'guid-typescript';

export class CartItem{
    public id: Guid;
    public quantity: number;
    public dish: DishCart;
}