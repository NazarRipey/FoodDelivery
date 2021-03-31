import { Guid } from 'guid-typescript';

export class dishCartObject{
    public id: Guid;
    public name: string;
    public restaurantName: string;
    public description: string;
    public price: number;
    public weight: number;
    public rating?: number;
}