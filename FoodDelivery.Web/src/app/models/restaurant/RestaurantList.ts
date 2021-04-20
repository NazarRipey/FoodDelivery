import { Rating } from './../Rating';
import { Guid } from 'guid-typescript';

export class RestaurantList{
    public id?: Guid;
    public name: string;
    public rating: Rating;

    public base64Image: string;
}