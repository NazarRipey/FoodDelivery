import { Guid } from 'guid-typescript';

export class DishOrder{
    public id: Guid
    public name: string;
    public restaurantName: string;
    public price : number;
}