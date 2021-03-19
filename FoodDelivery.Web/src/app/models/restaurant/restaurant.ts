import { Guid } from 'guid-typescript';
import { RestaurantType } from './restaurantType';
import { restaurantAddress } from './restaurantAddress';

export class Restaurant{
    public id?: Guid;
    public ownerId: Guid;
    public name: string;
    public description: string;
    public rating?: number;
    public type: RestaurantType;
    public addresses: restaurantAddress[];
}