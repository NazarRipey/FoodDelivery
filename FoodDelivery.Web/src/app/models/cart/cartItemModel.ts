import { Guid } from 'guid-typescript';

export class CartItemModel{
    dishId: Guid;
    dishCategoryId: number;
    quantity: number;
}