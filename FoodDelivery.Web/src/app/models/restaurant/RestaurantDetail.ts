import { DishList } from './../dish/DishList';
import { Guid } from 'guid-typescript';
import { RestaurantType } from './RestaurantType';
import { RestaurantAddress } from './RestaurantAddress';

export class RestaurantDetail{
    public id: Guid;
    public name: string;
    public description: string;
    public rating?: number;
    public type: RestaurantType;
    public addresses: RestaurantAddress[];
    public dishes: DishList[];
}