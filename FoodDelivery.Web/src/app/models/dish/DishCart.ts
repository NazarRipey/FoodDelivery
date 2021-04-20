import { Rating } from './../Rating';
import { Guid } from 'guid-typescript';

export class DishCart{
    public id: Guid;
    public name: string;
    public restaurantName: string;
    public description: string;
    public price: number;
    public weight: number;
    public rating: Rating;
    public base64Image: string;
}