import { dishCartObject } from './../dish/dishCartObject';
import { Guid } from 'guid-typescript';

export class cartItem{
    public id: Guid;
    public quantity: number;
    public dish: dishCartObject;
}