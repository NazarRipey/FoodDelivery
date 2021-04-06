import { RestaurantStatus } from './../enums/statuses/RestaurantStatus';
import { DishDetail } from './../dish/DishDetail';
import { RestaurantAddress } from './RestaurantAddress';
import { RestaurantType } from './RestaurantType';
import { Guid } from 'guid-typescript';

export class RestaurantOwnerDetail{
    public id: Guid;
    public name: string;
    public description: string;
    public rating?: number;
    public type: RestaurantType;
    public addresses: RestaurantAddress[];
    public status: RestaurantStatus;
    public dishes: DishDetail[];
}