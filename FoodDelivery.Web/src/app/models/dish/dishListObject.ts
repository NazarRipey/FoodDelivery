import { Guid } from 'guid-typescript';
import { restaurantDetailObject } from 'src/app/models/restaurant/restaurantDetailObject';
import { dishCategory } from './dishCategory';

export class dishListObject{
    public id?: Guid;
    public name: string;
    public price: number;
}