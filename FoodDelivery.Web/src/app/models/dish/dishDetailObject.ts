import { dishCategory } from './dishCategory';
import { Guid } from 'guid-typescript';

export class dishDetailObject{
    public id?: Guid;
    public name: string;
    public description: string;
    public price :number
    public weight : number;
    public rating? :number;

    public restaurantName: string;
    public category: dishCategory;
}