import { Rating } from './../Rating';
import { DishStatus } from '../enums/statuses/DishStatus';
import { DishCategory } from './DishCategory';
import { Guid } from 'guid-typescript';

export class DishDetail{
    public id: Guid;
    public name: string;
    public description: string;
    public price :number
    public weight : number;
    public rating : Rating;
    public status?: DishStatus;
    public userRating? : number;

    public restaurantName: string;
    public category: DishCategory;
}