import { Rating } from './../Rating';
import { RestaurantStatus } from './../enums/statuses/RestaurantStatus';
import { Guid } from 'guid-typescript';
import { RestaurantType } from './RestaurantType';
import { RestaurantAddress } from './RestaurantAddress';
import { DishRestaurantListResponse } from '../dish/DishRestaurantListResponse';

export class RestaurantDetail{
    public id: Guid;
    public name: string;
    public description: string;
    public rating: Rating;
    public type: RestaurantType;
    public addresses: RestaurantAddress[];
    public status: RestaurantStatus;
}