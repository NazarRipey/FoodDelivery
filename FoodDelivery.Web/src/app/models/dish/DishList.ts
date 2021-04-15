import { Rating } from './../Rating';
import { Guid } from 'guid-typescript';

export class DishList{
    public id?: Guid;
    public name: string;
    public price: number;
    public rating: Rating;
}