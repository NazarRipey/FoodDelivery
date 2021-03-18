import { Restaurant } from './restaurant/restaurant';

export class Dish{
    public name: string;
    public price: number;
    public rating: number
    public weight: number;
    public description: string;
    public imgSource: string;
    public restaurant: Restaurant;
}