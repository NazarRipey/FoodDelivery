import { Guid } from 'guid-typescript';
import { cartItem } from './cartItem';

export class cartResponse{
    id: Guid;
    cartItems: cartItem[];
    totalPrice: number;
}