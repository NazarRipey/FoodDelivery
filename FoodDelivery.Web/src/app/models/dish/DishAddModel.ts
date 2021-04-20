import { IFileDetails } from './../IFileDetails';
import { DishCategory } from './DishCategory';
import { Guid } from 'guid-typescript';

export class DishAddModel{
    public name: string;
    public description: string;
    public price :number
    public weight : number;

    public restaurantId: Guid;
    public category: DishCategory;

    public image?: IFileDetails;
}