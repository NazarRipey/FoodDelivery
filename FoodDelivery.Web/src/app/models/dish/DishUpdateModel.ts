import { Guid } from 'guid-typescript';

export class DishUpdateModel{
    public id: Guid;
    public name: string;
    public description: string;
    public price :number
    public weight : number;
}