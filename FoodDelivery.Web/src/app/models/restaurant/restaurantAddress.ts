import { Guid } from 'guid-typescript';

export class RestaurantAddress{
    id?: Guid;
    restaurantId: Guid;
    city: string;
    address: string;
}