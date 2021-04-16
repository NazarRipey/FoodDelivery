import { Guid } from 'guid-typescript';

export class RateRestaurant{
    public userId: Guid;
    public restaurantId: Guid;
    public rating: number;
}