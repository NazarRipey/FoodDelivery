import { Guid } from 'guid-typescript';
import { restaurant } from 'src/app/models/restaurant/restaurant';
import { dishCategory } from './dishCategory';

export class dish{
    public id?: Guid;
    public name: string;
    public description: string;
    public price: number;
    public rating?: number
    public weight: number;

    public restaurantId: Guid;
    public category: dishCategory;
}