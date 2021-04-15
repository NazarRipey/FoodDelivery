import { Guid } from 'guid-typescript';
import { CartItem } from './CartItem';

export class CartResponse{
    id: Guid;
    cartItems: CartItem[];
    createdDate: Date;
}