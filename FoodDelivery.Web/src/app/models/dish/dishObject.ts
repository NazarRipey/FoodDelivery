import { dishStatus } from '../enums/statuses/dishStatus';
import { dishCategory } from './dishCategory';
import { Guid } from 'guid-typescript';

export class dishObject{
    public id?: Guid;
    public name: string;
    public description: string;
    public price :number
    public weight : number;
    public rating? :number;

    public restaurantId: Guid;
    public status?: dishStatus;
    public category: dishCategory;
}