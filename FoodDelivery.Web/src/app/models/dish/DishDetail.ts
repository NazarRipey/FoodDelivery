import { DishStatus } from '../enums/statuses/DishStatus';
import { DishCategory } from './DishCategory';
import { Guid } from 'guid-typescript';

export class DishDetail{
    public id: Guid;
    public name: string;
    public description: string;
    public price :number
    public weight : number;
    public rating? :number;
    public status?: DishStatus;

    public restaurantName: string;
    public category: DishCategory;
}